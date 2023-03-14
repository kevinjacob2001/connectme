import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useSelector, useDispatch } from 'react-redux'
import { isAuthTrue,isAuthFalse } from '../reducers/authSlice'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const isAuthStatus = useSelector((state) => state.auth.value)
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showLogin, setShowLogin] = useState(true);
    const [showSignUp, setShowSignUp] = useState(false);

    const signUp = async () => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log(response.user.accessToken)
            localStorage.setItem("token", response.user.accessToken);
            navigate('/home')
        } catch (e) {
            console.log(e)
        }
    }
    const login=async()=>{
        try{
            const response=await signInWithEmailAndPassword(auth,email,password)
            console.log(response.user.accessToken)
            localStorage.setItem("token", response.user.accessToken);
            navigate('/dashboard')
        } catch (e) {
            console.log(e)
        }

    }

    const ShowSignUp=()=>{
        setShowLogin(false);
        setShowSignUp(true);
    }
    const ShowLogin=()=>{
        setShowLogin(true);
        setShowSignUp(false);
    }


    return (
        <>
        {(isAuthStatus)?(<h1>true</h1>):<h1>false</h1>}
            <div>

                <button onClick={ShowLogin}>Login</button> <button onClick={ShowSignUp}>Signup</button>


            </div>
            {showSignUp && (
                <div>
                    <h1>Sign up</h1>
                    <input type="text" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
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