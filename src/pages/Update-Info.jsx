import React, {useEffect, useState} from "react";
import { database } from "../firebase_setup/firebase.js";
import { collection,doc,updateDoc } from "firebase/firestore";

const DisplayInfo = () => {
    const [personalInfo, setPersonalInfo] = useState(null);
    const [isEdit, setIsEdit] = useState(false); // New state for edit mode
    const [isPasswordEdit, setIsPasswordEdit] = useState(false); // New state for password edit mode
    const [OldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setPersonalInfo(JSON.parse(userData));
        }
    }, []);
    if (!personalInfo) {
        return <div>Loading...</div>;
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPersonalInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };
    const handlePasswordChange = (e) => {
        const {name, value} = e.target;
        if (name === "OldPassword") {
            setOldPassword(value);
        } else if (name === "newPassword") {
            setNewPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    };
    const handleSave = async (e) => {
        e.preventDefault();
        if(isEdit){
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
        }
        if(isPasswordEdit){
            console.log(OldPassword);
            console.log(newPassword);
            console.log(confirmPassword);

            if (newPassword !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            if (OldPassword !== personalInfo.password) {
                alert("Old password is incorrect!");
                return;
            }
            const employeesRef = collection(database, "Employees");
            const docRef = doc(employeesRef, personalInfo.id);

            try {

                await updateDoc(docRef, {password: newPassword});
                alert("Password successfully updated!");
            } catch (error) {
                console.error("Error updating password: ", error);
                alert("Error updating password!");
            }
        }
    };

        return (
            <div style={{textAlign: "center", padding: "20px"}}>
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
                            disabled={!isEdit}
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
                            disabled={!isEdit}
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
                            disabled={!isEdit}
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
                            disabled={!isEdit}
                        />
                    </div>
                    <div>
                        <label>Old Password:</label>
                        <input
                            type="password"
                            name="OldPassword"
                            onChange={handlePasswordChange}
                            disabled={!isPasswordEdit}
                        />
                    </div>
                    <div>
                        <label>new Password:</label>
                        <input
                            type="password"
                            name="newPassword"
                            onChange={handlePasswordChange}
                            disabled={!isPasswordEdit}
                        />
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            onChange={handlePasswordChange}
                            disabled={!isPasswordEdit}
                        />
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => {setIsEdit(true); setIsPasswordEdit(false);}}>Edit</button>
                    <button type="button" onClick={() => {setIsPasswordEdit(true); setIsEdit(false);}}>Change Password</button>

                </form>
            </div>
        );
    };
export default DisplayInfo;