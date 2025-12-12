import React from 'react';

const PatientsView = ({
                          searchTerm,
                          setSearchTerm,
                          filteredPatients,
                          patientRecords,
                          handleOpenMedicalNotes,
                          handleOpenPrescription,
                          handleOpenReferral
                      }) => {
    return (
        <div>
            <div className="search-section">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search patients by name or condition..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <span className="search-icon">🔍</span>
                </div>
                {searchTerm && (
                    <p className="search-results-info">
                        Showing {filteredPatients.length} of {patientRecords.length} patients
                    </p>
                )}
            </div>

            <h3>Patient Records</h3>
            <div className="patients-grid">
                {filteredPatients.map(patient => (
                    <div key={patient.id} className="patient-card">
                        <div className="patient-header">
                            <h4>{patient.patientName}</h4>
                            <span className={`status-badge ${patient.condition === 'Healthy' ? 'status-healthy' : 'status-treatment'}`}>
                {patient.condition}
              </span>
                        </div>
                        <div className="patient-details">
                            <div className="detail-item">
                                <strong>Last Visit:</strong>
                                <span>{patient.lastVisit}</span>
                            </div>
                            <div className="detail-item">
                                <strong>Next Appointment:</strong>
                                <span>{patient.nextAppointment}</span>
                            </div>
                            <div className="detail-item">
                                <strong>Patient ID:</strong>
                                <span>{patient.patientId}</span>
                            </div>
                        </div>
                        <p className="patient-notes">{patient.notes}</p>
                        <div className="patient-actions">
                            <button
                                className="btn-outline"
                                onClick={() => handleOpenMedicalNotes(patient)}
                            >
                                Add Notes
                            </button>
                            <button
                                onClick={() => handleOpenPrescription(patient)}
                                className="btn-outline"
                            >
                                Write Prescription
                            </button>
                            <button
                                onClick={() => handleOpenReferral(patient)}
                                className="btn-referral"
                            >
                                Write Referral
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientsView;