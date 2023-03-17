import JSONDATA from "./mock_data.json";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const [searchText, setSearchText] = useState("");
    const [allUsers, setAllUsers] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const allUsersNames = []
                const userRef = collection(db, "users");
                try {
                    const querySnapshot = await getDocs(userRef);
                    querySnapshot.forEach((doc) => {
                        allUsersNames.push({ name: doc.data().fullName, id: doc.id })
                    });
                    //remove a specific user input  from a js array
                    let currentUserFirestoreDocID = localStorage.getItem("currentUserFirestoreDocID")

                    let arr = allUsersNames.filter(obj => obj.id !== currentUserFirestoreDocID);

                    setAllUsers(arr); // setState to allUsers
                } catch (error) {
                    console.log(error)
                }
                console.log('User profile saved!');
            } catch (error) {
                console.error('Error saving user profile: ', error);
            }
        }
        fetchUserDetails()
    }, [])

    const navigateToProfile = (userID) => {
        navigate(`/user/${userID}`)
    }


    return (
        <div className="App  ">
            <input
                type="text"
                placeholder="Search..."
                value={searchText}
                className=" bg-indigo-100 w-full  px-4 py-2 text-gray-700  rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"

                onChange={(event) => {
                    setSearchText(event.target.value);
                }}
            />
            {searchText !== "" && (
                <div>
                    <ul>
                        {allUsers.filter((val) => {
                            if (searchText === "") {
                                return val.name;
                            } else if (
                                val.name.toLowerCase().includes(searchText.toLowerCase())
                            ) {
                                return val.name;
                            } else {
                                return "";
                            }
                        }).map((data, index) => (
                            <li
                                key={index}
                                onClick={() => navigateToProfile(data.id)}
                                className="flex items-center justify-between px-4 py-2 last:py-2 text-gray-800 last:border-b-0 hover:bg-gray-100 cursor-pointer transition duration-300 ease-in-out  border-b border-gray-200"
                            >
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                                        <svg
                                            className="w-6 h-6 text-gray-500"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium">{data.name}</span>
                                </div>

                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    );
}


export default SearchBar;