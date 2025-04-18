import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase_setup/firebase.js";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./styles/Register.css";
import fdmLogo from './styles/images/FDMlogo.png';

function RegisterPage() {
	const navigate = useNavigate();
	// State to store form input values
	const [formData, setFormData] = useState({
		name:"",
		username: "",
		email: "",
		phone_number:"",
		password: "",
		role: "consultant",
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

		const numberQuery = query(
			employeesRef,
			where("phone_number", "==", formData.phone_number)
		);
		const numberSnapshot = await getDocs(numberQuery);


		// If either email or username already exists, clear the fields and display an error
		if (!emailSnapshot.empty || !usernameSnapshot.empty||!numberSnapshot.empty) {
			setError("Username, Phone number or Email already exists!");
			setFormData({name:"",username: "", email: "",phone_number:"", password: "", role:"consultant", });
			return;
		}

		try {
			await addDoc(employeesRef, formData);
			alert("Sign up successful!");
			navigate("/"); // Ensure your route for '/login' is correctly set up and
		} catch (error) {
			console.error("Error during sign up:", error);
			setError("There was an error during sign up. Please try again.");
		}
	};

	return (
		<div className="register-container">
			<img src={fdmLogo} alt="FDM Logo" className="logo" />
			<h2>Register</h2>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						type="name"
						placeholder = "Full Name"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder = "Username"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="form-group">
					<input
						type="email"
						placeholder = "Email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="form-group">
					<input
						type="phone_number"
						placeholder = "Phone Number"
						id="phone_number"
						name="phone_number"
						value={formData.phone_number}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="form-group">
					<input
						type="password"
						placeholder = "Password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="form-group role">
					<select
						id="role"
						name="role"
						value={formData.role}
						onChange={handleInputChange}
						required
					>
						<option value="consultant">Consultant</option>
						<option value="Admin">Admin</option>
						<option value="Manager">Manager</option>
					</select>
				</div>

				<button type="submit">Register</button>
				<br />
				<Link className="login-link" to={"/"}>Back to Login</Link>
			</form>
		</div>
	);
}

export default RegisterPage;