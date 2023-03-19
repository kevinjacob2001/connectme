import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { db } from '../../firebase'
import ReceivedFriendRequestsSection from './ReceivedFriendRequestsSection'
import SearchBar from './SearchBar'

const Mainsection = ({ handleSidebarOpen }) => {
  const [userData,setUserData]=useState([])

  useEffect(()=>{
    const getCurrentUserDetails=async()=>{

      let currentUserFirestoreDocID = localStorage.getItem("currentUserFirestoreDocID")
      console.log("currentUserFirestoreDocID is",currentUserFirestoreDocID)
      try {
        const userRef = doc(db, "users", currentUserFirestoreDocID);
        try {
            const docSnap = await getDoc(userRef);
            setUserData(docSnap.data())
        } catch (error) {
            console.log(error)
        }
        console.log('User profile saved!');
    } catch (error) {
        console.error('Error saving user profile: ', error);
    }
  }
  getCurrentUserDetails()
},[])

  return (

    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center py-4 px-6 bg-white border-b-[1px]">
        {/* Burger button */}

        <button
          className="text-gray-500 focus:outline-none lg:hidden"
          onClick={handleSidebarOpen}
        >
          <svg
            className="h-6 w-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className='flex sm:hidden'>
          <SearchBar />
        </div>


        {/* Search input */}
        <div className="relative hidden lg:block">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">

          </span>

          <div className='hidden md:flex  '>
            <SearchBar />
          </div>


        </div>


      </header>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4 ">
        {/* Page title */}
        {console.log(userData.fullName)}
        <h1 className="text-2xl font-semibold text-gray-800">Welcome{""},{" "}{userData.fullName}!</h1>
        {/* Page content */}
        <p className="mt-4 mb-4 text-gray-600">
        Introducing the ultimate social media application - connect, share and discover like never before! Stay in touch with friends and family with ease.
        
        </p>
        <ReceivedFriendRequestsSection />

      </div>
    </div>
  )
}

export default Mainsection