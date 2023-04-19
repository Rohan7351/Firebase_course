// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXvu1nyz4mnkcQq0Fc57-wInLGxMWaiB0",
  authDomain: "fir-course-5643c.firebaseapp.com",
  projectId: "fir-course-5643c",
  storageBucket: "fir-course-5643c.appspot.com",
  messagingSenderId: "531538345138",
  appId: "1:531538345138:web:2eb3ca630ad78e791d9dab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
export const db = getFirestore(app);