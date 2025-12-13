import React, { useState } from 'react';
import '../../styles/Auth.css';

const LoginForm = ({ onLogin, navigateTo }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // --- Specific Admin Credentials (for mock testing) ---
    const ADMIN_EMAIL = "rihadgali97@gmail.com";
    const ADMIN_PASSWORD = "11111111"; 

    // Validate university email
    const validateEmail = (email) => {
        if (!email) return "Email is required";
        const lowerEmail = email.toLowerCase();

        // 1. Allow specific admin email bypass
        if (lowerEmail === ADMIN_EMAIL) {
            return ""; 
        }

        // 2. Enforce university domain
        const universityEmailPattern = /@bdu\.edu\.et$/i;
        if (!universityEmailPattern.test(email)) {
            return "Please use your university email (@bdu.edu.et)";
        }
        return "";
    };

    // Validate password (Must be >= 8 characters)
    const validatePassword = (password) => {
        if (!password) return "Password is required";
        if (password.length < 8) {
            return "Password must be at least 8 characters long";
        }
        return "";
    };

    // Detect user type based on email pattern
    const detectUserType = (email) => {
        const lowerEmail = email.toLowerCase();
        const username = lowerEmail.split('@')[0];

        if (lowerEmail === ADMIN_EMAIL) return 'admin'; // Override for hardcoded admin

        // Patterns for BDU users
        if (/@bdu\.edu\.et$/i.test(lowerEmail)) {
            // Detect doctor: contains 'doctor' or 'dr' in the username
            if (username.includes('doctor') || username.includes('dr.')) {
                return 'doctor';
            }
            // Detect BDU admin (if you use an account like admin@bdu.edu.et)
            if (username.includes('admin')) {
                 return 'admin';
            }
            
            return 'student'; // Default for regular BDU emails
        }

        return 'student'; // Should not happen if validateEmail passed
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // --- 1. Client-Side Format Validation ---
        const emailValidationError = validateEmail(email);
        const passwordValidationError = validatePassword(password);
        
        setEmailError(emailValidationError);
        setPasswordError(passwordValidationError);

        if (emailValidationError || passwordValidationError) {
            return; 
        }

        // --- 2. Mock Authentication (Simulating API check) ---
        let isAuthenticated = false;
        let userType = detectUserType(email);

        // a) Check for Hardcoded Admin (Rihadgali)
        if (email.toLowerCase() === ADMIN_EMAIL) {
            if (password === ADMIN_PASSWORD) {
                isAuthenticated = true;
                userType = 'admin'; // Confirm admin role
            } else {
                setPasswordError('Incorrect password or email');
                return;
            }
        } 
        
        // b) Mock Login for BDU Doctor/Student (Password just needs to pass format validation)
        else if (/@bdu\.edu\.et$/i.test(email.toLowerCase())) {
            // Success for all BDU accounts since we are mocking auth
            isAuthenticated = true;
        }

        // --- 3. Final Check & Login Action ---
        if (isAuthenticated) {
            setEmailError('');
            setPasswordError('');

            const userData = {
                email: email,
                name: email.split('@')[0],
                type: userType // Pass the detected user type to App.js
            };
            
            onLogin(userData); 
        } else {
            // Fallback for general authentication failure (e.g., non-bdu, non-admin)
            alert("Login failed. Please check your credentials."); 
        }
    };

    const handleCreateAccount = () => {
        navigateTo('register');
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setEmailError(validateEmail(newEmail));
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordError(validatePassword(newPassword));
    };

    // Check if form is valid (no errors and fields are filled)
    const isFormValid = () => {
        return !validateEmail(email) && !validatePassword(password) && email && password;
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
                        <label>Email Address *</label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="username@bdu.edu.et "
                            required
                            className={emailError ? 'error-input' : ''}
                        />
                        {emailError && (
                            <div className="error-message" style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>
                                {emailError}
                            </div>
                        )}
                    
                    </div>

                    <div className="form-group">
                        <label>Password *</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter your password (min. 8 characters)"
                            required
                            className={passwordError ? 'error-input' : ''}
                        />
                        {passwordError && (
                            <div className="error-message" style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>
                                {passwordError}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="auth-btn"
                        disabled={!isFormValid()} 
                    >
                        Sign In
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account?</p>
                    <button onClick={handleCreateAccount} className="auth-secondary-btn">
                        Create New Account
                    </button>
                    <p>
                        <button
                            onClick={() => alert('Please contact the university IT department for password reset.')}
                            className="link-btn"
                        >
                            Forgot your password?
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;