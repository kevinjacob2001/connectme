import JSONDATA from "./mock_data.json";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const [searchText, setSearchText] = useState("");
    const [allUsers, setAllUsers] = useState([])
    const navigate=useNavigate();

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

    const navigateToProfile=(userID)=>{
        navigate(`/user/${userID}`)
    }


    return (
        <div className="App">
            <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(event) => {
                    setSearchText(event.target.value);
                }}
            />
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
                        <li key={index} onClick={()=>navigateToProfile(data.id)}>{data.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


export default SearchBar;