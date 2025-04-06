import React, { useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { database } from "../firebase_setup/firebase.js";
import { collection, addDoc,doc,getDoc} from "firebase/firestore";

const ConsultantInfo = () => {
    const [userData, setUserData] = useState(null);
    return (
        <div style={{textAlign: 'center', padding: '20px' }}>
            <h2>Consultant Information</h2>
                <div style={{display: "inline-block", textAlign: "left"}}>
                    <p>Name:</p>
                    <p>Email:</p>
                    <p>Phone Number:</p>
                    <p>Role:</p>
                </div>
        </div>
    );
}
export default ConsultantInfo;