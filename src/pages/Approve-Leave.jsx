import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../firebase_setup/firebase.js';
import { collection, getDocs, getDoc, query, onSnapshot, where, updateDoc, doc } from 'firebase/firestore';

const ApproveLeave = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            try {
                const q = query(collection(database, 'LeaveRequests'), where('status', '==', 'Pending'));
                const snapshot = await getDocs(q);
                const leaves = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                const leavesWithNames = await Promise.all(leaves.map(async (leave)=> {
                  const employeeDoc = await getDoc(doc(database, 'Employees', leave.userID));
                  const employeeName = employeeDoc.exists() ? employeeDoc.data().name : 'Unknown';
                  return {
                      ...leave,
                      employeeName: employeeName,
                  };
                }))

                setLeaveRequests(leavesWithNames);
            } catch (error) {
                console.error('Error fetching leave requests:', error);
                setStatus('Error fetching leave requests');
            }
        };
        fetchLeaveRequests();
    }, []);

    const handleApproval = async (id, action) => {
        try {
          const leaveRef = doc(database, 'LeaveRequests', id);
          await updateDoc(leaveRef, { status: action });
          setLeaveRequests((prev) => prev.filter((leave) => leave.id !== id));
          setStatus(`Leave ${action} successfully!`);
        } catch (error) {
          console.error('Error updating leave status:', error);
          setStatus('Error updating leave status');
        }
      };

      return (
        <div className="main-container">
          <h2>Approve Leave Requests</h2>
          {status && <p>{status}</p>}
    
          {leaveRequests.length === 0 ? (
            <p>No pending leave requests.</p>
          ) : (
            leaveRequests.map((request) => (
              <div key={request.id}>
                <h3>{request.employeeName}</h3>
                <p><strong>Type:</strong> {request.leaveType}</p>
                <p><strong>Dates:</strong> {request.startDate} to {request.endDate}</p>
                <p><strong>Reason:</strong> {request.reason}</p>
    
                <div>
                  <button
                    onClick={() => handleApproval(request.id, 'approved')}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(request.id, 'rejected')}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
    
          <button
            onClick={() => navigate('/manager-dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
    );
}

export default ApproveLeave;