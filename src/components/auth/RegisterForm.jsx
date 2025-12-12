import React, { useState } from 'react';
//import '../../../styles/Auth.css';

const RegisterForm = ({ navigateTo, onRegister }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        studentId: '',
        age: '',
        sex: '',
        department: '',
        yearOfEducation: '', // NEW FIELD ADDED
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''
    });
    const [profilePhoto, setProfilePhoto] = useState(null); // ONLY ADDITION

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // ONLY ADDITION - Handle photo upload
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePhoto(file);
        }
    };

    // Add user type detection
    const detectUserType = (email) => {
        const emailPatterns = {
            admin: /@admin\.university\.edu$/i,
            doctor: /@doctor\.university\.edu$|\.dr@/i,
            student: /@student\.university\.edu$|@.*\.edu$/i
        };

        if (emailPatterns.admin.test(email)) return 'admin';
        if (emailPatterns.doctor.test(email)) return 'doctor';
        if (emailPatterns.student.test(email)) return 'student';

        return 'student';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        // Include user type in registration data
        const userData = {
            ...formData,
            type: detectUserType(formData.email)
        };

        onRegister(userData);
    };


    const handleBackToLogin = () => {
        navigateTo('login');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">

                <div className="auth-header">
                    <h1>Student Registration</h1>
                    <p>Create your University Health Portal account</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {/* Profile Photo Upload - ONLY ADDITION */}
                    <div className="form-group">
                        <label>Profile Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            style={{
                                padding: '8px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                width: '100%'
                            }}
                        />
                    </div>

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

                    {/* Student ID */}
                    <div className="form-group">
                        <label>Student ID *</label>
                        <input
                            type="text"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            placeholder="Enter your student ID"
                            required
                        />
                    </div>

                    {/* Age and Sex in one row */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Age *</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="Age"
                                min="16"
                                max="50"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Sex *</label>
                            <select
                                name="sex"
                                value={formData.sex}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
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
                            <option value="engineering">Software Engineering</option>
                            <option value="engineering">Computer Engineering</option>
                            <option value="electrical-engineering">Electrical Engineering</option>
                            <option value="civil-engineering">Civil Engineering</option>
                            <option value="mechanical-engineering">Mechanical Engineering</option>
                            <option value="food-engineering">Food Engineering</option>
                            <option value="chemical-engineering">Chemical Engineering</option>
                            <option value="computer-science">Computer Science</option>
                            <option value="material-science">Material Science</option>
                            <option value="IT">IT</option>
                            <option value="IS">IS</option>
                            <option value="cyber-securit">Cyber Security</option>
                        </select>
                    </div>

                    {/* NEW FIELD: Year of Education */}
                    <div className="form-group">
                        <label>Year of Education *</label>
                        <select
                            name="yearOfEducation"
                            value={formData.yearOfEducation}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                            <option value="5">5th Year</option>
                        </select>
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label>University Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@university.edu"
                            required
                        />
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
                        Create My Account
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

export default RegisterForm;