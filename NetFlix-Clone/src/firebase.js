// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrukstmPfsaBXHPcesxo8_Gapbki2a-zA",
  authDomain: "netflix-clone-6b1bd.firebaseapp.com",
  projectId: "netflix-clone-6b1bd",
  storageBucket: "netflix-clone-6b1bd.firebasestorage.app",
  messagingSenderId: "979221689640",
  appId: "1:979221689640:web:1ca530abd1140ae1090c1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initialize firebase authentecator
const auth = getAuth(app);
//Configure firestor for database
const db = getFirestore(app);

//Create functions
const signup = async (name, email,password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth,email,password);
    const user = res.user;
    //store user in firestore database
    await addDoc(collection(db,"user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = () => {
  signOut(auth);
}

export {auth,db,login,signup,logout};