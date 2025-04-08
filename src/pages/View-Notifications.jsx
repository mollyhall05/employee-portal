import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database as db} from '../firebase_setup/firebase.js';
import { getDocs, collection } from 'firebase/firestore';
import './styles/View-Notifications.css';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'notifications'));
                const notificationsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setNotifications(notificationsData);
            } catch (err) {
                console.error('Error fetching notifications:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    if (loading) return <p>Loading notifications...</p>;
    if (error) return <p>Error loading notifications: {error.message}</p>;
    if (notifications.length === 0) return <p>No notifications available.</p>;

    return (
        <div className="main-container">
            <h2 className="header">Notifications</h2>
            {notifications.length === 0 ? (
                <p>No notifications at the moment.</p>
            ) : (
                <ul>
                    {notifications.map((note, index) => (
                        <li className="notification-card" key={index}>
                            <h3>{note.title}</h3>
                            <p>{note.message}</p>
                        </li>
                    ))}
                </ul>
            )}

            <button onClick={() =>navigate("/consultant-dashboard")} style={{marginTop: "20px"}}>
                Back to Dashboard
            </button>
        </div>
    );
};

export default Notifications;