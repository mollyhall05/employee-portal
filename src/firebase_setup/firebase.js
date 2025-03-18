// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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