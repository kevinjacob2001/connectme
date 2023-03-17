import React, { useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Sidebar from './dashboard/Sidebar';
import Mainsection from './dashboard/MainSection'


const Dashboard = () => {

    return (
        <div>
            <div className='flex '>
                <Sidebar />
            </div>


        </div>


    )
}

export default Dashboard