import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from "../firebase_setup/firebase.js";
import { collection, addDoc,doc,getDoc } from "firebase/firestore";
import './styles/Submit-Leave.css';
import fdmLogo from './styles/images/FDMlogo.png';

function SubmitExpense() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [userData, setUserData] = useState(null);
    useEffect(() => {
            const userData = localStorage.getItem("user");
            if (userData) {
                setUserData(JSON.parse(userData));
            }
        }, []);
    const handleSubmit = async(e) => {
        e.preventDefault();
        // Validate the form inputs
        if (!amount || !description) {
            alert('Please fill in all fields');
            return;
        }
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        const userID = userData.id; // Assuming EmployeeID is stored in localStorage
        try {
            console.log('User ID:', userID);
            const ExpenseRequests = doc(database, 'ExpenseRequests', userID);
            const expenseDoc = await getDoc(ExpenseRequests);
            if (expenseDoc.exists()) {
                alert('Expense request already exists for this user!');
                return;
            }
            // Create a new document with the userID as the document ID
            await addDoc(collection(database, 'ExpenseRequests'), {
                userID: userID,
                amount: amount,
                description: description,
                status: 'pending',
                submittedAt: new Date().toISOString(),
                submittedBy: userData?.name || 'Unknown'
            });
            alert('Expense request submitted successfully!');
            navigate('/consultant-dashboard'); // Redirect to dashboard after successful submission
        }
        catch (error) {
            console.error('Error checking expense request:', error);
            alert('Error checking expense request. Please try again later.');
            return;
        }
    };

    return (
        <div className="form-container">
            <img src={fdmLogo} alt="FDM Logo" className="logo" />
            <h2 className="header">Submit Expense</h2>
            <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <div>
                    <label>Amount:</label>
                    <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ marginRight: "5px" }}>£</span>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0"
                        step="0.01" // Allows decimal values for GBP
                        required
                    />
                    </div>
                </div>
                <div>
                <label>Description:</label>
                <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter expense details (e.g., Travel, Meals, etc.)"
        rows="3" // Initial number of rows
        style={{
            width: "107%",
            resize: "none", // Prevent manual resizing
            overflow: "hidden", // Prevent scrollbars
            border: "1px solid #ccc",
            borderRadius: "4px",
        }}
        onInput={(e) => {
            e.target.style.height = "auto"; // Reset height
            e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height dynamically
        }}
        required
    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <button onClick={() => navigate('/consultant-dashboard')} className="button">Back to Dashboard</button>
        </div>

    );
}

export default SubmitExpense;