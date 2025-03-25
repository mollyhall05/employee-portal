import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';

function SubmitExpense() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Expense Submitted: $${amount} for ${description}`);
        setAmount('');
        setDescription('');
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