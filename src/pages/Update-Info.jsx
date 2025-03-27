import React, { useEffect, useState } from "react";
import { database } from "../firebase_setup/firebase.js";
import { collection, doc, updateDoc } from "firebase/firestore";

const DisplayInfo = () => {
    const [personalInfo, setPersonalInfo] = useState(null);
    const [isEdit, setIsEdit] = useState(false); // Edit mode for personal information
    const [isPasswordEdit, setIsPasswordEdit] = useState(false); // Edit mode for password
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
        const { name, value } = e.target;
        setPersonalInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
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

        if (isEdit) {
            const storedUserData = JSON.parse(localStorage.getItem("user"));
            const updatedFields = {};

            // Update personal information only if there is a change
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
                setIsEdit(false); // Disable editing mode
            } catch (error) {
                console.error("Error updating document: ", error);
                alert("Error saving information!");
            }
        }

        if (isPasswordEdit) {
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
                await updateDoc(docRef, { password: newPassword });
                alert("Password successfully updated!");
                setIsPasswordEdit(false); // Disable password editing mode
            } catch (error) {
                console.error("Error updating password: ", error);
                alert("Error updating password!");
            }
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Profile</h2>
            <form onSubmit={handleSave} style={{ margin: "0 auto", textAlign: "left" }}>
                <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", padding: "2rem", gap: "1rem" }}>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={personalInfo.name}
                        onChange={handleChange}
                        required
                        disabled={!isEdit}
                        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                    />
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={personalInfo.username}
                        onChange={handleChange}
                        required
                        disabled={!isEdit}
                        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                    />
                </div>
                <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", padding: "2rem", gap: "1rem" }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={personalInfo.email}
                        onChange={handleChange}
                        required
                        disabled={!isEdit}
                        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                    />
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={personalInfo.phone_number}
                        onChange={handleChange}
                        required
                        disabled={!isEdit}
                        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                    />
                </div>

                {isPasswordEdit && (
                    <>
                        <div style={{ marginBottom: "10px" }}>
                            <label>Old Password:</label>
                            <input
                                type="password"
                                name="OldPassword"
                                onChange={handlePasswordChange}
                                disabled={!isPasswordEdit}
                                style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                            />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label>New Password:</label>
                            <input
                                type="password"
                                name="newPassword"
                                onChange={handlePasswordChange}
                                disabled={!isPasswordEdit}
                                style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                            />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                onChange={handlePasswordChange}
                                disabled={!isPasswordEdit}
                                style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                            />
                        </div>
                    </>
                )}

                {!isPasswordEdit && (
                    <button type="button" onClick={() => setIsEdit(!isEdit)} style={{ padding: "10px 20px", margin: "5px" }}>
                        {isEdit ? "Cancel" : "Edit"}
                    </button>
                )}

                {!isPasswordEdit && (
                    <button
                        type="button"
                        onClick={() => {
                            setIsPasswordEdit(true);
                            setIsEdit(false);
                        }}
                        style={{ padding: "10px 20px", margin: "5px" }}
                    >
                        Change Password
                    </button>
                )}

                {isPasswordEdit || isEdit ? (
                    <button type="submit" style={{ padding: "10px 20px", margin: "5px" }}>
                        Save
                    </button>
                ) : null}
            </form>
        </div>
    );
};

export default DisplayInfo;
