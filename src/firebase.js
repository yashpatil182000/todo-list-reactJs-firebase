// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF9Wf089DOf2_P_cWjscOxq5o_fwI-6Qs",
  authDomain: "todo-list-reactjs-firebase.firebaseapp.com",
  projectId: "todo-list-reactjs-firebase",
  storageBucket: "todo-list-reactjs-firebase.firebasestorage.app",
  messagingSenderId: "18306366520",
  appId: "1:18306366520:web:22d08ece78df8b31327acd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
