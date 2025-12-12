import React, { useEffect, useState } from 'react';
import '../../styles/HealthRecords.css';

const HealthRecords = ({ navigateTo }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [healthRecords, setHealthRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch records from backend
    useEffect(() => {
        fetch('/api/medical-records') // Replace with your API endpoint
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch records');
                return res.json();
            })
            .then(data => {
                setHealthRecords(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleBackToDashboard = () => {
        navigateTo('student-dashboard');
    };

    const handleViewRecordDetails = (record) => {
        setSelectedRecord(record);
        setActiveTab('details');
    };

    const handleCloseDetails = () => {
        setSelectedRecord(null);
        setActiveTab('overview');
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'normal':
            case 'completed':
            case 'up to date':
                return 'status-normal';
            case 'abnormal':
            case 'pending':
                return 'status-warning';
            default:
                return 'status-normal';
        }
    };

    const renderOverview = () => (
        <div>
            {/* Health Summary Cards */}
            <div className="summary-cards">
                <div className="summary-card">
                    <div className="summary-icon">📋</div>
                    <div className="summary-content">
                        <h3>{healthRecords.length}</h3>
                        <p>Medical Records</p>
                    </div>
                </div>
            </div>

            {/* Records List */}
            <div className="records-section">
                <h3>Your Medical Records</h3>
                {loading ? (
                    <p>Loading records...</p>
                ) : (
                    <div className="records-list">
                        {healthRecords.map(record => (
                            <div
                                key={record.id}
                                className="record-card"
                                onClick={() => handleViewRecordDetails(record)}
                            >
                                <div className="record-header">
                                    <h4>{record.recordType}</h4>
                                    <span className={`status-badge ${getStatusColor(record.status)}`}>
                                        {record.status || 'N/A'}
                                    </span>
                                </div>
                                <div className="record-meta">
                                    <span>Date: {new Date(record.recordDate).toLocaleDateString()}</span>
                                    <span>Doctor: {record.doctorName || 'Unknown'}</span>
                                </div>
                                <p className="record-summary">{record.summary || record.diagnosis}</p>
                                <div className="record-footer">
                                    <button className="view-details-btn">
                                        View Details →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    const renderRecordDetails = () => (
        <div className="record-details">
            <button onClick={handleCloseDetails} className="back-btn">
                ← Back to Records
            </button>

            {selectedRecord && (
                <div className="details-content">
                    <div className="details-header">
                        <h2>{selectedRecord.recordType}</h2>
                        <span className={`status-badge large ${getStatusColor(selectedRecord.status)}`}>
                            {selectedRecord.status || 'N/A'}
                        </span>
                    </div>

                    <div className="details-meta">
                        <div className="meta-item">
                            <strong>Date:</strong> {new Date(selectedRecord.recordDate).toLocaleDateString()}
                        </div>
                        <div className="meta-item">
                            <strong>Doctor:</strong> {selectedRecord.doctorName || 'Unknown'}
                        </div>
                    </div>

                    <div className="details-section">
                        <h4>Symptoms</h4>
                        <p>{selectedRecord.symptoms || 'N/A'}</p>
                    </div>

                    <div className="details-section">
                        <h4>Diagnosis</h4>
                        <p>{selectedRecord.diagnosis || 'N/A'}</p>
                    </div>

                    <div className="details-section">
                        <h4>Treatment</h4>
                        <p>{selectedRecord.treatment || 'N/A'}</p>
                    </div>

                    <div className="details-section">
                        <h4>Notes</h4>
                        <p>{selectedRecord.notes || 'N/A'}</p>
                    </div>

                    {selectedRecord.followUpDate && (
                        <div className="details-section">
                            <h4>Follow Up</h4>
                            <p>{new Date(selectedRecord.followUpDate).toLocaleDateString()}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <div className="health-records-container">
            <div className="health-records-content">
                <div className="health-records-header">
                    <div>
                        <h1>Health Records</h1>
                        <p>Your complete medical history and health information</p>
                    </div>
                    <button onClick={handleBackToDashboard} className="btn-secondary">
                        ← Back to Dashboard
                    </button>
                </div>

                <div className="health-records-body">
                    {activeTab === 'overview' && renderOverview()}
                    {activeTab === 'details' && renderRecordDetails()}
                </div>
            </div>
        </div>
    );
};

export default HealthRecords;
