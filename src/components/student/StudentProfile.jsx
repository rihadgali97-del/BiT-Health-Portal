import React, { useState, useEffect } from 'react';
import '../../styles/StudentProfile.css';

const StudentProfile = ({ user, onUpdateProfile, navigateTo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');

    // Initialize with user data
    useEffect(() => {
        if (user) {
            setFormData({
                personalInfo: {
                    fullName: user.fullName || '',
                    email: user.email || '',
                    phone: user.phone || user.phoneNumber || '',
                    age: user.age || '',
                    sex: user.sex || '',
                    department: user.department || '',
                    yearOfEducation: user.yearOfEducation || '',
                    studentId: user.studentId || '',
                    emergencyContact: user.emergencyContact || {
                        name: '',
                        relationship: '',
                        phone: ''
                    }
                }
            });
        }
    }, [user]);

    const handleInputChange = (section, field, value, subField = null) => {
        setFormData(prev => {
            const newData = { ...prev };
            if (subField) {
                newData[section] = {
                    ...newData[section],
                    [field]: {
                        ...newData[section][field],
                        [subField]: value
                    }
                };
            } else {
                newData[section] = {
                    ...newData[section],
                    [field]: value
                };
            }
            return newData;
        });
    };

    const handleSave = async () => {
        setLoading(true);
        setSaveStatus('saving');

        try {
            // Backend API call
            const response = await fetch('/api/students/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData.personalInfo)
            });

            if (response.ok) {
                const updatedData = await response.json();
                setSaveStatus('success');

                if (onUpdateProfile) {
                    onUpdateProfile(updatedData);
                }

                setTimeout(() => {
                    setIsEditing(false);
                    setSaveStatus('');
                }, 2000);
            } else {
                throw new Error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setSaveStatus('error');
            setTimeout(() => setSaveStatus(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        // Reset to original user data
        setFormData({
            personalInfo: {
                fullName: user.fullName || '',
                email: user.email || '',
                phone: user.phone || user.phoneNumber || '',
                age: user.age || '',
                sex: user.sex || '',
                department: user.department || '',
                yearOfEducation: user.yearOfEducation || '',
                studentId: user.studentId || '',
                emergencyContact: user.emergencyContact || {
                    name: '',
                    relationship: '',
                    phone: ''
                }
            }
        });
        setIsEditing(false);
        setSaveStatus('');
    };

    const renderField = (field, label, type = 'text', editable = true) => {
        const value = formData.personalInfo?.[field] || '';

        if (!editable) {
            return (
                <div className="profile-field readonly">
                    <label>{label}:</label>
                    <span className="field-value">{value || 'Not set'}</span>
                    <span className="field-note">(Cannot be updated)</span>
                </div>
            );
        }

        if (isEditing) {
            if (type === 'textarea') {
                return (
                    <div className="profile-field">
                        <label>{label}:</label>
                        <textarea
                            value={value}
                            onChange={(e) => handleInputChange('personalInfo', field, e.target.value)}
                            rows="3"
                            placeholder={`Enter your ${label.toLowerCase()}`}
                        />
                    </div>
                );
            } else if (type === 'select') {
                if (field === 'sex') {
                    return (
                        <div className="profile-field">
                            <label>{label}:</label>
                            <select
                                value={value}
                                onChange={(e) => handleInputChange('personalInfo', field, e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    );
                } else if (field === 'yearOfEducation') {
                    return (
                        <div className="profile-field">
                            <label>{label}:</label>
                            <select
                                value={value}
                                onChange={(e) => handleInputChange('personalInfo', field, e.target.value)}
                            >
                                <option value="">Select Year</option>
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                                <option value="5">5th Year</option>
                            </select>
                        </div>
                    );
                } else if (field === 'department') {
                    return (
                        <div className="profile-field">
                            <label>{label}:</label>
                            <select
                                value={value}
                                onChange={(e) => handleInputChange('personalInfo', field, e.target.value)}
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
                                <option value="IT">IT</option>
                                <option value="IS">IS</option>
                                <option value="cyber-security">Cyber Security</option>
                            </select>
                        </div>
                    );
                }
            } else {
                return (
                    <div className="profile-field">
                        <label>{label}:</label>
                        <input
                            type={type}
                            value={value}
                            onChange={(e) => handleInputChange('personalInfo', field, e.target.value)}
                            placeholder={`Enter your ${label.toLowerCase()}`}
                        />
                    </div>
                );
            }
        } else {
            let displayValue = value;
            if (field === 'yearOfEducation' && value) {
                displayValue = `${value}${getOrdinalSuffix(value)} Year`;
            }
            return (
                <div className="profile-field">
                    <label>{label}:</label>
                    <span className="field-value">{displayValue || 'Not set'}</span>
                </div>
            );
        }
    };

    const getOrdinalSuffix = (number) => {
        if (number === '1') return 'st';
        if (number === '2') return 'nd';
        if (number === '3') return 'rd';
        return 'th';
    };

    const renderEmergencyContact = () => {
        const emergencyContact = formData.personalInfo?.emergencyContact || {};

        if (isEditing) {
            return (
                <div className="sub-section">
                    <h4>Emergency Contact</h4>
                    <div className="profile-field">
                        <label>Contact Name:</label>
                        <input
                            type="text"
                            value={emergencyContact.name || ''}
                            onChange={(e) => handleInputChange('personalInfo', 'emergencyContact', { ...emergencyContact, name: e.target.value })}
                            placeholder="Emergency contact full name"
                        />
                    </div>
                    <div className="profile-field">
                        <label>Relationship:</label>
                        <input
                            type="text"
                            value={emergencyContact.relationship || ''}
                            onChange={(e) => handleInputChange('personalInfo', 'emergencyContact', { ...emergencyContact, relationship: e.target.value })}
                            placeholder="e.g., Parent, Guardian, Sibling"
                        />
                    </div>
                    <div className="profile-field">
                        <label>Contact Phone:</label>
                        <input
                            type="tel"
                            value={emergencyContact.phone || ''}
                            onChange={(e) => handleInputChange('personalInfo', 'emergencyContact', { ...emergencyContact, phone: e.target.value })}
                            placeholder="Emergency contact phone number"
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="sub-section">
                    <h4>Emergency Contact</h4>
                    <div className="profile-field">
                        <label>Contact Name:</label>
                        <span className="field-value">{emergencyContact.name || 'Not set'}</span>
                    </div>
                    <div className="profile-field">
                        <label>Relationship:</label>
                        <span className="field-value">{emergencyContact.relationship || 'Not set'}</span>
                    </div>
                    <div className="profile-field">
                        <label>Contact Phone:</label>
                        <span className="field-value">{emergencyContact.phone || 'Not set'}</span>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="student-profile-container">
            <div className="student-profile-header">
                <button
                    onClick={() => navigateTo('student-dashboard')}
                    className="back-btn"
                >
                    ← Back to Dashboard
                </button>
                <div className="header-content">
                    <h1>Student Profile</h1>
                    <p>Manage your personal and academic information</p>
                </div>
                <div className="profile-actions">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="edit-btn"
                        >
                            ✏️ Edit Profile
                        </button>
                    ) : (
                        <div className="editing-actions">
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className={`save-btn ${loading ? 'loading' : ''}`}
                            >
                                {loading ? '💾 Saving...' : '💾 Save Changes'}
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={loading}
                                className="cancel-btn"
                            >
                                ❌ Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="student-profile-content">
                {/* Status Messages */}
                {saveStatus === 'success' && (
                    <div className="status-message success">
                        ✅ Profile updated successfully!
                    </div>
                )}
                {saveStatus === 'error' && (
                    <div className="status-message error">
                        ❌ Failed to update profile. Please try again.
                    </div>
                )}

                <div className="profile-section">
                    <h2>Personal Information</h2>
                    <div className="section-content">
                        {renderField('fullName', 'Full Name')}
                        {renderField('email', 'Email', 'email', false)}
                        {renderField('studentId', 'Student ID', 'text', false)}
                        {renderField('age', 'Age', 'number')}
                        {renderField('sex', 'Gender', 'select')}
                        {renderField('phone', 'Phone', 'tel')}
                    </div>
                </div>

                <div className="profile-section">
                    <h2>Academic Information</h2>
                    <div className="section-content">
                        {renderField('department', 'Department', 'select')}
                        {renderField('yearOfEducation', 'Year of Education', 'select')}
                    </div>
                </div>

                {renderEmergencyContact()}

                {isEditing && (
                    <div className="edit-notice">
                        <div className="notice-icon">💡</div>
                        <div className="notice-content">
                            <h4>Edit Mode Active</h4>
                            <p>You are currently editing your profile. Email and Student ID cannot be changed for security reasons.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentProfile;