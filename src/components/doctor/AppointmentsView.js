import React from 'react';

const AppointmentsView = ({
                              appointments,
                              getStatusColor,
                              handleStartConsultation,
                              handleOpenReschedule,
                              handleOpenPrescription,
                              handleViewPatientDetails
                          }) => {
    return (
        <div>
            <h3>All Appointments</h3>
            <div className="appointments-table">
                <div className="table-header">
                    <span>Patient</span>
                    <span>Date & Time</span>
                    <span>Type</span>
                    <span>Reason</span>
                    <span>Status</span>
                    <span>Actions</span>
                </div>
                {appointments.map(appointment => (
                    <div key={appointment.id} className="table-row">
                        <div className="patient-info">
                            <strong>{appointment.patientName}</strong>
                            <span>ID: {appointment.patientId}</span>
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
                                <>
                                    <button
                                        onClick={() => handleStartConsultation(appointment.id)}
                                        className="btn-outline"
                                    >
                                        Start
                                    </button>
                                    <button
                                        onClick={() => handleOpenReschedule(appointment)}
                                        className="btn-outline"
                                    >
                                        Reschedule
                                    </button>
                                    <button
                                        onClick={() => handleOpenPrescription(appointment)}
                                        className="btn-outline"
                                        title="Write Prescription"
                                    >
                                        💊
                                    </button>
                                </>
                            )}
                            {appointment.status === 'completed' && (
                                <button
                                    onClick={() => handleViewPatientDetails(appointment.patientId)}
                                    className="btn-outline"
                                >
                                    View Record
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppointmentsView;