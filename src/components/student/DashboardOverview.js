import React from 'react';
const DashboardOverview = ({
                               appointments,
                               healthRecords,
                               studentProfile,
                               handleCancelAppointment,
                               setActiveTab
                           }) => {
    return (
        <div>
            <div className="student-stats">
                <div className="stat-card">
                    <div className="stat-icon">📅</div>
                    <div className="stat-content">
                        <h3>{appointments.filter(a => a.status === 'scheduled').length}</h3>
                        <p>Upcoming Appointments</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📋</div>
                    <div className="stat-content">
                        <h3>{healthRecords.length}</h3>
                        <p>Health Records</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">💊</div>
                    <div className="stat-content">
                        <h3>0</h3>
                        <p>Active Prescriptions</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🔔</div>
                    <div className="stat-content">
                        <h3>0</h3>
                        <p>Notifications</p>
                    </div>
                </div>
            </div>

            <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                    <div className="action-card" onClick={() => setActiveTab('book-appointment')}>
                        <h4>📅 Book Appointment</h4>
                        <p>Schedule a new medical appointment</p>
                    </div>
                    <div className="action-card" onClick={() => setActiveTab('my-appointments')}>
                        <h4>📋 My Appointments</h4>
                        <p>View and manage your appointments</p>
                    </div>
                    <div className="action-card" onClick={() => setActiveTab('health-records')}>
                        <h4>🏥 Health Records</h4>
                        <p>Access your medical history</p>
                    </div>
                    <div className="action-card">
                        <h4>📱 Download Records</h4>
                        <p>Get your health records in PDF</p>
                    </div>
                </div>
            </div>

            <div className="personal-info-section">
                <h3>Personal Information</h3>
                <div className="personal-info-card">
                    <div className="info-grid">
                        <div className="info-item">
                            <strong>Full Name:</strong>
                            <span>{studentProfile.name || 'Not provided'}</span>
                        </div>
                        <div className="info-item">
                            <strong>Student ID:</strong>
                            <span>{studentProfile.studentId || 'Not provided'}</span>
                        </div>
                        <div className="info-item">
                            <strong>Email:</strong>
                            <span>{studentProfile.email || 'Not provided'}</span>
                        </div>
                        <div className="info-item">
                            <strong>Phone:</strong>
                            <span>{studentProfile.phone || 'Not provided'}</span>
                        </div>
                        <div className="info-item">
                            <strong>Department:</strong>
                            <span>{studentProfile.department || 'Not provided'}</span>
                        </div>
                        <div className="info-item">
                            <strong>Year:</strong>
                            <span>{studentProfile.year || 'Not provided'}</span>
                        </div>
                        <div className="info-item">
                            <strong>Age:</strong>
                            <span>{studentProfile.age || 'Not provided'}</span>
                        </div>
                        <div className="info-item">
                            <strong>Sex:</strong>
                            <span>{studentProfile.sex ? studentProfile.sex.charAt(0).toUpperCase() + studentProfile.sex.slice(1) : 'Not provided'}</span>
                        </div>
                        <div className="info-item">
                            <strong>Blood Group:</strong>
                            <span>{studentProfile.bloodGroup}</span>
                        </div>
                        <div className="info-item">
                            <strong>Allergies:</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className="upcoming-section">
                <h3>Upcoming Appointments</h3>
                <div className="appointments-list">
                    {appointments
                        .filter(apt => apt.status === 'scheduled')
                        .slice(0, 3)
                        .map(appointment => (
                            <div key={appointment.id} className="appointment-item">
                                <div className="appointment-time">
                                    <strong>{appointment.time}</strong>
                                    <span>{appointment.date}</span>
                                </div>
                                <div className="appointment-details">
                                    <h4>{appointment.doctorName}</h4>
                                    <p>{appointment.type} - {appointment.reason}</p>
                                    <span className="location">{appointment.location}</span>
                                </div>
                                <div className="appointment-actions">
                                    <button
                                        onClick={() => handleCancelAppointment(appointment.id)}
                                        className="btn-cancel small"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ))}
                    {appointments.filter(apt => apt.status === 'scheduled').length === 0 && (
                        <p className="no-data">No upcoming appointments</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;