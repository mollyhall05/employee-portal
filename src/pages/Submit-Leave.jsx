import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SubmitLeave() {
    const navigate = useNavigate();

    const [leaveType, setLeaveType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Leave Submitted: ${leaveType} from ${startDate} to ${endDate}`);
        setLeaveType('');
        setStartDate('');
        setEndDate('');
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
                <button type="submit">Submit</button>
            </form>

            <div style={{marginTop: '20px'}}>
                <button onClick={() => navigate('/consultant-dashboard')}>Back to Dashboard</button>
            </div>
        </div>
    );
}

export default SubmitLeave;