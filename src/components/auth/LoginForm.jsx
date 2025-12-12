import React, { useState } from 'react';
import '../../styles/Auth.css';

const LoginForm = ({ onLogin, navigateTo }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            name: email.split('@')[0],
            type: 'student'
        };
        onLogin(userData);
    };

    const handleCreateAccount = () => {
        navigateTo('register');
    };

    const handleBackToHome = () => {
        navigateTo('home');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">


                <div className="auth-header">
                    <h1>BiT Health Portal</h1>
                    <p>Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@university.edu"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit" className="auth-btn">
                        Sign In
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account?</p>
                    <button onClick={handleCreateAccount} className="auth-secondary-btn">
                        Create New Account
                    </button>
                    <p>
                        <button className="link-btn">Forgot your password?</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;