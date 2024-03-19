// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:  import.meta.env.FIREBASE_APIKEY,
    authDomain: import.meta.env.FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.FIREBASE_PROJECTID,
    storageBucket:import.meta.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId:import.meta.env.FIREBASE_MESSAGINGSENDERID,
    appId: import.meta.env.FIREBASE_APPID

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
