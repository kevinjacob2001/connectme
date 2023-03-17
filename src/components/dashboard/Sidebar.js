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
import { NavLink, useLocation } from 'react-router-dom';
import UserPage from '../UserPage';
import Mainsection from './MainSection';

function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const [showModal, setShowModal] = React.useState(false);


    const handleSidebarOpen = () => {
        setIsSidebarOpen(true);
    };

    const handleSidebarClose = () => {
        setIsSidebarOpen(false);
    };

    return (
      
    
        <div className="flex  w-screen ">
            {/* Sidebar */}
            

            <div
                className={`${isSidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
                    } fixed z-30 inset-y-0 left-0  md:h-screen w-64 transition duration-300 transform bg-[#c3c7d1]  overflow-y-auto lg:translate-x-0 lg:static lg:inset-0`}
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

                        onClick={() => setShowModal(true)}

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
            <>
        

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
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