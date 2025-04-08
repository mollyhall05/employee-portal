import { React, useState } from 'react';
import { database } from '../firebase_setup/firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const PostNotification = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [status , setStatus] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !message) {
            setStatus('Please fill in all fields');
            return;
        }

        try {
            await addDoc(collection(database, 'notifications'), {
                title,
                message,
            });

            setStatus('Notification posted successfully!');
            setTitle('');
            setMessage('');
        } catch (error) {
            setStatus('Error posting notification: ' + error.message);
        }
    };

    return (
        <div className="main-container">
          <h2>Post a New Notification</h2>
    
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label>Title</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter notification title"
              />
            </div>
    
            <div>
              <label>Message</label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter notification message"
              ></textarea>
            </div>
    
            <button
              type="submit"
            >
              Send Notification
            </button>
    
            {status && <p>{status}</p>}
          </form>

            <button onClick={() => navigate('/manager-dashboard')}>Back to Dashboard</button>
        </div>
    );
};

export default PostNotification;