import React, { useState, useEffect } from 'react';
import '../../styles/DoctorProfile.css';

const DoctorProfile = ({ user, onUpdateProfile, navigateTo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');

    // Initialize with user data or empty structure
    useEffect(() => {
        if (user) {
            setFormData({
                personalInfo: {
                    fullName: user.fullName || '',
                    email: user.email || '',
                    phone: user.phone || '',
                    specialization: user.specialization || '',
                    department: user.department || '',
                    bio: user.bio || ''
                }
            });
        }
    }, [user]);

    const handleInputChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        setSaveStatus('saving');

        try {
            // Backend API call - replace with your actual endpoint
            const response = await fetch('/api/doctors/profile', {
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

                // Update local user data
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
        // Reset form to original user data
        setFormData({
            personalInfo: {
                fullName: user.fullName || '',
                email: user.email || '',
                phone: user.phone || '',
                specialization: user.specialization || '',
                department: user.department || '',
                bio: user.bio || ''
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
                            rows="4"
                            placeholder={`Enter your ${label.toLowerCase()}`}
                        />
                    </div>
                );
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
            return (
                <div className="profile-field">
                    <label>{label}:</label>
                    <span className="field-value">{value || 'Not set'}</span>
                </div>
            );
        }
    };

    return (
        <div className="doctor-profile-container">
            <div className="doctor-profile-header">
                <button
                    onClick={() => navigateTo('doctor-dashboard')}
                    className="back-btn"
                >
                    ← Back to Dashboard
                </button>
                <div className="header-content">
                    <h1>Doctor Profile</h1>
                    <p>Manage your professional information</p>
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

            <div className="doctor-profile-content">
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
                    <h2>Professional Information</h2>
                    <div className="section-content">
                        {renderField('fullName', 'Full Name')}
                        {renderField('email', 'Email', 'email', false)} {/* Email cannot be changed */}
                        {renderField('phone', 'Phone', 'tel')}
                        {renderField('specialization', 'Specialization')}
                        {renderField('department', 'Department')}
                        {renderField('bio', 'Professional Bio', 'textarea')}
                    </div>
                </div>

                {isEditing && (
                    <div className="edit-notice">
                        <div className="notice-icon">💡</div>
                        <div className="notice-content">
                            <h4>Edit Mode Active</h4>
                            <p>You are currently editing your profile. Email cannot be changed for security reasons.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorProfile;