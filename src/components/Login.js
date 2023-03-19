import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useSelector, useDispatch } from 'react-redux'
import { isAuthTrue, isAuthFalse } from '../reducers/userSlice'
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

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





    const notify = () => toast();


    const signUp = async (e) => {
        e.preventDefault()

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            localStorage.setItem("token", response.user.accessToken);
            localStorage.setItem("userEmailID", response.user.email);

            try {
                const userRef = collection(db, "users");
                const resp = await addDoc(userRef, {
                    fullName: fullName,
                    phoneNumber: phoneNumber,
                    email: email,
                    bio: "",
                    profilePicUrl: "",
                    friends: [],
                    sendRequests: [],
                    receivedRequests: []
                });

                localStorage.setItem("currentUserFirestoreDocID", resp.id);

                toast.success('You have successfully signed-up!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (error) {
                console.error('Error saving user profile: ', error);
            }


            navigate('/dashboard')
        } catch (e) {
            toast.error(e.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const login = async (e) => {
        e.preventDefault()

        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            localStorage.setItem("userEmailID", response.user.email);
            localStorage.setItem("token", response.user.accessToken);



            const q = query(collection(db, "users"), where("email", "==", response.user.email));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots

              localStorage.setItem("currentUserFirestoreDocID", doc.id);

            });
            






            toast.success('You have successfully Logged-in!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/dashboard')

        } catch (e) {
            console.log(e.message)
            toast.error(e.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
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

            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-indigo-300 ">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-lg lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-indigo-600 ">
                        Connectme
                        <div>
                        </div>

                    </h1>



                    {showSignUp && (
                        <>

                            <form className="mt-6">
                                <div className="mb-2">
                                    <label
                                        for="fullName"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Full name
                                    </label>
                                    <input
                                        type="text"
                                        value={fullName} onChange={(e) => setFullName(e.target.value)}
                                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>


                                <div className="mb-2">
                                    <label
                                        for="email"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>


                                <div className="mb-2">
                                    <label
                                        for="phoneNumber"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Phone no.
                                    </label>
                                    <input
                                        type="text"
                                        value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>



                                <div className="mb-2">
                                    <label
                                        for="password"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>

                                <div className="mt-6">
                                    <button
                                        onClick={(e) => signUp(e)}

                                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                        Sign up
                                    </button>
                                </div>
                            </form>

                            <p className="mt-8 text-xs font-light text-center text-gray-700">
                                {" "}
                                Don't have an account?{" "}

                                <button onClick={ShowLogin}>Sign</button>
                            </p>

                            <ToastContainer />

                        </>
                    )}



                    {showLogin && (
                        <>

                            <form className="mt-6">
                                <div className="mb-2">
                                    <label
                                        for="email"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label
                                        for="password"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>

                                <div className="mt-6">
                                    <button
                                        onClick={(e) => login(e)}
                                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-400 focus:outline-none focus:bg-purple-600">
                                        Login
                                    </button>
                                </div>
                            </form>

                            <p className="mt-8 text-xs font-light text-center text-gray-700">
                                {" "}
                                Don't have an account?{" "}
                                <button onClick={ShowSignUp}>Signup</button>
                            </p>
                        </>
                    )}

                    <ToastContainer position="bottom-right" />



                </div>
            </div>






        </>
    )
}

export default Login