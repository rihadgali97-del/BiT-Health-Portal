import React, { useState } from 'react';

const StaffRegistration = ({ navigateTo, onRegister }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        staffId: '',
        staffType: 'nurse', // Default to nurse
        department: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        qualifications: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        // Include staff type in registration data
        const userData = {
            ...formData,
            role: formData.staffType // Add role for user type detection
        };

        onRegister(userData);
    };

    const handleBackToHome = () => {
        navigateTo('home');
    };

    const handleBackToLogin = () => {
        navigateTo('login');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <button onClick={handleBackToHome} className="login-back-btn">
                    ← Back to Home
                </button>

                <div className="auth-header">
                    <h1>Staff Registration</h1>
                    <p>Create your University Health Portal staff account</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {/* Full Name */}
                    <div className="form-group">
                        <label>Full Name *</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    {/* Staff ID */}
                    <div className="form-group">
                        <label>Staff ID *</label>
                        <input
                            type="text"
                            name="staffId"
                            value={formData.staffId}
                            onChange={handleChange}
                            placeholder="Enter your staff ID"
                            required
                        />
                    </div>

                    {/* Staff Type */}
                    <div className="form-group">
                        <label>Staff Type *</label>
                        <select
                            name="staffType"
                            value={formData.staffType}
                            onChange={handleChange}
                            required
                        >
                            <option value="nurse">Nurse</option>
                            <option value="receptionist">Receptionist</option>
                            <option value="pharmacist">Pharmacist</option>
                            <option value="lab_technician">Lab Technician</option>
                            <option value="doctor">Doctor</option>
                        </select>
                    </div>

                    {/* Department */}
                    <div className="form-group">
                        <label>Department *</label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Department</option>
                            <option value="emergency">Emergency Department</option>
                            <option value="outpatient">Outpatient Clinic</option>
                            <option value="pharmacy">Pharmacy</option>
                            <option value="laboratory">Laboratory</option>
                            <option value="reception">Reception</option>
                            <option value="general">General Practice</option>
                        </select>
                    </div>

                    {/* Qualifications */}
                    <div className="form-group">
                        <label>Qualifications</label>
                        <textarea
                            name="qualifications"
                            value={formData.qualifications}
                            onChange={handleChange}
                            placeholder="Enter your qualifications, certifications, or specializations..."
                            rows="2"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="form-group">
                        <label>Phone Number *</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="+251 9XX XXX XXX"
                            required
                        />
                    </div>

                    {/* Email - Auto-generate based on staff type */}
                    <div className="form-group">
                        <label>Email Address *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={`your.name@${formData.staffType}.university.edu`}
                            required
                        />
                        <small style={{color: '#718096', marginTop: '5px'}}>
                            Use @{formData.staffType}.university.edu domain
                        </small>
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <label>Password *</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="form-group">
                        <label>Confirm Password *</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <button type="submit" className="auth-btn">
                        Create Staff Account
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Already have an account?{' '}
                        <button onClick={handleBackToLogin} className="link-btn">
                            Sign in here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StaffRegistration;