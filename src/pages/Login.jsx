import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Placeholder for login logic
        if (email === "example@example.com" && password === "password") {
            localStorage.setItem("user", JSON.stringify({ email }));
            navigate('/consultant-dashboard');
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div style={{textAlign: "center", padding: "20px"}}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                <button type="submit">Login</button>
                <Link to={'/Register'}>Register</Link>
            </form>
        </div>
    );
}

export default Login;