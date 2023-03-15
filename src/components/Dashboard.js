import React, { useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Sidebar from './dashboard/Sidebar';
import Mainsection from './dashboard/MainSection'


const Dashboard = () => {
    const navigate = useNavigate()
 

    // useEffect(()=>{
    //     const fetchUserDetails=async()=>{
    //         try {
    //             const emailIDfromLocalStorage=localStorage.getItem("userEmailID")
    //             const userRef = doc(db, "users", "keivn@asas.asd");
    //             try {
    //                 const docSnap = await getDoc(userRef);
    //                 console.log(docSnap.data());
    //             } catch(error) {
    //                 console.log(error)
    //             }

    //             console.log('User profile saved!');
    //         } catch (error) {
    //             console.error('Error saving user profile: ', error);
    //         }
    //     }
    //     fetchUserDetails()
    // },[])
    return (
        <div>
            <div className='flex'>
                <Sidebar />
                <Mainsection/>
            </div>


        </div>


    )
}

export default Dashboard