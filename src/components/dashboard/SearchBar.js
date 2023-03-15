import JSONDATA from "./mock_data.json";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

function SearchBar() {
    const [searchText, setSearchText] = useState("");
    const [allUsers,setAllUsers]=useState([])

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const allUsersNames=[]
                const userRef = collection(db, "users");
                try {
                    const querySnapshot = await getDocs(userRef);
                    querySnapshot.forEach((doc) => {
                        allUsersNames.push(doc.data().fullName)
                    });


                    setAllUsers(allUsersNames); // setState to allUsers
  
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



    return (
        <div className="App">
{console.log(allUsers)
}            <input
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
                            return val;
                        } else if (
                            val.toLowerCase().includes(searchText.toLowerCase())
                        ) {
                            return val;
                        } else {
                            return "";
                        }
                    }).map((data, index) => (
                        <li key={index}>{data}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


export default SearchBar;