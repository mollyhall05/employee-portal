// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAYrw34_CDQ-Gf8zo5FAzZhqtG-LmxUEfo",
    authDomain: "fdm-employee-project.firebaseapp.com",
    projectId: "fdm-employee-project",
    storageBucket: "fdm-employee-project.firebasestorage.app",
    messagingSenderId: "24857924980",
    appId: "1:24857924980:web:cdd45b68840086168f8821",
    measurementId: "G-GVGZQ2DLH7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database=getFirestore(app)
export {database,collection, addDoc, getDocs, deleteDoc, doc,updateDoc};