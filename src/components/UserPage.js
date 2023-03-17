import { async } from '@firebase/util';
import { arrayRemove, arrayUnion, collection, doc, FieldValue, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react'
import { NavLink, useParams, useSearchParams } from 'react-router-dom'
import { db } from '../firebase';
import Sidebar from './dashboard/Sidebar';

function UserPage() {
    const { id } = useParams();
    const [userDetails, setUserDetails] = useState([])
    const [pendingRequestsUsers, setPendingRequestsUsers] = useState([])
    const [friends, setFriends] = useState([])
    const [mutualFriends, setMutualFriends] = useState([])

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
            setFriends(doc.data().friends)

            console.log("doc.data().sendRequests", doc.data().sendRequests)
        })
    }, []);



    useEffect(() => {
        checkIffRequestIsPending();
    }, [checkIffRequestIsPending]);


    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarOpen = () => {
        setIsSidebarOpen(true);
    };

    const handleSidebarClose = () => {
        setIsSidebarOpen(false);
    };




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
            const usersRef = collection(db, "users");

            const q = query(usersRef, where("email", "==", emailIDLoggedInUser));

            const querySnapshot = await getDocs(q);
            let idOfReceivedRequestUser;

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                idOfReceivedRequestUser = doc.id
            });

            console.log("id", id)
            const userDoc = doc(db, 'users', id);

            await updateDoc(userDoc, {
                receivedRequests: arrayRemove(idOfReceivedRequestUser)
            });

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

    const findMutualFriends = useCallback(async () => {
        let currentUserFirestoreDocID = localStorage.getItem("currentUserFirestoreDocID")
        console.log("Person A", currentUserFirestoreDocID)
        console.log("Person B", id)
        let friendsOfA = []
        let friendsOfB = []
        try {
            let userRef = doc(db, "users", id);
            try {
                const docSnap = await getDoc(userRef);
                friendsOfA = docSnap.data().friends
            } catch (error) {
                console.log(error)
            }

            userRef = doc(db, "users", currentUserFirestoreDocID);
            try {
                const docSnap = await getDoc(userRef);
                friendsOfB = docSnap.data().friends
            } catch (error) {
                console.log(error)
            }
            console.log(friendsOfA, friendsOfB)
            const result = friendsOfA.filter(element => friendsOfB.includes(element));
            setMutualFriends(result)
        } catch (error) {
            console.error('Error saving user profile: ', error);
        }

    }, [id])

    useEffect(() => {
        findMutualFriends()
    }, [findMutualFriends])

    return (


        <>
            <div className="flex ">
                {/* Sidebar */}
                <div
                    className={`${isSidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
                        } fixed z-30 inset-y-0 left-0  md:h-screen w-80 transition duration-300 transform bg-[#c3c7d1]  overflow-y-auto lg:translate-x-0 lg:static lg:inset-0`}
                >
                    {/* Sidebar header */}
                    <div className="flex items-center justify-between mt-8 ml-8">
                        <div>
                            <img
                                className="h-8 w-auto rounded-full"
                                src="https://via.placeholder.com/150"
                                alt="Logo"
                            />
                        </div>
                        <div className="relative">
                            <div className='md:hidden flex'>
                                <button
                                    className="text-gray-500 focus:outline-none mr-4"
                                    onClick={handleSidebarClose}
                                >
                                    <svg
                                        className="h-6 w-6 fill-current"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6 18L18 6M6 6l12 12"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>

                            </div>
                        </div>
                    </div>

                    {/* Sidebar links */}
                    <nav className="mt-10">
                        <NavLink
                            exact
                            to="/dashboard"
                            activeClassName="font-bold bg-gray-200 text-indigo-600"
                            className="block py-2 pl-3 pr-4 hover:bg-gray-200 transition duration-200 m-3 rounded-md"
                        >
                            <div className='flex items-center'>

                                <svg
                                    className="h-5 w-5 fill-current mr-2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 2L2 7v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7l-10-5zM9 14v5l6-3-6-2zm0-3l6-3v-3l-6 3V6L4 9v6l5-2z"
                                    />
                                </svg>
                                <h2>Home</h2>
                            </div>
                        </NavLink>
                        <NavLink
                            exact
                            to="/profile"
                            activeClassName="font-bold bg-gray-200 text-indigo-600"
                            className="block py-2 pl-3 pr-4 hover:bg-gray-200 transition duration-200 m-3 rounded-md"
                        >

                            <div className='flex items-center'>

                                <svg
                                    className="h-5 w-5 fill-current mr-2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15.5 14.5c-3.3 0-6-2.7-6-6V6h12v2.5c0 3.3-2.7 6-6 6zM6 12c0 2.2 1.8 4 4 4h4v-2H10c-1.1 0-2-.9-2-2V6H6v6zm12 2h-4v2h4c1.1 0 2-.9 2-2v-2h-2v2zm-2-10V4h-8v2h8z"
                                    />
                                </svg>
                                <h2>Profile</h2>
                            </div>
                        </NavLink>

                        <NavLink
                            exact
                            to="/profile"
                            activeClassName="font-bold bg-gray-200 text-indigo-600"
                            className="block py-2 pl-3 pr-4 hover:bg-gray-200 transition duration-200 m-3 rounded-md"
                        >
                            <div className='flex items-center'>
                                <svg
                                    className="h-5 w-5 fill-current mr-2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15.5 14.5c-3.3 0-6-2.7-6-6V6h12v2.5c0 3.3-2.7 6-6 6zM6 12c0 2.2 1.8 4 4 4h4v-2H10c-1.1 0-2-.9-2-2V6H6v6zm12 2h-4v2h4c1.1 0 2-.9 2-2v-2h-2v2zm-2-10V4h-8v2h8z"
                                    />
                                </svg>
                                <h2>Logout</h2>
                            </div>
                        </NavLink>
                    </nav>
                </div>






                <div class="md:p-8 bg-gray-200 w-full">
                    <div class="p-8 bg-white shadow mt-24">
                        <div class="grid grid-cols-1 md:grid-cols-3">
                            <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                                <div>
                                    <p class="font-bold text-gray-700 text-xl">22</p>
                                    <p class="text-gray-400">Friends</p>
                                </div>
                                <div>
                                    <p class="font-bold text-gray-700 text-xl">10</p>
                                    <p class="text-gray-400">Photos</p>
                                </div>
                                <div>
                                    <p class="font-bold text-gray-700 text-xl">89</p>
                                    <p class="text-gray-400">Comments</p>
                                </div>
                            </div>
                            <div class="relative">
                                <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                                {pendingRequestsUsers.includes(id) && (
                                    <>
                                        <button className='p-2 rounded-md bg-green-600 text-white'>Already sent</button>
                                        <button className='p-2 rounded-md bg-red-600 text-white' onClick={unsendRequest}>Unsend request</button>

                                    </>
                                )}

                                {friends.includes(id) && (
                                    <>
                                        <h1 className='bg-red-200 text-center  rounded-md mt-4'>You are friends with this person</h1>
                                    </>
                                )}

                                {!pendingRequestsUsers.includes(id) && !friends.includes(id) && (
                                    <button className='p-2 rounded-md bg-blue-600 text-white' onClick={() => addFriend(id)}>Add friend</button>
                                )}


                                {''}

                                {mutualFriends.length > 0 && (
                                    <div className='bg-green-200 text-center  rounded-md mt-4'>
                                        {mutualFriends.length === 1 && (<h1 className='font-bold'>You have 1 mutual friend</h1>)}
                                        {mutualFriends.length > 1 && <h1 className='font-bold'> You have {mutualFriends.length} Mutual Friends</h1>}

                                        <div className="flex flex-wrap">
                                            {mutualFriends.map((mutualFriend) => {
                                                return (
                                                    <div className="w-1/2">
                                                        <h1 className='text-center'>{mutualFriend}</h1>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div class="mt-20 text-center border-b pb-12">
                            <h1 class="text-4xl font-medium text-gray-700">{userDetails.fullName} </h1>

                            <p class="mt-8 text-gray-500">{userDetails.email}</p>
                            <p class="mt-2 text-gray-500">{userDetails.phoneNumber} </p>
                        </div>



                        <div class="mt-8 flex flex-col justify-center">
                            <p class="text-gray-600 text-center font-light lg:px-16">{userDetails.bio}</p>

                        </div>

                    </div>
                </div>


            </div>




        </>
    )
}

export default UserPage