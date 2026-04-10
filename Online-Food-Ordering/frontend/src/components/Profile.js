import React, { useEffect, useState } from 'react';
import API from '../api';

const Profile = () => {
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Using test endpoint as workaround
                const res = await API.get(`/test-user/${userId}`);
                setUser(res.data);
            } catch (err) {
                console.error('Failed to fetch user:', err);
            }
        };
        if (userId) fetchUser();
    }, [userId]);

    if (!user) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4 text-center" style={{ maxWidth: '400px', margin: 'auto' }}>
                <div 
                    className="bg-danger text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                    style={{ width: '80px', height: '80px' }}
                >
                    <h2 className="m-0">{user?.username?.charAt(0).toUpperCase()}</h2>
                </div>
                <h3>{user?.username}</h3>
                <p className="text-muted">{user?.email}</p>
                <hr />
                <div className="d-grid gap-2">
                    <button className="btn btn-outline-danger">Edit Profile</button>
                    <button className="btn btn-outline-secondary" onClick={() => window.history.back()}>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
