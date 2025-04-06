import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { database } from "../firebase_setup/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import './styles/Login.css';
import fdmLogo from './styles/images/FDMlogo.png';

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		// Reference to the Employees collection
		const employeesRef = collection(database, "Employees");

		// Query for a document where email and password match the input
		const q = query(
			employeesRef,
			where("email", "==", email),
			where("password", "==", password)
		);

		const querySnapshot = await getDocs(q);
		if (!querySnapshot.empty) {
			// Found a matching user; for each match (ideally one), store user info in local storage
			querySnapshot.forEach((doc) => {
				console.log(doc.id);
				localStorage.setItem("userRole", UserActivation.role);
				localStorage.setItem("user", JSON.stringify({...doc.data(),id:doc.id}));

				if (doc.data().role === "Admin") {
					navigate("/manager-dashboard");
				} else {
					navigate("/consultant-dashboard");
				}
			});
		} else {
			alert("Invalid credentials");
		}
	};

	return (
		<div className="login-page">
		<nav>
			<button className="nav-button" onClick={() => navigate("/consultant-info")}>View Consultant Information</button>
		</nav>
		<div className="login-container">
			<img src={fdmLogo} alt="FDM Logo" className="logo" />
			<h2 className="login-tile">Login</h2>
			<form onSubmit={handleLogin}>
				<input className="login-input"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<br />
				<input className="login-input"
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<br />
				<button className="login-button" type="submit">Login</button>
				<br />
				<Link className="register-link" to={"/Register"}>Register</Link>
			</form>
		</div>
		</div>
	);
}

export default Login;
