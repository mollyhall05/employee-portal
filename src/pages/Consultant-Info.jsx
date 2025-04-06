import React, { useState,useEffect } from 'react';
import { database } from "../firebase_setup/firebase.js";
import { collection,getDocs} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { colors } from '@mui/material';
import { red } from '@mui/material/colors';
const ConsultantInfo = () => {
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const employeeDatabase=collection(database, "Employees");
                const employeeSnapshot=await getDocs(employeeDatabase);
                const employeeData=employeeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUserData(employeeData);
            }
            catch (error) {
                console.error("Error fetching user data:", error);
                alert("Error fetching user data. Please try again later.");
            }
        };
        fetchUserData();
    }, []);
    return (
        <div>
        <h2>Consultant Information</h2>
        {userData.length > 0 ? (
            <div>
                {userData.map((consultant) => (
                    <button
                    key={consultant.id}
                    onClick={() =>
                        alert(
                            `Consultant Details:\nName: ${consultant.name}\nEmail: ${consultant.email}\nPhone: ${consultant.phone_number}`
                        )
                    }
                >
                    {consultant.name}
                </button>
                ))}
            </div>
            
        ) : (
            <p>Loading consultant information...</p>
        )}
        <div>
        <button onClick={() => navigate("/")} style={{backgroundColor:"red"}}>Back to Dashboard</button>
        </div>
    </div>
    );
}
export default ConsultantInfo;