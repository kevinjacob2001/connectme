import React, { useState } from 'react';
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from '../firebase';


function ProfilePage() {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [bio, setBio] = useState('');
  const [count,setCount]=useState(1);


//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//         localStorage.setItem("userEmailID");
//       const paymentRef = doc(db, "users", "kev"
//        );
//       await setDoc(paymentRef, {
//         basket: "data",
//         amount: 100,
//         created: 110,
//       });
//       console.log('User profile saved!');
//     } catch (error) {
//       console.error('Error saving user profile: ', error);
//     }
//   };





  return (
    <form >
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Profile Picture:
        <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} />
      </label>
      <br />
      <label>
        Bio:
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      </label>
      <br />
      <button type="submit">Save</button>
    </form>
  );
}

export default ProfilePage;
