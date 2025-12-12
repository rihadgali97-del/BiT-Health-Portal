import React from 'react';

const StudentHeader = ({ studentProfile, handleBackToHome, onLogout }) => {
    return (
        <div className="student-header">
            <div className="student-info">
                <div className="student-avatar">
                    {studentProfile.name?.split(' ').map(n => n[0]).join('') || 'S'}
                </div>
                <div>
                    <h1>Student Dashboard</h1>
                    <p>Welcome back, {studentProfile.name || 'Student'}</p>
                    <span className="student-id">ID: {studentProfile.studentId || 'Not provided'}</span>
                </div>
            </div>
            <div className="student-actions">
                <button
                    onClick={handleBackToHome}
                    className="btn-secondary"
                >
                    🏠 Back to Home
                </button>
                <button
                    onClick={onLogout}
                    className="btn-primary logout-btn"
                >
                    🚪 Logout
                </button>
            </div>
        </div>
    );
};

export default StudentHeader;