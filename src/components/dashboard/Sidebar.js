// import { getAuth, signOut } from 'firebase/auth';
// import React from 'react'
// import { useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//     const navigate=useNavigate();
//     const logOutUser = () => {
//         const auth = getAuth();
//         signOut(auth).then(() => {
//             console.log("Logout successful")
//             localStorage.removeItem("token")
//             navigate("/login")
//         }).catch((error) => {
//             // An error happened.
//             console.log("Logout ERRR")

//         });

//     }
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Mainsection from './MainSection';

function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarOpen = () => {
        setIsSidebarOpen(true);
    };

    const handleSidebarClose = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex h-screen bg-gray-200">
            {/* Sidebar */}
            <div
                className={`${isSidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
                    } fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-white overflow-y-auto lg:translate-x-0 lg:static lg:inset-0`}
            >
                {/* Sidebar header */}
                <div className="flex items-center justify-between mt-8 ml-8">
                    <div>
                        <img
                            className="h-8 w-auto"
                            src="https://via.placeholder.com/150"
                            alt="Logo"
                        />
                    </div>
                    <div className="relative">
                        <button
                            className="text-gray-500 focus:outline-none"
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

                {/* Sidebar links */}
                <nav className="mt-10">
                    <NavLink
                        exact
                        to="/"
                        activeClassName="font-bold bg-gray-200 text-indigo-600"
                        className="block py-2 pl-8 pr-4 hover:bg-gray-200 transition duration-200"
                    >
                        <svg
                            className="h-5 w-5 fill-current mr-2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 2L2 7v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7l-10-5zM9 14v5l6-3-6-2zm0-3l6-3v-3l-6 3V6L4 9v6l5-2z"
                            />
                        </svg>
                        Home
                    </NavLink>
                    <NavLink
                        exact
                        to="/profile"
                        activeClassName="font-bold bg-gray-200 text-indigo-600"
                        className="block py-2 pl-8 pr-4 hover:bg-gray-200 transition duration-200"
                    >
                        <svg
                            className="h-5 w-5 fill-current mr-2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15.5 14.5c-3.3 0-6-2.7-6-6V6h12v2.5c0 3.3-2.7 6-6 6zM6 12c0 2.2 1.8 4 4 4h4v-2H10c-1.1 0-2-.9-2-2V6H6v6zm12 2h-4v2h4c1.1 0 2-.9 2-2v-2h-2v2zm-2-10V4h-8v2h8z"
                            />
                        </svg>
                        Profile
                    </NavLink>
                </nav>
            </div>



            <Mainsection handleSidebarOpen={handleSidebarOpen}/>
             


        </div>
    );
};








export default Sidebar