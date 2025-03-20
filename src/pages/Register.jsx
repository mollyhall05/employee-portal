import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase_setup/firebase.js";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

function RegisterPage() {
	const navigate = useNavigate();
	// State to store form input values
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	// State for error messages
	const [error, setError] = useState("");

	// Handle input change
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		// Reference to the Employees collection
		const employeesRef = collection(database, "Employees");

		// Query for existing email
		const emailQuery = query(
			employeesRef,
			where("email", "==", formData.email)
		);
		const emailSnapshot = await getDocs(emailQuery);

		// Query for existing username
		const usernameQuery = query(
			employeesRef,
			where("username", "==", formData.username)
		);
		const usernameSnapshot = await getDocs(usernameQuery);

		// If either email or username already exists, clear the fields and display an error
		if (!emailSnapshot.empty || !usernameSnapshot.empty) {
			setError("Username or Email already exists!");
			setFormData({ username: "", email: "", password: "" });
			return;
		}

		try {
			await addDoc(employeesRef, formData);
			alert("Sign up successful!");
			navigate("/"); // Ensure your route for '/login' is correctly set up
		} catch (error) {
			console.error("Error during sign up:", error);
			setError("There was an error during sign up. Please try again.");
		}
	};

	return (
		<div className="register-container">
			<h2>Register</h2>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleInputChange}
						required
					/>
				</div>

				<button type="submit">Register</button>
			</form>
		</div>
	);
}

export default RegisterPage;
