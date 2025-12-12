import React from 'react';

const MyAppointments = ({
                            filteredAppointments,
                            searchTerm,
                            setSearchTerm,
                            getStatusColor,
                            handleCancelAppointment,
                            handleBackToDashboard
                        }) => {
    return (
        <div>
            <div className="page-header">
                <button
                    onClick={handleBackToDashboard}
                    className="btn-secondary"
                >
                    ← Back to Dashboard
                </button>
                <h3>My Appointments</h3>
            </div>

            <div className="search-section">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search appointments by doctor or reason..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <span className="search-icon">🔍</span>
                </div>
            </div>

            <div className="appointments-table">
                <div className="table-header">
                    <span>Doctor</span>
                    <span>Date & Time</span>
                    <span>Type</span>
                    <span>Reason</span>
                    <span>Status</span>
                    <span>Actions</span>
                </div>
                {filteredAppointments.map(appointment => (
                    <div key={appointment.id} className="table-row">
                        <div className="doctor-info">
                            <strong>{appointment.doctorName}</strong>
                            <span>{appointment.location}</span>
                        </div>
                        <div className="datetime">
                            <span>{appointment.date}</span>
                            <span>{appointment.time}</span>
                        </div>
                        <span>{appointment.type}</span>
                        <span>{appointment.reason}</span>
                        <span className={`status-badge ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                        </span>
                        <div className="actions">
                            {appointment.status === 'scheduled' && (
                                <button
                                    onClick={() => handleCancelAppointment(appointment.id)}
                                    className="btn-cancel"
                                >
                                    Cancel
                                </button>
                            )}
                            {appointment.status === 'completed' && (
                                <button className="btn-outline">
                                    View Details
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {filteredAppointments.length === 0 && (
                    <div className="no-data-message">
                        No appointments found
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAppointments;