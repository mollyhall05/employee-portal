import React, { useEffect, useState } from "react";
import { database } from "../firebase_setup/firebase.js";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const DisplayInfo = () => {
	const navigate = useNavigate();
	const [personalInfo, setPersonalInfo] = useState(null);
	const [isEdit, setIsEdit] = useState(false); // Edit mode for personal information
	const [isPasswordEdit, setIsPasswordEdit] = useState(false); // Edit mode for password
	const [OldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

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
			[name]: value,
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

	const validatePassword = (password) => {
		if (password.length < 8) {
			return "Password must be at least 8 characters long";
		}
		if (!/[A-Z]/.test(password)) {
			return "Password must contain at least one uppercase letter";
		}
		if (!/[a-z]/.test(password)) {
			return "Password must contain at least one lowercase letter";
		}
		if (!/[0-9]/.test(password)) {
			return "Password must contain at least one number";
		}
		return null;
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
			// Validate new password
			const passwordError = validatePassword(newPassword);
			if (passwordError) {
				alert(passwordError);
				return;
			}

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
				// Update local state and localStorage
				const updatedPersonalInfo = {
					...personalInfo,
					password: newPassword,
				};
				setPersonalInfo(updatedPersonalInfo);
				localStorage.setItem("user", JSON.stringify(updatedPersonalInfo));

				// Clear password fields
				setOldPassword("");
				setNewPassword("");
				setConfirmPassword("");

				alert("Password successfully updated!");
				setIsPasswordEdit(false); // Disable password editing mode
			} catch (error) {
				console.error("Error updating password: ", error);
				alert("Error updating password! Please try again.");
			}
		}
	};

	return (
		<div className="main-container">
			<h2>Profile</h2>
			<form
				onSubmit={handleSave}
				style={{ margin: "0 auto", textAlign: "left" }}
			>
				<div
					style={{
						marginBottom: "10px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						padding: "0.5rem",
						gap: "0.5rem"
					}}
				>
					<label>Name:</label>
					<input
						type="text"
						name="name"
						value={personalInfo.name}
						onChange={handleChange}
						required
						disabled={!isEdit}
						style={{
							width: "100%",
							padding: "8px",
							boxSizing: "border-box",
							overflow: "hidden", // Hide overflowing text
							textOverflow: "ellipsis", // Add ellipsis for overflowing text
							whiteSpace: "nowrap", // Prevent text from wrapping
						}}
					/>
					<label>Username:</label>
					<input
						type="text"
						name="username"
						value={personalInfo.username}
						onChange={handleChange}
						required
						disabled={!isEdit}
						style={{
							width: "100%",
							padding: "8px",
							boxSizing: "border-box",
							overflow: "hidden", // Hide overflowing text
							textOverflow: "ellipsis", // Add ellipsis for overflowing text
							whiteSpace: "nowrap", // Prevent text from wrapping
						}}
						/>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						padding: "2rem",
						gap: "0.5rem",
					}}
				>
					<label>Email:</label>
					<input
						type="email"
						name="email"
						value={personalInfo.email}
						onChange={handleChange}
						required
						disabled={!isEdit}
						style={{
							width: "100%",
							padding: "8px",
							boxSizing: "border-box",
							overflow: "hidden", // Hide overflowing text
							textOverflow: "ellipsis", // Add ellipsis for overflowing text
							whiteSpace: "nowrap", // Prevent text from wrapping
						}}
					/>
					<label>Phone Number:</label>
					<input
						type="text"
						name="phone_number"
						value={personalInfo.phone_number}
						onChange={handleChange}
						required
						disabled={!isEdit}
						style={{
							width: "100%",
							padding: "8px",
							boxSizing: "border-box",
							overflow: "hidden", // Hide overflowing text
							textOverflow: "ellipsis", // Add ellipsis for overflowing text
							whiteSpace: "nowrap", // Prevent text from wrapping
						}}
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
								style={{
									width: "100%",
									padding: "8px",
									boxSizing: "border-box",
								}}
							/>
						</div>
						<div style={{ marginBottom: "10px" }}>
							<label>New Password:</label>
							<input
								type="password"
								name="newPassword"
								onChange={handlePasswordChange}
								disabled={!isPasswordEdit}
								style={{
									width: "100%",
									padding: "8px",
									boxSizing: "border-box",
								}}
							/>
						</div>
						<div style={{ marginBottom: "10px" }}>
							<label>Confirm Password:</label>
							<input
								type="password"
								name="confirmPassword"
								onChange={handlePasswordChange}
								disabled={!isPasswordEdit}
								style={{
									width: "100%",
									padding: "8px",
									boxSizing: "border-box",
								}}
							/>
						</div>
					</>
				)}

				{!isPasswordEdit && (
					<button
						type="button"
						onClick={() => setIsEdit(!isEdit)}
						style={{ padding: "10px 20px", margin: "5px" }}
					>
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
			<div style={{marginTop: '20px'}}>
                <button onClick={() => navigate('/consultant-dashboard')}>Back to Dashboard</button>
            </div>
		</div>
	);
};

export default DisplayInfo;
