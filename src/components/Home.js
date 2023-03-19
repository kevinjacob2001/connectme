import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate=useNavigate()
    const logOutUser = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Logout successful")
            navigate("/")
        }).catch((error) => {
            // An error happened.
            console.log("Logout ERRR")

        });

    }
    return (
        <div>

            welcome to the home page

            <button onClick={logOutUser}>Log out</button>
        </div>


    )
}

export default Home