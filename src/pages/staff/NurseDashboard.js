import React, { useState, useEffect } from 'react';
import '../../styles/StaffDashboard.css';

const NurseDashboard = ({ user, onLogout, navigateTo }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showVitalSignsModal, setShowVitalSignsModal] = useState(false);

    // Real data states
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [vitalRecords, setVitalRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Nurse profile
    const nurseProfile = user ? {
        name: user.fullName,
        staffId: user.staffId,
        email: user.email,
        department: user.department,
        qualifications: user.qualifications
    } : {};

    // Vital signs form
    const [vitalSigns, setVitalSigns] = useState({
        bloodPressure: '',
        heartRate: '',
        temperature: '',
        respiratoryRate: '',
        oxygenSaturation: '',
        weight: '',
        height: '',
        notes: ''
    });

    // Load initial data
    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = () => {
        setIsLoading(true);

        setTimeout(() => {
            // Sample patient data
            const samplePatients = [
                {
                    id: 'STU2024001',
                    name: 'John Smith',
                    age: 21,
                    sex: 'Male',
                    department: 'Computer Science',
                    bloodGroup: 'O+',
                    allergies: 'None',
                    lastVisit: '2024-02-10',
                    status: 'stable'
                },
                {
                    id: 'STU2024002',
                    name: 'Emily Chen',
                    age: 20,
                    sex: 'Female',
                    department: 'Engineering',
                    bloodGroup: 'A+',
                    allergies: 'Penicillin',
                    lastVisit: '2024-02-14',
                    status: 'stable'
                },
                {
                    id: 'STU2024003',
                    name: 'Michael Brown',
                    age: 22,
                    sex: 'Male',
                    department: 'Business',
                    bloodGroup: 'B+',
                    allergies: 'None',
                    lastVisit: '2024-02-12',
                    status: 'critical'
                }
            ];

            // Sample appointments
            const sampleAppointments = [
                {
                    id: 1,
                    patientId: 'STU2024001',
                    patientName: 'John Smith',
                    time: '10:00 AM',
                    date: new Date().toISOString().split('T')[0],
                    reason: 'Fever and cough',
                    status: 'waiting',
                    doctor: 'Dr. Sarah Johnson'
                },
                {
                    id: 2,
                    patientId: 'STU2024002',
                    patientName: 'Emily Chen',
                    time: '11:30 AM',
                    date: new Date().toISOString().split('T')[0],
                    reason: 'Vaccination follow-up',
                    status: 'scheduled',
                    doctor: 'Dr. Michael Brown'
                }
            ];

            // Sample vital records
            const sampleVitalRecords = [
                {
                    id: 1,
                    patientId: 'STU2024001',
                    patientName: 'John Smith',
                    bloodPressure: '120/80',
                    heartRate: 72,
                    temperature: 36.6,
                    respiratoryRate: 16,
                    oxygenSaturation: 98,
                    weight: 70,
                    height: 175,
                    notes: 'Patient reports mild headache',
                    recordedBy: 'Nurse Johnson',
                    timestamp: '2024-02-14T10:30:00'
                }
            ];

            setPatients(samplePatients);
            setAppointments(sampleAppointments);
            setVitalRecords(sampleVitalRecords);
            setIsLoading(false);
        }, 1000);
    };

    // Stats calculation
    const stats = {
        totalPatients: patients.length,
        waitingPatients: appointments.filter(apt => apt.status === 'waiting').length,
        completedVitals: vitalRecords.filter(record =>
            new Date(record.timestamp).toDateString() === new Date().toDateString()
        ).length,
        urgentCases: patients.filter(patient => patient.status === 'critical').length,
        todayAppointments: appointments.filter(apt =>
            apt.date === new Date().toISOString().split('T')[0]
        ).length
    };

    // Search functionality
    const filteredPatients = patients.filter(patient =>
        searchTerm === '' ||
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getPatientVitalHistory = (patientId) => {
        return vitalRecords.filter(record => record.patientId === patientId)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    };

    const getLatestVitals = (patientId) => {
        const patientRecords = getPatientVitalHistory(patientId);
        return patientRecords.length > 0 ? patientRecords[0] : null;
    };

    const handleOpenVitalSigns = (patient) => {
        setSelectedPatient(patient);

        const latestVitals = getLatestVitals(patient.id);
        setVitalSigns({
            bloodPressure: latestVitals?.bloodPressure || '',
            heartRate: latestVitals?.heartRate || '',
            temperature: latestVitals?.temperature || '',
            respiratoryRate: latestVitals?.respiratoryRate || '',
            oxygenSaturation: latestVitals?.oxygenSaturation || '',
            weight: latestVitals?.weight || '',
            height: latestVitals?.height || '',
            notes: ''
        });

        setShowVitalSignsModal(true);
    };

    const handleSaveVitalSigns = () => {
        if (!vitalSigns.bloodPressure || !vitalSigns.heartRate || !vitalSigns.temperature) {
            alert('Please fill in required vital signs (BP, Heart Rate, Temperature)');
            return;
        }

        const newVitalRecord = {
            id: Date.now(),
            patientId: selectedPatient.id,
            patientName: selectedPatient.name,
            ...vitalSigns,
            recordedBy: nurseProfile.name,
            timestamp: new Date().toISOString()
        };

        setVitalRecords(prev => [newVitalRecord, ...prev]);

        setPatients(prev => prev.map(patient =>
            patient.id === selectedPatient.id
                ? { ...patient, lastVisit: new Date().toISOString().split('T')[0] }
                : patient
        ));

        setShowVitalSignsModal(false);
        alert(`Vital signs recorded for ${selectedPatient.name}`);
    };

    const handleUpdateAppointmentStatus = (appointmentId, status) => {
        const updatedAppointments = appointments.map(apt =>
            apt.id === appointmentId ? { ...apt, status } : apt
        );
        setAppointments(updatedAppointments);
    };

    const handleBackToHome = () => {
        navigateTo('home');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'waiting': return 'status-waiting';
            case 'in-progress': return 'status-in-progress';
            case 'completed': return 'status-completed';
            case 'critical': return 'status-critical';
            case 'stable': return 'status-stable';
            default: return 'status-scheduled';
        }
    };

    const renderOverview = () => (
        <div>
            <div className="staff-stats">
                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                        <h3>{stats.totalPatients}</h3>
                        <p>Total Patients</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-content">
                        <h3>{stats.waitingPatients}</h3>
                        <p>Waiting Now</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                        <h3>{stats.completedVitals}</h3>
                        <p>Vitals Today</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🚨</div>
                    <div className="stat-content">
                        <h3>{stats.urgentCases}</h3>
                        <p>Urgent Cases</p>
                    </div>
                </div>
            </div>

            <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                    <div className="action-card" onClick={() => setActiveTab('patients')}>
                        <h4>👥 Patient List</h4>
                        <p>View all assigned patients</p>
                    </div>
                    <div className="action-card" onClick={() => setActiveTab('appointments')}>
                        <h4>📅 Today's Schedule</h4>
                        <p>View today's appointments</p>
                    </div>
                    <div className="action-card">
                        <h4>💊 Medication</h4>
                        <p>Medication administration</p>
                    </div>
                    <div className="action-card">
                        <h4>📋 Care Plans</h4>
                        <p>Patient care plans</p>
                    </div>
                </div>
            </div>

            <div className="appointments-section">
                <div className="section-header">
                    <h3>Today's Appointments</h3>
                    <span className="badge">{stats.todayAppointments} appointments</span>
                </div>
                <div className="appointments-list">
                    {appointments
                        .filter(apt => apt.date === new Date().toISOString().split('T')[0])
                        .map(appointment => (
                            <div key={appointment.id} className="appointment-item">
                                <div className="appointment-time">
                                    <strong>{appointment.time}</strong>
                                </div>
                                <div className="appointment-details">
                                    <h4>{appointment.patientName}</h4>
                                    <p>{appointment.reason}</p>
                                    <span className="patient-meta">
                                        ID: {appointment.patientId} • Dr. {appointment.doctor}
                                    </span>
                                </div>
                                <div className="appointment-actions">
                                    <span className={`status-badge ${getStatusColor(appointment.status)}`}>
                                        {appointment.status}
                                    </span>
                                    {appointment.status === 'waiting' && (
                                        <button
                                            onClick={() => handleOpenVitalSigns({
                                                id: appointment.patientId,
                                                name: appointment.patientName
                                            })}
                                            className="btn-primary small"
                                        >
                                            Take Vitals
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    {stats.todayAppointments === 0 && (
                        <div className="no-data">
                            <p>No appointments scheduled for today</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="recent-vitals-section">
                <h3>Recent Vital Signs</h3>
                <div className="vitals-list">
                    {vitalRecords.slice(0, 3).map(record => (
                        <div key={record.id} className="vital-record">
                            <div className="vital-patient">
                                <strong>{record.patientName}</strong>
                                <span>{new Date(record.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <div className="vital-details">
                                <span>BP: {record.bloodPressure}</span>
                                <span>HR: {record.heartRate}</span>
                                <span>Temp: {record.temperature}°C</span>
                            </div>
                        </div>
                    ))}
                    {vitalRecords.length === 0 && (
                        <div className="no-data">
                            <p>No vital signs recorded yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderPatients = () => (
        <div>
            <div className="page-header">

                <h3>Patient List ({patients.length} patients)</h3>
            </div>

            <div className="search-section">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search patients by name, ID, or department..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <span className="search-icon">🔍</span>
                </div>
            </div>

            {isLoading ? (
                <div className="loading">Loading patients...</div>
            ) : (
                <div className="patients-table">
                    <div className="table-header">
                        <span>Patient</span>
                        <span>Last Vitals</span>
                        <span>Department</span>
                        <span>Status</span>
                        <span>Last Visit</span>
                        <span>Actions</span>
                    </div>

                    {filteredPatients.map(patient => {
                        const latestVitals = getLatestVitals(patient.id);
                        return (
                            <div key={patient.id} className="table-row">
                                <div className="patient-info">
                                    <strong>{patient.name}</strong>
                                    <span>ID: {patient.id}</span>
                                    <span>Age: {patient.age} • {patient.sex}</span>
                                </div>
                                <div className="vitals-info">
                                    {latestVitals ? (
                                        <>
                                            <span>BP: {latestVitals.bloodPressure}</span>
                                            <span>HR: {latestVitals.heartRate}</span>
                                        </>
                                    ) : (
                                        <span className="no-vitals">No vitals</span>
                                    )}
                                </div>
                                <span>{patient.department}</span>
                                <span className={`status-badge ${getStatusColor(patient.status)}`}>
                                    {patient.status}
                                </span>
                                <span>{patient.lastVisit || 'Never'}</span>
                                <div className="actions">
                                    <button
                                        onClick={() => handleOpenVitalSigns(patient)}
                                        className="btn-primary small"
                                    >
                                        Record Vitals
                                    </button>
                                    <button className="btn-outline small">
                                        View History
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {filteredPatients.length === 0 && (
                        <div className="no-data">
                            <p>No patients found</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    const renderAppointments = () => (
        <div>
            <div className="page-header">
                <button
                    onClick={() => setActiveTab('overview')}
                    className="btn-secondary"
                >
                    ← Back to Overview
                </button>
                <h3>Today's Appointments</h3>
            </div>

            <div className="appointments-table">
                <div className="table-header">
                    <span>Time</span>
                    <span>Patient</span>
                    <span>Reason</span>
                    <span>Status</span>
                    <span>Actions</span>
                </div>
                {appointments
                    .filter(apt => apt.date === new Date().toISOString().split('T')[0])
                    .map(appointment => (
                        <div key={appointment.id} className="table-row">
                            <div className="datetime">
                                <strong>{appointment.time}</strong>
                            </div>
                            <div className="patient-info">
                                <strong>{appointment.patientName}</strong>
                                <span>ID: {appointment.patientId}</span>
                            </div>
                            <span>{appointment.reason}</span>
                            <span className={`status-badge ${getStatusColor(appointment.status)}`}>
                                {appointment.status}
                            </span>
                            <div className="actions">
                                <button
                                    onClick={() => handleOpenVitalSigns({
                                        id: appointment.patientId,
                                        name: appointment.patientName
                                    })}
                                    className="btn-primary small"
                                >
                                    Vitals
                                </button>
                                <button
                                    onClick={() => handleUpdateAppointmentStatus(appointment.id, 'in-progress')}
                                    className="btn-outline small"
                                >
                                    Start
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );

    return (
        <div className="staff-dashboard-container">
            <div className="staff-dashboard-content">
                {/* Header */}
                <div className="staff-header">
                    <div className="staff-info">
                        <div className="staff-avatar">
                            👩‍⚕️
                        </div>
                        <div>
                            <h1>Nurse Dashboard</h1>
                            <p>Welcome back, {nurseProfile.name || 'Nurse'}</p>
                            <span className="staff-role">Registered Nurse</span>
                        </div>
                    </div>
                    <div className="staff-actions">
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

                {/* Staff Profile Card */}
                <div className="staff-profile-card">
                    <div className="profile-details">
                        <div className="detail-row">
                            <strong>Staff ID:</strong> {nurseProfile.staffId || 'N/A'}
                        </div>
                        <div className="detail-row">
                            <strong>Department:</strong> {nurseProfile.department || 'N/A'}
                        </div>
                        <div className="detail-row">
                            <strong>Qualifications:</strong> {nurseProfile.qualifications || 'N/A'}
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="staff-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        📊 Overview
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'patients' ? 'active' : ''}`}
                        onClick={() => setActiveTab('patients')}
                    >
                        👥 Patients
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
                        onClick={() => setActiveTab('appointments')}
                    >
                        📅 Appointments
                    </button>
                    <button className="tab-btn">
                        💊 Medications
                    </button>
                    <button className="tab-btn">
                        📋 Care Plans
                    </button>
                </div>

                {/* Content */}
                <div className="staff-content">
                    {activeTab === 'overview' && renderOverview()}
                    {activeTab === 'patients' && renderPatients()}
                    {activeTab === 'appointments' && renderAppointments()}
                </div>

                {/* Vital Signs Modal */}
                {showVitalSignsModal && selectedPatient && (
                    <div className="modal-overlay">
                        <div className="modal large-modal">
                            <div className="modal-header">
                                <h3>Record Vital Signs</h3>
                                <button
                                    onClick={() => setShowVitalSignsModal(false)}
                                    className="close-btn"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="patient-info-section">
                                    <p><strong>Patient:</strong> {selectedPatient.name}</p>
                                    <p><strong>Patient ID:</strong> {selectedPatient.id}</p>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Blood Pressure *</label>
                                        <input
                                            type="text"
                                            value={vitalSigns.bloodPressure}
                                            onChange={(e) => setVitalSigns({...vitalSigns, bloodPressure: e.target.value})}
                                            placeholder="e.g., 120/80"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Heart Rate (BPM) *</label>
                                        <input
                                            type="number"
                                            value={vitalSigns.heartRate}
                                            onChange={(e) => setVitalSigns({...vitalSigns, heartRate: e.target.value})}
                                            placeholder="e.g., 72"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Temperature (°C) *</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={vitalSigns.temperature}
                                            onChange={(e) => setVitalSigns({...vitalSigns, temperature: e.target.value})}
                                            placeholder="e.g., 36.6"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Respiratory Rate</label>
                                        <input
                                            type="number"
                                            value={vitalSigns.respiratoryRate}
                                            onChange={(e) => setVitalSigns({...vitalSigns, respiratoryRate: e.target.value})}
                                            placeholder="Breaths per minute"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Oxygen Saturation (%)</label>
                                        <input
                                            type="number"
                                            value={vitalSigns.oxygenSaturation}
                                            onChange={(e) => setVitalSigns({...vitalSigns, oxygenSaturation: e.target.value})}
                                            placeholder="e.g., 98"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Weight (kg)</label>
                                        <input
                                            type="number"
                                            value={vitalSigns.weight}
                                            onChange={(e) => setVitalSigns({...vitalSigns, weight: e.target.value})}
                                            placeholder="e.g., 68"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Height (cm)</label>
                                    <input
                                        type="number"
                                        value={vitalSigns.height}
                                        onChange={(e) => setVitalSigns({...vitalSigns, height: e.target.value})}
                                        placeholder="e.g., 175"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Clinical Notes</label>
                                    <textarea
                                        value={vitalSigns.notes}
                                        onChange={(e) => setVitalSigns({...vitalSigns, notes: e.target.value})}
                                        placeholder="Additional observations, symptoms, or concerns..."
                                        rows="3"
                                    />
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button
                                    onClick={() => setShowVitalSignsModal(false)}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveVitalSigns}
                                    className="btn-primary"
                                >
                                    Save Vital Signs
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NurseDashboard;