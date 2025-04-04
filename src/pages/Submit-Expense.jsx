import React, { useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { database } from "../firebase_setup/firebase.js";
import { collection, addDoc,doc,getDoc} from "firebase/firestore";

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
                status: 'Pending',
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
        <div style={{textAlign: 'center', padding: '20px' }}>
            <h2>Submit Expense</h2>
            <form onSubmit={handleSubmit} style={{display: "inline-block", textAlign: "left"}}>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <button onClick={() => navigate('/consultant-dashboard')}>Back to Dashboard</button>
        </div>
    );
}

export default SubmitExpense;