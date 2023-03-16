import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useSelector, useDispatch } from 'react-redux'
import { isAuthTrue, isAuthFalse } from '../reducers/userSlice'
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore'

const Login = () => {
    const userData = useSelector((state) => state.user.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [bio, setBio] = useState("");
    const [showLogin, setShowLogin] = useState(true);
    const [showSignUp, setShowSignUp] = useState(false);


    const createNote = async () => {
        await setDoc(doc(db, 'notes', 12), "Hao");
    };



    const signUp = async () => {

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            localStorage.setItem("token", response.user.accessToken);
            localStorage.setItem("userEmailID", response.user.email);

            try {
                const userRef = collection(db,"users");
                await addDoc(userRef, {
                    fullName: fullName,
                    phoneNumber: phoneNumber,
                    email: email,
                    bio: "",
                    profilePicUrl: "",
                    friends: [],
                    sendRequests:[],
                    receivedRequests:[]
                });
                console.log('User profile saved!');
            } catch (error) {
                console.error('Error saving user profile: ', error);
            }


            navigate('/dashboard')
        } catch (e) {
            console.log(e)
        }
    }
    const login = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            localStorage.setItem("userEmailID", response.user.email);
            localStorage.setItem("token", response.user.accessToken);
            navigate('/dashboard')
        } catch (e) {
            console.log(e)
        }

    }

    const ShowSignUp = () => {
        setShowLogin(false);
        setShowSignUp(true);
    }
    const ShowLogin = () => {
        setShowLogin(true);
        setShowSignUp(false);
    }


    return (
        <>
            {(userData) ? (<h1>true</h1>) : <h1>false</h1>}
            <div>

                <button onClick={ShowLogin}>Login</button> <button onClick={ShowSignUp}>Signup</button>


            </div>
            {showSignUp && (
                <div>
                    <h1>Sign up</h1>

                    <div>
                        <label>Name </label>
                        <input type="text" placeholder='Full name' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>

                    <div>
                        <label>Phone no</label>
                        <input type="text" placeholder='Phone' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>



                    <div>
                        <label>Email ID</label>
                        <input type="text" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>


                    <div>
                        <label>Password</label>
                        <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>



                    <button onClick={signUp}>Sign Up</button>
                </div>
            )}

            {showLogin && (
                <div>
                    <h1>Login</h1>
                    <input type="text" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={login}>Log in</button>
                </div>
            )}


        </>
    )
}

export default Login