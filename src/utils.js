import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

const fetchUserDetails = async (id) => {
    try {
        const userRef = doc(db, "users", id);
        try {
            const docSnap = await getDoc(userRef);
            console.log(docSnap.data());
        } catch (error) {
            console.log(error)
        }

        console.log('User details!');
    } catch (error) {
        console.error('Error feching: ', error);
    }
}

export default fetchUserDetails