// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAiUUtoSppkFfMK5w2hTTi4gP4soj7qcos",
    authDomain: "fantasyfinds-toy-hub.firebaseapp.com",
    projectId: "fantasyfinds-toy-hub",
    storageBucket: "fantasyfinds-toy-hub.appspot.com",
    messagingSenderId: "724556453125",
    appId: "1:724556453125:web:c180bb2fd4894f37c1d36c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;