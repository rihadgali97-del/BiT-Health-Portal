import React from 'react';
import '../../styles/MyAppointments.css';

const MyAppointments = ({ navigateTo }) => {
    const handleBackToDashboard = () => {
        navigateTo('student-dashboard');
    };

    return (
        <div className="appointments-container">
            <div className="appointments-content">
                <div className="appointments-header">
                    <div>
                        <h1>My Appointments - WORKING!</h1>
                        <p>This page is now connected properly</p>
                    </div>

                </div>

                <div className="appointment-stats">
                    <div className="stat-card">
                        <div className="stat-number">2</div>
                        <div className="stat-label">Upcoming</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">2</div>
                        <div className="stat-label">Completed</div>
                    </div>
                </div>

                <div className="appointments-list">
                    <div className="appointment-card">
                        <h3>Dr. Sarah Johnson - General Physician</h3>
                        <p>📅 February 15, 2024 at 10:00 AM</p>
                        <p>📍 Campus Health Center - Room 101</p>
                        <span className="status-upcoming">Upcoming</span>
                    </div>

                    <div className="appointment-card">
                        <h3>Dr. Michael Chen - Psychiatrist</h3>
                        <p>📅 February 10, 2024 at 2:30 PM</p>
                        <p>📍 Counseling Center - Room 205</p>
                        <span className="status-completed">Completed</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAppointments;