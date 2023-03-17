import React from 'react'
import { NavLink } from 'react-router-dom'
import ReceivedFriendRequestsSection from './ReceivedFriendRequestsSection'
import SearchBar from './SearchBar'

 const Mainsection = ({handleSidebarOpen}) => {
  return (
//     <div className="">
// {/*Search bar*/}
// <SearchBar/>
// <ReceivedFriendRequestsSection/>

//     </div>
<div className="flex-1 flex flex-col overflow-hidden">
{/* Header */}
<header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600">
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
<SearchBar/>
</div>


    {/* Search input */}
    <div className="relative hidden lg:block">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg
                className="h-6 w-6 fill-current text-gray-500"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M9 17a7 7 0 1 1 4.95-2.05M23 23L16.65 16.65M1 1l6.35 6.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>

        <div className='hidden md:flex'>
<SearchBar/>
</div>


    </div>

    {/* Avatar dropdown */}
    <div className="relative">
        <button className="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none">
            <img
                className="h-full w-full object-cover"
                src="https://via.placeholder.com/150"
                alt="Your avatar"
            />
        </button>

        <div className="absolute right-0 mr-3 mt-2">
            <div className="bg-white rounded-md shadow-lg py-2">
                <NavLink
                    exact
                    to="/profile"
                    activeClassName="font-bold"
                    className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                >
                    Profile
                </NavLink>
                <NavLink
                    exact
                    to="/logout"
                    activeClassName="font-bold"
                    className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                >
                    Logout
                </NavLink>
            </div>
        </div>
    </div>
</header>

{/* Main content */}
<div className="flex-1 overflow-y-auto p-4">
    {/* Page title */}
    <h1 className="text-2xl font-medium text-gray-800">Dashboard</h1>
    {/* Page content */}
    <p className="mt-4 text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel
        sem eu eros interdum pretium sit amet id nunc. Pellentesque nec
        rhoncus ipsum. Sed eget bibendum nisi, in volutpat arcu. Vestibulum
        id posuere nulla, ut aliquet ipsum. Fusce venenatis, magna vel
        malesuada aliquam, urna mauris sodales lorem, ut posuere enim nulla
        ut risus.
    </p>
    <ReceivedFriendRequestsSection/>

</div>
</div>
  )
}

export default Mainsection