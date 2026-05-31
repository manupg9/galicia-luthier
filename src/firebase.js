import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDpGCHSlWrheaCtilYoYE8ZIEt29_d1Mo",
  authDomain: "galicia-luthier.firebaseapp.com",
  projectId: "galicia-luthier",
  storageBucket: "galicia-luthier.firebasestorage.app",
  messagingSenderId: "723244713369",
  appId: "1:723244713369:web:90ab9b8029a561f65e3f08"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);