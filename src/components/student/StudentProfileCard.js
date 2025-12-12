import React from 'react';

const StudentProfileCard = ({ studentProfile }) => {
    return (
        <div className="student-profile-card">
            <div className="profile-details">
                <div className="detail-row">
                    <strong>Department:</strong> {studentProfile.department || 'Not provided'}
                </div>
                <div className="detail-row">
                    <strong>Year:</strong> {studentProfile.year || 'Not provided'}
                </div>
                <div className="detail-row">
                    <strong>Blood Group:</strong> {studentProfile.bloodGroup}
                </div>
                <div className="detail-row">
                    <strong>Allergies:</strong> {studentProfile.allergies}
                </div>
            </div>
        </div>
    );
};

export default StudentProfileCard;