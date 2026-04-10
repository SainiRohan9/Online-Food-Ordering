import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Form data being sent:', formData);
        try {
            const res = await API.post('/auth/login', formData);
            console.log('Login response:', res.data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.user.id);
            alert("Welcome back!");
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
            console.error('Error response:', err.response?.data);
            alert("Login failed: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
