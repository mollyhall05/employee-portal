import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../firebase_setup/firebase.js';
import { collection, getDocs, query, onSnapshot, where, updateDoc, doc } from 'firebase/firestore';

const ApproveExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const q = query(collection(database, 'ExpenseRequests'), where('status', '==', 'pending'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const expensesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setExpenses(expensesData);
        }, (error) => {
            console.error('Error fetching expenses:', error);
            setStatus('Error fetching expenses');
        })

        return () => unsubscribe();
    }, []);

    const handleApproval = async (id, action) => {
        try {
            const expenseRef = doc(database, 'ExpenseRequests', id);
            await updateDoc(expenseRef, {
                status: action,
            });
            setStatus(`Expense ${action === 'approved' ? 'approved' : 'rejected'} successfully!`);
            setExpenses(expenses.filter(expense => expense.id !== id));
        } catch (error) {
            console.error('Error updating expense status:', error);
            setStatus('Error updating expense status');
        }
    };

    return (
        <div style={{ backgrounColor: 'white' }}>
          <h2>Approve Expenses</h2>
          {status && <p>{status}</p>}
          
          <div>
            {expenses.length === 0 ? (
              <p>No pending expenses to approve.</p>
            ) : (
              expenses.map((expense) => (
                <div key={expense.id}>
                  <h3>{expense.description}</h3>
                  <p><strong>Amount:</strong> ${expense.amount}</p>
                  <p><strong>Submitted by:</strong> {expense.submittedBy}</p>
                  <p><strong>Submitted at:</strong> {new Date(expense.submittedAt.seconds * 1000).toLocaleString()}</p>
    
                  <div>
                    <button
                      onClick={() => handleApproval(expense.id, 'approved')}                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApproval(expense.id, 'rejected')}                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <button onClick={() => navigate('/manager-dashboard')}>Back to Dashboard</button>
        </div>
    );
};

export default ApproveExpenses;