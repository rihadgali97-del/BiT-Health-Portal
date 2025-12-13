import React, { useState } from 'react';
import '../../styles/Auth.css';

const RegisterForm = ({ navigateTo, onRegister }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        studentId: '',
        age: '',
        sex: '',
        department: '',
        yearOfEducation: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''
    });
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateField = (name, value) => {
        switch (name) {
            case 'fullName':
                if (!value.trim()) return "Full name is required";
                if (value.trim().length < 3) return "Full name must be at least 3 characters";
                return "";

            case 'studentId':
                if (!value.trim()) return "Student ID is required";
                // Allow alphanumeric student IDs (letters and numbers)
                if (!/^[A-Za-z0-9-]+$/.test(value))
                    return "Student ID can only contain letters, numbers, and hyphens";
                return "";

            case 'age':
                if (!value) return "Age is required";
                const ageNum = parseInt(value);
                if (isNaN(ageNum) || ageNum < 16 || ageNum > 50)
                    return "Age must be a number between 16 and 50";
                return "";

            case 'sex':
                if (!value) return "Please select your gender";
                return "";

            case 'phoneNumber':
                if (!value.trim()) return "Phone number is required";
                // Accept Ethiopian numbers: +251 followed by 7 or 9 digits
                const cleanPhone = value.replace(/\s/g, '');
                if (!/^\+251[79]\d{8}$/.test(cleanPhone))
                    return "Phone must be in format: +251 followed by 7 or 9, then 8 more digits";
                return "";

            case 'department':
                if (!value) return "Please select your department";
                return "";

            case 'yearOfEducation':
                if (!value) return "Please select your year of education";
                return "";

            case 'email':
                if (!value.trim()) return "Email is required";
                if (!/@bdu\.edu\.et$/i.test(value))
                    return "Must use university email (@bdu.edu.et)";
                return "";

            case 'password':
                if (!value) return "Password is required";
                if (value.length < 8) return "Password must be at least 8 characters";
                if (!/\d/.test(value)) return "Password must contain at least one number";
                if (!/[!@#$%^&*]/.test(value))
                    return "Password must contain at least one special character (!@#$%^&*)";
                return "";

            case 'confirmPassword':
                if (!value) return "Please confirm your password";
                if (value !== formData.password) return "Passwords do not match";
                return "";

            default:
                return "";
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({
                    ...prev,
                    profilePhoto: "Please upload an image file"
                }));
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    profilePhoto: "Image must be less than 5MB"
                }));
                return;
            }

            setProfilePhoto(file);
            setErrors(prev => ({
                ...prev,
                profilePhoto: ""
            }));
        }
    };

    const detectUserType = (email) => {
        const username = email.split('@')[0].toLowerCase();

        if (username.startsWith('admin') || username.includes('.admin')) return 'admin';
        if (username.startsWith('dr.') || username.startsWith('doctor') || username.includes('dr.')) return 'doctor';
        return 'student';
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        const allTouched = {};
        Object.keys(formData).forEach(key => {
            allTouched[key] = true;
        });
        setTouched(allTouched);

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert("Please fix the errors before submitting.");
            return;
        }

        const userData = {
            ...formData,
            profilePhoto: profilePhoto,
            type: detectUserType(formData.email),
            registrationDate: new Date().toISOString()
        };

        onRegister(userData);
    };

    const handleBackToLogin = () => {
        navigateTo('login');
    };

    const isFormValid = () => {
        return Object.values(errors).every(error => !error) &&
            Object.values(formData).every(value => value) &&
            formData.password.length >= 8;
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Student Registration</h1>
                    <p>Create your Bahir Dar University Health Portal account</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {/* Profile Photo Upload */}
                    <div className="form-group">
                        <label>Profile Photo (Optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className={errors.profilePhoto ? 'error-input' : ''}
                        />
                        {errors.profilePhoto && (
                            <div className="error-message">{errors.profilePhoto}</div>
                        )}

                    </div>

                    {/* Full Name */}
                    <div className="form-group">
                        <label>Full Name *</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter your full name"
                            required
                            className={errors.fullName ? 'error-input' : ''}
                        />
                        {errors.fullName && (
                            <div className="error-message">{errors.fullName}</div>
                        )}
                    </div>

                    {/* Student ID */}
                    <div className="form-group">
                        <label>Student ID *</label>
                        <input
                            type="text"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter your student ID "
                            required
                            className={errors.studentId ? 'error-input' : ''}
                        />
                        {errors.studentId && (
                            <div className="error-message">{errors.studentId}</div>
                        )}
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
                                onBlur={handleBlur}
                                placeholder="Age"
                                min="16"
                                max="50"
                                required
                                className={errors.age ? 'error-input' : ''}
                            />
                            {errors.age && (
                                <div className="error-message">{errors.age}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Sex *</label>
                            <select
                                name="sex"
                                value={formData.sex}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className={errors.sex ? 'error-input' : ''}
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {errors.sex && (
                                <div className="error-message">{errors.sex}</div>
                            )}
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
                            onBlur={handleBlur}
                            placeholder="+251 7XX XXX XXX or +251 9XX XXX XXX"
                            required
                            className={errors.phoneNumber ? 'error-input' : ''}
                        />
                        {errors.phoneNumber && (
                            <div className="error-message">{errors.phoneNumber}</div>
                        )}
                    </div>

                    {/* Department */}
                    <div className="form-group">
                        <label>Department *</label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={errors.department ? 'error-input' : ''}
                        >
                            <option value="">Select Department</option>
                            <option value="software-engineering">Software Engineering</option>
                            <option value="computer-engineering">Computer Engineering</option>
                            <option value="electrical-engineering">Electrical Engineering</option>
                            <option value="civil-engineering">Civil Engineering</option>
                            <option value="mechanical-engineering">Mechanical Engineering</option>
                            <option value="food-engineering">Food Engineering</option>
                            <option value="chemical-engineering">Chemical Engineering</option>
                            <option value="computer-science">Computer Science</option>
                            <option value="material-science">Material Science</option>
                            <option value="IT">Information Technology</option>
                            <option value="IS">Information Systems</option>
                            <option value="cyber-security">Cyber Security</option>
                        </select>
                        {errors.department && (
                            <div className="error-message">{errors.department}</div>
                        )}
                    </div>

                    {/* Year of Education */}
                    <div className="form-group">
                        <label>Year of Education *</label>
                        <select
                            name="yearOfEducation"
                            value={formData.yearOfEducation}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={errors.yearOfEducation ? 'error-input' : ''}
                        >
                            <option value="">Select Year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                            <option value="5">5th Year</option>
                        </select>
                        {errors.yearOfEducation && (
                            <div className="error-message">{errors.yearOfEducation}</div>
                        )}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label>University Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="username@bdu.edu.et"
                            required
                            className={errors.email ? 'error-input' : ''}
                        />
                        {errors.email && (
                            <div className="error-message">{errors.email}</div>
                        )}
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <label>Password *</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Min. 8 chars with number & special character"
                            required
                            className={errors.password ? 'error-input' : ''}
                        />
                        {errors.password && (
                            <div className="error-message">{errors.password}</div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="form-group">
                        <label>Confirm Password *</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Re-enter your password"
                            required
                            className={errors.confirmPassword ? 'error-input' : ''}
                        />
                        {errors.confirmPassword && (
                            <div className="error-message">{errors.confirmPassword}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="auth-btn"
                        disabled={!isFormValid()}
                    >
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