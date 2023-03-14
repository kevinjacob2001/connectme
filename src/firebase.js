// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpJr24S6tQnnU8YTDFatM_weO0wdvkAJ4",
  authDomain: "connectme-74d3c.firebaseapp.com",
  projectId: "connectme-74d3c",
  storageBucket: "connectme-74d3c.appspot.com",
  messagingSenderId: "1009021340006",
  appId: "1:1009021340006:web:37d00ba7f137b3c55b20a7",
  measurementId: "G-EGWP829396"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);