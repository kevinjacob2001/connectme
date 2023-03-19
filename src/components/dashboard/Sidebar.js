// import { getAuth, signOut } from 'firebase/auth';
// import React from 'react'
// import { useNavigate } from 'react-router-dom';



import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import UserPage from '../UserPage';
import Mainsection from './MainSection';

function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const [showModal, setShowModal] = React.useState(false);
    const [userDetails, setUserDetails] = useState([])
    const navigate = useNavigate()
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');

    const handleSidebarOpen = () => {
        setIsSidebarOpen(true);
    };

    const handleSidebarClose = () => {
        setIsSidebarOpen(false);
    };


    const logOutUser = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Logout successful")
            localStorage.clear()

            navigate("/")
        }).catch((error) => {
            // An error happened.
            console.log("Logout ERRR")

        });


    }


    const updateUser = async () => {
        console.log("Hey")
        try {
            let idFromLocal = localStorage.getItem("currentUserFirestoreDocID");
            const data = {
                fullName: fullName,
                phoneNumber: phoneNumber,
                bio: bio
            }
            console.log(" data is", data)
            const userRef = doc(db, "users", idFromLocal);
            try {
                await updateDoc(userRef, data)
                console.log("Updated successfully!")
                // console.log(docSnap.data())
            } catch (error) {
                console.log(error)
            }
            fetchUserDetails()
        } catch (error) {
            console.error('Error saving user profile: ', error);
        }
    }

    useEffect(() => {
        fetchUserDetails()
    }, [])
    const fetchUserDetails = async () => {
        try {
            let idFromLocal = localStorage.getItem("currentUserFirestoreDocID");

            const userRef = doc(db, "users", idFromLocal);
            try {
                const docSnap = await getDoc(userRef);
                console.log(docSnap.data())
                setUserDetails(docSnap.data())
                setFullName(docSnap.data().fullName)
                setPhoneNumber(docSnap.data().phoneNumber)
                setBio(docSnap.data().bio)
                // console.log(docSnap.data())
            } catch (error) {
                console.log(error)
            }

            console.log('User profile saved!');
        } catch (error) {
            console.error('Error saving user profile: ', error);
        }
    }


    const closeModal = () => {

        setShowModal(false)
        window.location.reload()
    };

    return (


        <div className="flex  w-screen ">
            {/* Sidebar */}


            <div
                className={`${isSidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
                    } fixed z-30 inset-y-0 left-0  md:h-screen w-64 transition duration-300 transform bg-indigo-300   overflow-y-auto lg:translate-x-0 lg:static lg:inset-0`}
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
                        className="block py-2 pl-3 pr-4 border-2 hover:bg-gray-200 transition duration-200 m-3 rounded-md"
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

                        onClick={() => setShowModal(true)}

                        activeClassName="font-bold bg-gray-200 text-indigo-600"
                        className="block py-2 pl-3 pr-4 border-2  hover:bg-gray-200 transition duration-200 m-3 rounded-md"
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
                        to="/"
                        activeClassName="font-bold bg-gray-200 text-indigo-600"
                        className=" py-2 pl-3 pr-3  border-2 text-semibold text-white transition duration-200 m-3 rounded-md absolute bottom-0"
                    >
                        <div className='flex items-center'>

                            <h2 onClick={logOutUser}>Logout</h2>
                        </div>
                    </NavLink>
                </nav>
            </div>
            <>


                {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-80  my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div class="w-full pt-8 max-w-sm bg-indigo-300  rounded-lg shadow  ">
  
                                    <div class="flex flex-col items-center pb-10">
                                        <img
                                            alt="img"
                                            className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                            src="https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small/default-avatar-photo-placeholder-profile-picture-vector.jpg" />

                                        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userDetails.fullName}</h5>

                                        <div class="space-y-2">
                                            <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
                                            <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" name="fullName" id="fullName" autocomplete="given-name" className="block w-full p-3  focus:outline-none text-sm text-gray-900   rounded-lg     " placeholder="Search Mockups, Logos..." required />

                                            <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Phone Number</label>
                                            <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" name="phoneNumber" id="phoneNumber" autocomplete="given-name" className="block w-full p-3  focus:outline-none text-sm text-gray-900   rounded-lg     " placeholder="Search Mockups, Logos..." required />

                                            <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
                                            <textarea value={bio} onChange={(e) => setBio(e.target.value)} type="bio" name="bio" rows="3" id="bio" autocomplete="given-name" className="block w-full p-3  focus:outline-none text-sm text-gray-900   rounded-lg      " placeholder="Search Mockups, Logos..." required />

                                        </div>



                                        <div class="flex mt-4 space-x-3 md:mt-6">
                                            <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300  " onClick={updateUser}>Update</a>
                                            <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900  border-2 text-white  border border-gray-300 hover:text-gray-300 hover:bg-white rounded-lg     " onClick={closeModal}>Close</a>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </>

            {location.pathname === "/dashboard" && (<Mainsection handleSidebarOpen={handleSidebarOpen} />)}
            {location.pathname.split("/")[1] === "user" && (<UserPage handleSidebarOpen={handleSidebarOpen} />)}




        </div>

    );
};








export default Sidebar