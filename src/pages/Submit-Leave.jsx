import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from "../firebase_setup/firebase.js";
import { collection, addDoc,doc,getDoc} from "firebase/firestore";

function SubmitLeave() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [leaveType, setLeaveType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUserData(JSON.parse(userData));
        }
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Validate the form inputs
        if (!leaveType || !startDate || !endDate) {
            alert('Please fill in all fields');
            return;
        }
        if (new Date(startDate) > new Date(endDate)) {
            alert('Start date cannot be after end date');
            return;
        }
        const userID = userData.id; // Assuming EmployeeID is stored in localStorage
        try {
            console.log('User ID:', userID);
            const LeaveRequests = doc(database, 'LeaveRequests', userID);
            const leaveDoc = await getDoc(LeaveRequests);
            if (leaveDoc.exists()) {
                alert('Leave request already exists for this user!');
                return;
            }
            // Create a new document with the userID as the document ID
            await addDoc(collection(database, 'LeaveRequests'), {
                userID: userID,
                leaveType: leaveType,
                startDate: startDate,
                endDate: endDate,
                status: 'Pending',
            });
            alert('Leave request submitted successfully!');
            navigate('/consultant-dashboard'); // Redirect to dashboard after successful submission
        }
        catch (error) {
            console.error('Error checking leave request:', error);
            alert('Error checking leave request. Please try again later.');
            return;
        }
    };

    return (
        <div style={{textAlign: 'center', padding: '20px' }}>
            <h2>Submit Leave Request</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Leave Type: </label>
                    <select
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                        required
                    >
                        <option value="">Select Leave Type</option>
                        <option value="Vacation">Vacation</option>
                        <option value="Sick">Sick</option>
                        <option value="Personal">Personal</option>
                    </select>
                </div>

                <br />
                <div>
                    <label>Start Date: </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>

                <br />
                <div>
                    <label>End Date: </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>

                <br />
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>

            <div style={{marginTop: '20px'}}>
                <button onClick={() => navigate('/consultant-dashboard')}>Back to Dashboard</button>
            </div>
        </div>
    );
}

export default SubmitLeave;