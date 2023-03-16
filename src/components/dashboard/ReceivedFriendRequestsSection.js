import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react'
import { db } from '../../firebase';
import fetchUserDetails from '../../utils';

function ReceivedFriendRequestsSection() {
    const [userDetails, setUserDetails] = useState({});
    const [receivedRequests, setReceivedRequests] = useState([])
    const [receivedUserName, setReceivedUserName] = useState([])
    const [friends,setFriends]=useState([])

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
            const userRef = collection(db, "users");
            try {
                const emailIDfromLocalStorage = localStorage.getItem("userEmailID");
                console.log(emailIDfromLocalStorage)
                const q = query(userRef, where("email", "==", emailIDfromLocalStorage));
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    setReceivedRequests(doc.data().receivedRequests)
                })
            } catch (error) {
                console.log(error)
            }
            console.log('User profile saved!');
        } catch (error) {
            console.error('Error saving user profile: ', error);
        }
        console.log("doc.data().receivedRequests", receivedRequests?.length)

    }, [receivedRequests?.length])


    const fetchAllOfYourFriends=useCallback(async()=>{
        let currentUserFirestoreDocID = localStorage.getItem("currentUserFirestoreDocID")
        let userDoc = doc(db, 'users', currentUserFirestoreDocID);

        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
            // Convert to City object
            const friends = docSnap.data().friends;
            setFriends(friends)
            // Use a City instance method
            console.log("friends",friends);
          } else {
            console.log("No such document!");
          }
    
    },[])

    useEffect(() => {
        fetchReceivedRequests()
        fetchAllOfYourFriends()
    }, [fetchReceivedRequests,fetchAllOfYourFriends])




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


    const removeFriend=async(requestID)=>{
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
        <div>
            <div className='m-6 border-red-50 border-[1px]'>
                <h1 className='font-semibold'>Received friend requests</h1>
                {receivedRequests.length === 0 && <h1 className='text-gray-400'>No pending friend requests</h1>}

                {receivedRequests.map((requestID, key) => {
                    return (
                        <div key={key} className='flex justify-between items-center'>
                            <div className='flex items-center'>
                                <h1 className='ml-2'>{requestID}</h1>
                            </div>
                            <div className='flex items-center space-x-2 space-y-2'>
                                <button onClick={() => acceptFriendRequest(requestID)} className='bg-blue-500 text-white px-4 py-2 rounded-full mr-2'>Accept</button>
                                <button onClick={() => declineFriendRequest(requestID)} className='bg-red-500 text-white px-4 py-2 rounded-full'>Decline</button>
                            </div>
                        </div>
                    )
                })
                }
                </div>


                <div className='m-6 border-red-50 border-[1px]'>
                <h1 className='font-semibold'>Your friends </h1>
                {friends.length === 0 && <h1 className='text-gray-400'>No friend</h1>}
                {friends.map((requestID, key) => {
                    return (
                        <div key={key} className='flex justify-between items-center'>
                            <div className='flex items-center'>
                                <h1 className='ml-2'>{requestID}</h1>
                            </div>
                            <div className='flex items-center space-x-2 space-y-2'>
                                <button onClick={() => removeFriend(requestID)} className='bg-red-500 text-white px-4 py-2 rounded-full'>Remove friend</button>
                            </div>
                        </div>
                    )
                })
                }
                </div>
        </div>
    );
}

export default ReceivedFriendRequestsSection;
