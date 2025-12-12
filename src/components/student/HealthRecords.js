import React from 'react';

const HealthRecords = ({ healthRecords, handleBackToDashboard }) => {
    return (
        <div>
            <div className="page-header">
                <button
                    onClick={handleBackToDashboard}
                    className="btn-secondary"
                >
                    ← Back to Dashboard
                </button>
                <h3>My Health Records</h3>
            </div>

            <div className="health-records-grid">
                {healthRecords.map(record => (
                    <div key={record.id} className="health-record-card">
                        <div className="record-header">
                            <h4>{record.diagnosis}</h4>
                            <span className="record-date">{record.date}</span>
                        </div>
                        <div className="record-details">
                            <div className="detail-item">
                                <strong>Doctor:</strong>
                                <span>{record.doctor}</span>
                            </div>
                            <div className="detail-item">
                                <strong>Prescription:</strong>
                                <span>{record.prescription}</span>
                            </div>
                        </div>
                        <p className="record-notes">{record.notes}</p>
                        <div className="record-actions">
                            <button className="btn-outline">
                                View Details
                            </button>
                            <button className="btn-primary">
                                Download PDF
                            </button>
                        </div>
                    </div>
                ))}
                {healthRecords.length === 0 && (
                    <div className="no-data-message">
                        No health records available
                    </div>
                )}
            </div>
        </div>
    );
};

export default HealthRecords;