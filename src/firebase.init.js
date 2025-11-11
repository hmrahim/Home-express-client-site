// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEeOxGewgRsy6NK9Zn1FPbuxjaCl14v2s",
  authDomain: "homeexpress-sa.firebaseapp.com",
  projectId: "homeexpress-sa",
  storageBucket: "homeexpress-sa.firebasestorage.app",
  messagingSenderId: "87695177459",
  appId: "1:87695177459:web:30194fa454d132eee3a986"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
export default auth;
