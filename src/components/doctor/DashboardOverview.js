import React from 'react';

const DashboardOverview = ({
                               appointments,
                               patientRecords,
                               prescriptions,
                               handleViewAppointments,
                               handleViewPatients,
                               handleOpenPrescription,
                               handleOpenMedicalNotes,
                               handleStartConsultation
                           }) => {
    return (
        <div>
            <div className="doctor-stats">
                <div className="stat-card">
                    <div className="stat-icon">📅</div>
                    <div className="stat-content">
                        <h3>{appointments.filter(a => a.status === 'scheduled').length}</h3>
                        <p>Today's Appointments</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                        <h3>{patientRecords.length}</h3>
                        <p>Active Patients</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">⏰</div>
                    <div className="stat-content">
                        <h3>2</h3>
                        <p>Waiting Now</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">💊</div>
                    <div className="stat-content">
                        <h3>{prescriptions.length}</h3>
                        <p>Prescriptions Today</p>
                    </div>
                </div>
            </div>

            <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                    <div className="action-card" onClick={handleViewAppointments}>
                        <h4>📅 Manage Appointments</h4>
                        <p>View and manage your schedule</p>
                    </div>
                    <div className="action-card" onClick={handleViewPatients}>
                        <h4>👥 Patient Records</h4>
                        <p>Access patient medical history</p>
                    </div>
                    <div className="action-card" onClick={() => handleOpenPrescription()}>
                        <h4>💊 Write Prescription</h4>
                        <p>Create new medication orders</p>
                    </div>
                    <div className="action-card" onClick={() => handleOpenMedicalNotes()}>
                        <h4>📝 Medical Notes</h4>
                        <p>Update patient medical records</p>
                    </div>
                </div>
            </div>

            <div className="schedule-section">
                <h3>Today's Appointments</h3>
                <div className="appointments-list">
                    {appointments.filter(apt => apt.status === 'scheduled').map(appointment => (
                        <div key={appointment.id} className="appointment-item">
                            <div className="appointment-time">
                                <strong>{appointment.time}</strong>
                            </div>
                            <div className="appointment-details">
                                <h4>{appointment.patientName}</h4>
                                <p>{appointment.type} - {appointment.reason}</p>
                                <span className="patient-meta">ID: {appointment.patientId} • {appointment.department}</span>
                            </div>
                            <div className="appointment-actions">
                                <button
                                    onClick={() => handleStartConsultation(appointment.id)}
                                    className="btn-primary small"
                                >
                                    Start
                                </button>
                                <button
                                    onClick={() => handleOpenPrescription(appointment)}
                                    className="btn-outline small"
                                    title="Write Prescription"
                                >
                                    💊
                                </button>
                                <button
                                    onClick={() => handleOpenMedicalNotes(appointment)}
                                    className="btn-outline small"
                                    title="Add Medical Notes"
                                >
                                    📝
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;