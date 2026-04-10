import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const AuthPage = () => {
    const [view, setView] = useState('login'); // login, register, forgot
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.user.id);
            localStorage.setItem('username', res.data.user.username);
            navigate('/home');
        } catch (err) {
            alert("Invalid Credentials");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', { username, email, password });
            alert("Registration successful! Please login.");
            setView('login');
        } catch (err) {
            alert("Registration failed: " + (err.response?.data?.error || err.message));
        }
    };

    const handleResetRequest = async (e) => {
        e.preventDefault();
        alert(`A reset link has been sent to ${email} (Simulation)`);
        setView('login');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ width: '400px' }}>
                {view === 'login' && (
                    <form onSubmit={handleLogin}>
                        <h3 className="text-center mb-3">Login</h3>
                        <input 
                            className="form-control mb-2" 
                            type="email" 
                            placeholder="Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <input 
                            className="form-control mb-2" 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <button className="btn btn-danger w-100 mb-2">Login</button>
                        <div className="d-flex justify-content-between small">
                            <span 
                                className="text-primary" 
                                style={{ cursor: 'pointer' }} 
                                onClick={() => setView('forgot')}
                            >
                                Forgot Password?
                            </span>
                            <span 
                                className="text-primary" 
                                style={{ cursor: 'pointer' }} 
                                onClick={() => setView('register')}
                            >
                                Create Account
                            </span>
                        </div>
                    </form>
                )}

                {view === 'register' && (
                    <form onSubmit={handleRegister}>
                        <h3 className="text-center mb-3">Register</h3>
                        <input 
                            className="form-control mb-2" 
                            type="text" 
                            placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                        <input 
                            className="form-control mb-2" 
                            type="email" 
                            placeholder="Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <input 
                            className="form-control mb-2" 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <button className="btn btn-success w-100 mb-2">Create Account</button>
                        <button 
                            type="button"
                            className="btn btn-link w-100" 
                            onClick={() => setView('login')}
                        >
                            Back to Login
                        </button>
                    </form>
                )}

                {view === 'forgot' && (
                    <form onSubmit={handleResetRequest}>
                        <h3 className="text-center mb-3">Reset Password</h3>
                        <p className="small text-muted text-center">
                            Enter your email to receive a reset link.
                        </p>
                        <input 
                            className="form-control mb-2" 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <button className="btn btn-warning w-100 mb-2">Send Link</button>
                        <button 
                            type="button"
                            className="btn btn-link w-100" 
                            onClick={() => setView('login')}
                        >
                            Back to Login
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuthPage;
