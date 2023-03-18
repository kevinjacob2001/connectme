import { async } from '@firebase/util';
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react'
import { db } from '../../firebase';
import fetchUserDetails from '../../utils';

function ReceivedFriendRequestsSection() {
    const [userDetails, setUserDetails] = useState({});
    const [receivedRequests, setReceivedRequests] = useState([])
    const [receivedUserName, setReceivedUserName] = useState([])
    const [friends, setFriends] = useState([])

    // const showData=useCallback(async()=>{
    //     console.log("receivedUserName is",receivedUserName)
    //     receivedUserName.forEach(async (item)=>{
    //         try {
    //             const userRef = doc(db, "users",receivedUserName);
    //             try {
    //                 const docSnap = await getDoc(userRef);
    //                 console.log(docSnap.data())
    //                 // console.log(docSnap.data())
    //             } catch (error) {
    //                 console.log(error)
    //             }

    //             console.log('User profile saved!');
    //         } catch (error) {
    //             console.error('Error saving user profile: ', error);
    //         }
    //     })
    // },[receivedUserName])
    const fetchReceivedRequests = useCallback(async () => {



        try {
            try {


                let currentUserFirestoreDocID = localStorage.getItem("currentUserFirestoreDocID")

                onSnapshot(doc(db, "users", currentUserFirestoreDocID), (doc) => {
                    setReceivedRequests(doc.data().receivedRequests);
                });


            } catch (error) {
                console.log(error)
            }
            console.log('User profile saved!');
        } catch (error) {
            console.error('Error saving user profile: ', error);
        }
        console.log("doc.data().receivedRequests", receivedRequests?.length)

    }, [receivedRequests?.length])


    const fetchAllOfYourFriends = useCallback(async () => {

        let currentUserFirestoreDocID = localStorage.getItem("currentUserFirestoreDocID")

        onSnapshot(doc(db, "users", currentUserFirestoreDocID), (doc) => {
            setFriends(doc.data().friends);
            console.log(doc.data().friends)
        });
    }, [])

    useEffect(() => {
        fetchReceivedRequests()
        fetchAllOfYourFriends()
    }, [fetchReceivedRequests, fetchAllOfYourFriends])




    const acceptFriendRequest = async (requestID) => {
        localStorage.getItem("currentUserFirestoreDocID")
        let currentUserFirestoreDocID = localStorage.getItem("currentUserFirestoreDocID")

        let userDoc = doc(db, 'users', currentUserFirestoreDocID);
        await updateDoc(userDoc, {
            friends: arrayUnion(requestID)
        });

        userDoc = doc(db, 'users', requestID);
        await updateDoc(userDoc, {
            friends: arrayUnion(currentUserFirestoreDocID)
        });

        //remove from received of the currentUserFirestoreId=zPITIQDOUFdnM9kuLYRo
        userDoc = doc(db, 'users', currentUserFirestoreDocID);
        await updateDoc(userDoc, {
            receivedRequests: arrayRemove(requestID)
        });

        //remove from send of the requestID=xKNR5kgjw74xIBRyawZ2
        userDoc = doc(db, 'users', requestID);
        await updateDoc(userDoc, {
            sendRequests: arrayRemove(currentUserFirestoreDocID)
        });
        fetchReceivedRequests()
    }


    const declineFriendRequest = async (requestID) => {
        localStorage.getItem("currentUserFirestoreDocID")
        let currentUserFirestoreDocID = localStorage.getItem("currentUserFirestoreDocID")

        let userDoc = doc(db, 'users', currentUserFirestoreDocID);

        //remove from received of the currentUserFirestoreId=zPITIQDOUFdnM9kuLYRo
        userDoc = doc(db, 'users', currentUserFirestoreDocID);
        await updateDoc(userDoc, {
            receivedRequests: arrayRemove(requestID)
        });

        //remove from send of the requestID=xKNR5kgjw74xIBRyawZ2
        userDoc = doc(db, 'users', requestID);
        await updateDoc(userDoc, {
            sendRequests: arrayRemove(currentUserFirestoreDocID)
        });
        fetchReceivedRequests()
    }


    const removeFriend = async (requestID) => {
        localStorage.getItem("currentUserFirestoreDocID")
        let currentUserFirestoreDocID = localStorage.getItem("currentUserFirestoreDocID")

        let userDoc = doc(db, 'users', currentUserFirestoreDocID);

        //remove from received of the currentUserFirestoreId=zPITIQDOUFdnM9kuLYRo
        userDoc = doc(db, 'users', currentUserFirestoreDocID);
        await updateDoc(userDoc, {
            friends: arrayRemove(requestID)
        });

        //remove from send of the requestID=xKNR5kgjw74xIBRyawZ2
        userDoc = doc(db, 'users', requestID);
        await updateDoc(userDoc, {
            friends: arrayRemove(currentUserFirestoreDocID)
        });
        fetchReceivedRequests()
        fetchAllOfYourFriends()
    }


    return (
        <div className=' space-y-8'>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img
                            className="h-48 w-full object-contain md:w-48 p-2"
                            src="https://cdn0.iconfinder.com/data/icons/sports-games/49/games-entertainment-ghost-avatar-512.png"
                            alt="Card image"
                        />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            Pending friend requests
                        </div>

                        <p className="mt-2 text-gray-500">
                            {receivedRequests.length === 0 && <h1 className='text-gray-400'>No pending friend requests</h1>}


                            {receivedRequests.map((requestID, key) => {
                                return (
                                    <>
                                        <div key={key} className='m-1 flex items-center bg-gray-100 border-l-4 border-blue-500 py-2 px-4 my-2 rounded'>
                                            <div className='flex items-center'>
                                                <h1 className='ml-2'>{requestID}</h1>
                                            </div>
                                            <div className='flex items-center ml-2 space-x-2'>
                                                <button onClick={() => acceptFriendRequest(requestID)} className='bg-blue-500 hover:opacity-80 text-white px-4 py-2 rounded-full'>Accept</button>
                                                <button onClick={() => declineFriendRequest(requestID)} className='bg-red-500 hover:opacity-80 text-white px-4 py-2 rounded-full'>Decline</button>
                                            </div>
                                        </div>


                                    </>


                                )
                            })}         </p>
                    </div>
                </div>
            </div>

            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img
                            className="h-48 w-full object-contain md:w-48 p-2"
                            src="https://cdn-icons-png.flaticon.com/512/69/69589.png"
                            alt="Card image"
                        />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            Your are connected with!
                        </div>
                        <div className='flex items-center bg-gray-100 border-l-4 border-green-500 py-2 px-4 my-2 rounded'>
                            <p className=" text-gray-500">


                                {friends.length === 0 && <h1 className='text-gray-400'>You have no friends</h1>}


                                {friends.map((requestID, key) => {
                                    return (
                                        <div key={key} className='flex justify-between items-center m-1'>
                                            <div className='flex items-center'>

                                                <h1 className='ml-2'>{requestID}</h1>
                                            </div>
                                            <div className='flex items-center space-x-2 space-y-2'>
                                                <button onClick={() => removeFriend(requestID)} className='bg-red-500 text-white px-4 py-2 rounded-full ml-2'>Unfriend</button>
                                            </div>
                                        </div>
                                    )
                                })
                                }        </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReceivedFriendRequestsSection;
