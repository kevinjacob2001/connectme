import { async } from '@firebase/util';
import { arrayRemove, arrayUnion, collection, doc, FieldValue, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { db } from '../firebase';

function UserPage() {
    const { id } = useParams();
    const [userDetails, setUserDetails] = useState([])
    const [pendingRequestsUsers, setPendingRequestsUsers] = useState([])

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userRef = doc(db, "users", id);
                try {
                    const docSnap = await getDoc(userRef);
                    setUserDetails(docSnap.data())
                    // console.log(docSnap.data())
                } catch (error) {
                    console.log(error)
                }

                console.log('User profile saved!');
            } catch (error) {
                console.error('Error saving user profile: ', error);
            }
        }
        fetchUserDetails()
    }, [id])


    useEffect(() => {
        let emailIDLoggedInUser = localStorage.getItem("userEmailID")
        console.log("Current user:", emailIDLoggedInUser)
    }, [])



    const checkIffRequestIsPending = useCallback(async () => {
        let emailIDLoggedInUser = localStorage.getItem("userEmailID")
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", emailIDLoggedInUser));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setPendingRequestsUsers(doc.data().sendRequests)
            console.log("doc.data().sendRequests", doc.data().sendRequests)
        })
    }, []);



    useEffect(() => {
        checkIffRequestIsPending();
    }, [checkIffRequestIsPending]);






    const addFriend = async (id) => {
        try {
            let emailIDLoggedInUser = localStorage.getItem("userEmailID")
            console.log(emailIDLoggedInUser)

            const usersRef = collection(db, "users");

            const q = query(usersRef, where("email", "==", emailIDLoggedInUser));

            const querySnapshot = await getDocs(q);
            let idOfReceivedRequestUser;
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                idOfReceivedRequestUser = doc.id
            });
            const userDoc = doc(db, 'users', id);
            await updateDoc(userDoc, {
                receivedRequests: arrayUnion(idOfReceivedRequestUser)
            });

            let receivedRequestUserRef = doc(db, 'users', idOfReceivedRequestUser);
            await updateDoc(receivedRequestUserRef, {
                sendRequests: arrayUnion(id)
            });
            checkIffRequestIsPending()

            console.log('Friend added successfully!');
        } catch (error) {
            console.error('Error adding friend: ', error);
        }
    };

    const unsendRequest = async () => {
        console.log("dsdsddd")
        try {
            let emailIDLoggedInUser = localStorage.getItem("userEmailID")

            console.log("P1")
            const usersRef = collection(db, "users");

            const q = query(usersRef, where("email", "==", emailIDLoggedInUser));
            console.log("P2")

            const querySnapshot = await getDocs(q);
            let idOfReceivedRequestUser;

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                idOfReceivedRequestUser = doc.id
            });

            console.log("P3")

            console.log("id", id)
            const userDoc = doc(db, 'users', id);



            await updateDoc(userDoc, {
                receivedRequests: arrayRemove(idOfReceivedRequestUser)
            });

            console.log("P4")


            let receivedRequestUserRef = doc(db, 'users', idOfReceivedRequestUser);
            await updateDoc(receivedRequestUserRef, {
                sendRequests: arrayRemove(id)
            });
            checkIffRequestIsPending()


            console.log('Friend added successfully!');
        } catch (error) {
            console.error('Error adding friend: ', error);
        }
    };

    return (
        <div className="bg-white my-12 pb-6 w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-sm mx-auto">
            <div className="relative h-40 ">
                <img className="absolute h-full w-full object-cover" src="https://images.unsplash.com/photo-1448932133140-b4045783ed9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" />
            </div>
            <div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                <img className="object-cover w-full h-full" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
            </div>
            <div className="mt-16">
                <h1 className="text-lg text-center font-semibold">
                    {userDetails.fullName}
                </h1>
                <h1 className="text-md text-center font-semibold">
                    Phone no: {userDetails.phoneNumber}
                </h1>

                <h1 className="text-md text-center font-semibold">
                    Email id: {userDetails.email}
                </h1>



                {pendingRequestsUsers.includes(id) ? (
                    <>
                        <button className='p-2 rounded-md bg-green-600 text-white'>Already sent</button>
                        <button className='p-2 rounded-md bg-red-600 text-white' onClick={unsendRequest}>Unsend request</button>

                    </>
                ) : <button className='p-2 rounded-md bg-blue-600 text-white' onClick={() => addFriend(id)}>Add friend</button>

                }

                {''}

                <p className="text-sm text-gray-600 text-center">
                </p>
            </div>
            {/* <div className="mt-6 pt-3 flex flex-wrap mx-6 border-t">
          <div className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
            User experience
          </div>
          <div className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
            VueJS
          </div>
          <div className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
            TailwindCSS
          </div>
          <div className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
            React
          </div>
          <div className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
            Painting
          </div>
        </div> */}
        </div>
    )
}

export default UserPage