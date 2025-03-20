import React, {useEffect, useState} from "react";
import { database } from "../firebase_setup/firebase.js";
import { collection,doc,updateDoc } from "firebase/firestore";

const DisplayInfo = () => {
    const[personalInfo, setPersonalInfo] = useState(null);
    useEffect(()=>{
        const userData=localStorage.getItem("user");
        if(userData){
            setPersonalInfo(JSON.parse(userData));
        }
    },[]);
    if (!personalInfo) {
        return <div>Loading...</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const storedUserData = JSON.parse(localStorage.getItem("user"));
        const updatedFields = {};

        for (const key in personalInfo) {
            if (personalInfo[key] !== storedUserData[key]) {
                updatedFields[key] = personalInfo[key];
            }
        }

        if (Object.keys(updatedFields).length === 0) {
            alert("No changes detected.");
            return;
        }

        const employeesRef = collection(database, "Employees");
        const docRef = doc(employeesRef, personalInfo.id);

        try {
            await updateDoc(docRef, updatedFields);
            localStorage.setItem("user", JSON.stringify(personalInfo));
            alert("Information successfully updated!");
        } catch (error) {
            console.error("Error updating document: ", error);
            alert("Error saving information!");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Profile</h2>
            <form onSubmit={handleSave}>

                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={personalInfo.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={personalInfo.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={personalInfo.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={personalInfo.phone_number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}
export default DisplayInfo;