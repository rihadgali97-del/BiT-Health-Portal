import React, { useState } from 'react';
import '../../styles/DoctorDashboard.css';

const DoctorDashboard = ({ user, onLogout, navigateTo }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [showRescheduleModal, setShowRescheduleModal] = useState(false);
    const [showReferralModal, setShowReferralModal] = useState(false);
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
    const [showMedicalNotesModal, setShowMedicalNotesModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [newAppointmentDate, setNewAppointmentDate] = useState('');
    const [newAppointmentTime, setNewAppointmentTime] = useState('');

    // New states for prescriptions and medical notes
    const [prescriptions, setPrescriptions] = useState([]);
    const [medicalNotes, setMedicalNotes] = useState([]);

    const [prescriptionData, setPrescriptionData] = useState({
        patientId: '',
        patientName: '',
        medication: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
        date: new Date().toISOString().split('T')[0]
    });

    const [medicalNoteData, setMedicalNoteData] = useState({
        patientId: '',
        patientName: '',
        date: new Date().toISOString().split('T')[0],
        symptoms: '',
        diagnosis: '',
        treatment: '',
        notes: '',
        vitalSigns: {
            bloodPressure: '',
            heartRate: '',
            temperature: '',
            weight: ''
        }
    });

    const [referralData, setReferralData] = useState({
        reason: '',
        specialist: '',
        urgency: 'routine',
        notes: ''
    });

    // Sample doctor data
    const doctorProfile = {
        name: 'Dr. Sarah Johnson',
        specialty: 'General Physician',
        email: 's.johnson@university.edu',
        phone: '(555) 123-4567',
        office: 'Health Center - Room 101',
        schedule: 'Mon-Fri: 9:00 AM - 5:00 PM'
    };

    // Sample appointments data
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            patientName: 'John Smith',
            patientId: 'STU2024001',
            date: '2024-02-15',
            time: '10:00 AM',
            status: 'scheduled',
            type: 'Regular Checkup',
            reason: 'Annual physical examination',
            age: 21,
            department: 'Computer Science'
        },
        {
            id: 2,
            patientName: 'Emily Chen',
            patientId: 'STU2024002',
            date: '2024-02-15',
            time: '11:30 AM',
            status: 'scheduled',
            type: 'Follow-up',
            reason: 'Cold and flu symptoms',
            age: 20,
            department: 'Engineering'
        },
        {
            id: 3,
            patientName: 'Michael Brown',
            patientId: 'STU2024003',
            date: '2024-02-14',
            time: '2:15 PM',
            status: 'completed',
            type: 'Consultation',
            reason: 'Sports injury assessment',
            age: 22,
            department: 'Business'
        },
        {
            id: 4,
            patientName: 'Sarah Wilson',
            patientId: 'STU2024004',
            date: '2024-02-14',
            time: '3:45 PM',
            status: 'completed',
            type: 'Vaccination',
            reason: 'Flu shot administration',
            age: 19,
            department: 'Arts'
        }
    ]);

    // Sample patient records
    const patientRecords = [
        {
            id: 1,
            patientName: 'John Smith',
            patientId: 'STU2024001',
            lastVisit: '2024-01-15',
            condition: 'Healthy',
            nextAppointment: '2024-02-15',
            notes: 'Regular checkup - all vitals normal'
        },
        {
            id: 2,
            patientName: 'Emily Chen',
            patientId: 'STU2024002',
            lastVisit: '2024-02-10',
            condition: 'Upper respiratory infection',
            nextAppointment: '2024-02-15',
            notes: 'Prescribed antibiotics, follow-up scheduled'
        },
        {
            id: 3,
            patientName: 'Michael Brown',
            patientId: 'STU2024003',
            lastVisit: '2024-02-14',
            condition: 'Complex cardiac symptoms',
            nextAppointment: '2024-02-28',
            notes: 'Referred to cardiology for further evaluation'
        },
        {
            id: 4,
            patientName: 'Sarah Wilson',
            patientId: 'STU2024004',
            lastVisit: '2024-02-14',
            condition: 'Healthy',
            nextAppointment: '2024-11-20',
            notes: 'Flu shot administered, no adverse reactions'
        }
    ];

    // Available time slots for rescheduling
    const availableTimeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
        '03:00 PM', '03:30 PM', '04:00 PM'
    ];

    // Specialist options for referrals
    const specialistOptions = [
        'Cardiologist',
        'Neurologist',
        'Orthopedic Surgeon',
        'Psychiatrist',
        'Dermatologist',
        'Endocrinologist',
        'Gastroenterologist',
        'Oncologist',
        'Rheumatologist',
        'Pulmonologist'
    ];

    // Search functionality
    const filteredPatients = patientRecords.filter(patient =>
        searchTerm === '' ||
        patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Reschedule functionality
    const handleOpenReschedule = (appointment) => {
        setSelectedAppointment(appointment);
        setNewAppointmentDate('');
        setNewAppointmentTime('');
        setShowRescheduleModal(true);
    };

    const handleReschedule = () => {
        if (!newAppointmentDate || !newAppointmentTime) {
            alert('Please select both date and time for rescheduling.');
            return;
        }

        const updatedAppointments = appointments.map(apt =>
            apt.id === selectedAppointment.id
                ? { ...apt, date: newAppointmentDate, time: newAppointmentTime }
                : apt
        );

        setAppointments(updatedAppointments);
        setShowRescheduleModal(false);
        alert(`Appointment rescheduled to ${newAppointmentDate} at ${newAppointmentTime}`);
    };

    // Referral functionality
    const handleOpenReferral = (patient) => {
        setSelectedPatient(patient);
        setReferralData({
            reason: '',
            specialist: '',
            urgency: 'routine',
            notes: ''
        });
        setShowReferralModal(true);
    };

    const handleWriteReferral = () => {
        if (!referralData.reason || !referralData.specialist) {
            alert('Please fill in referral reason and select a specialist.');
            return;
        }

        console.log('Referral created:', {
            patient: selectedPatient,
            referral: referralData,
            referringDoctor: doctorProfile.name,
            date: new Date().toISOString().split('T')[0]
        });

        setShowReferralModal(false);
        alert(`Referral to ${referralData.specialist} created for ${selectedPatient.patientName}`);
    };

    // NEW: Prescription functionality
    const handleOpenPrescription = (patient = null) => {
        if (patient) {
            setPrescriptionData({
                ...prescriptionData,
                patientId: patient.patientId || patient.id,
                patientName: patient.patientName || patient.name
            });
            setSelectedPatient(patient);
        } else {
            setPrescriptionData({
                ...prescriptionData,
                patientId: '',
                patientName: ''
            });
        }
        setShowPrescriptionModal(true);
    };

    const handlePrescriptionSubmit = () => {
        if (!prescriptionData.medication || !prescriptionData.dosage || !prescriptionData.patientName) {
            alert('Please fill in required fields: Patient, Medication, and Dosage.');
            return;
        }

        const newPrescription = {
            ...prescriptionData,
            id: Date.now(),
            doctor: doctorProfile.name,
            timestamp: new Date().toISOString()
        };

        setPrescriptions([...prescriptions, newPrescription]);
        setShowPrescriptionModal(false);
        setPrescriptionData({
            patientId: '',
            patientName: '',
            medication: '',
            dosage: '',
            frequency: '',
            duration: '',
            instructions: '',
            date: new Date().toISOString().split('T')[0]
        });

        alert(`Prescription for ${newPrescription.medication} created for ${newPrescription.patientName}`);
    };

    // NEW: Medical notes functionality
    const handleOpenMedicalNotes = (patient = null) => {
        if (patient) {
            setMedicalNoteData({
                ...medicalNoteData,
                patientId: patient.patientId || patient.id,
                patientName: patient.patientName || patient.name
            });
            setSelectedPatient(patient);
        } else {
            setMedicalNoteData({
                ...medicalNoteData,
                patientId: '',
                patientName: ''
            });
        }
        setShowMedicalNotesModal(true);
    };

    const handleMedicalNotesSubmit = () => {
        if (!medicalNoteData.diagnosis || !medicalNoteData.patientName) {
            alert('Please provide a patient name and diagnosis.');
            return;
        }

        const newMedicalNote = {
            ...medicalNoteData,
            id: Date.now(),
            doctor: doctorProfile.name,
            timestamp: new Date().toISOString()
        };

        setMedicalNotes([...medicalNotes, newMedicalNote]);
        setShowMedicalNotesModal(false);
        setMedicalNoteData({
            patientId: '',
            patientName: '',
            date: new Date().toISOString().split('T')[0],
            symptoms: '',
            diagnosis: '',
            treatment: '',
            notes: '',
            vitalSigns: {
                bloodPressure: '',
                heartRate: '',
                temperature: '',
                weight: ''
            }
        });

        alert(`Medical notes saved for ${newMedicalNote.patientName}`);
    };

    // Form handlers
    const handlePrescriptionChange = (field, value) => {
        setPrescriptionData({
            ...prescriptionData,
            [field]: value
        });
    };

    const handleMedicalNoteChange = (field, value) => {
        setMedicalNoteData({
            ...medicalNoteData,
            [field]: value
        });
    };

    const handleVitalSignChange = (field, value) => {
        setMedicalNoteData({
            ...medicalNoteData,
            vitalSigns: {
                ...medicalNoteData.vitalSigns,
                [field]: value
            }
        });
    };

    const handleBackToHome = () => {
        navigateTo('home');
    };

    const handleViewAppointments = () => {
        setActiveTab('appointments');
        setSearchTerm('');
    };

    const handleViewPatients = () => {
        setActiveTab('patients');
        setSearchTerm('');
    };

    const handleStartConsultation = (appointmentId) => {
        alert(`Starting consultation for appointment ${appointmentId}`);
    };

    const handleCompleteAppointment = (appointmentId) => {
        alert(`Marking appointment ${appointmentId} as completed`);
    };

    const handleViewPatientDetails = (patientId) => {
        alert(`Viewing details for patient ${patientId}`);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'scheduled': return 'status-scheduled';
            case 'completed': return 'status-completed';
            case 'cancelled': return 'status-cancelled';
            case 'in-progress': return 'status-in-progress';
            default: return 'status-scheduled';
        }
    };

    const renderOverview = () => (
        <div>
            {/* Stats Cards */}
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

            {/* Quick Actions */}
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

            {/* Today's Schedule */}
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

    const renderAppointments = () => (
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

    const renderPatients = () => (
        <div>
            {/* Search Section */}
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

    return (
        <div className="doctor-dashboard-container">
            <div className="doctor-dashboard-content">
                {/* Header */}
                <div className="doctor-header">
                    <div className="doctor-info">
                        <div className="doctor-avatar">
                            {doctorProfile.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <h1>Doctor Dashboard</h1>
                            <p>Welcome back, {doctorProfile.name}</p>
                            <span className="doctor-specialty">{doctorProfile.specialty}</span>
                        </div>
                    </div>
                    <div className="doctor-actions">
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

                {/* Doctor Profile Quick Info */}
                <div className="doctor-profile-card">
                    <div className="profile-details">
                        <div className="detail-row">
                            <strong>Email:</strong> {doctorProfile.email}
                        </div>
                        <div className="detail-row">
                            <strong>Phone:</strong> {doctorProfile.phone}
                        </div>
                        <div className="detail-row">
                            <strong>Office:</strong> {doctorProfile.office}
                        </div>
                        <div className="detail-row">
                            <strong>Schedule:</strong> {doctorProfile.schedule}
                        </div>
                    </div>
                </div>

                <div className="doctor-tabs">
                    <button
                        className={`doctor-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => navigateTo('doctor-profile')}
                    >
                        👤 My Profile
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        📊 Overview
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
                        onClick={() => setActiveTab('appointments')}
                    >
                        📅 Appointments
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'patients' ? 'active' : ''}`}
                        onClick={() => setActiveTab('patients')}
                    >
                        👥 Patients
                    </button>
                    <button
                        className={`blog-btn ${activeTab === 'blog' ? 'active' : ''}`}
                        onClick={() => navigateTo('doctor-blog-management')}
                    >
                        📝 Blog Management
                    </button>
                    <button
                        onClick={() => navigateTo('doctor-notifications')}
                        className={`doctor-tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
                    >
                        🔔 Notifications
                    </button>
                </div>
                <div className="doctor-content">
                    {activeTab === 'overview' && renderOverview()}
                    {activeTab === 'appointments' && renderAppointments()}
                    {activeTab === 'patients' && renderPatients()}
                </div>

                {/* Reschedule Modal */}
                {showRescheduleModal && selectedAppointment && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-header">
                                <h3>Reschedule Appointment</h3>
                                <button
                                    onClick={() => setShowRescheduleModal(false)}
                                    className="close-btn"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Patient:</strong> {selectedAppointment.patientName}</p>
                                <p><strong>Current:</strong> {selectedAppointment.date} at {selectedAppointment.time}</p>

                                <div className="form-group">
                                    <label>New Date *</label>
                                    <input
                                        type="date"
                                        value={newAppointmentDate}
                                        onChange={(e) => setNewAppointmentDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>New Time *</label>
                                    <select
                                        value={newAppointmentTime}
                                        onChange={(e) => setNewAppointmentTime(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Time</option>
                                        {availableTimeSlots.map(time => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button
                                    onClick={() => setShowRescheduleModal(false)}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReschedule}
                                    className="btn-primary"
                                >
                                    Confirm Reschedule
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Referral Modal */}
                {showReferralModal && selectedPatient && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-header">
                                <h3>Write Medical Referral</h3>
                                <button
                                    onClick={() => setShowReferralModal(false)}
                                    className="close-btn"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Patient:</strong> {selectedPatient.patientName}</p>
                                <p><strong>Condition:</strong> {selectedPatient.condition}</p>

                                <div className="form-group">
                                    <label>Referral Reason *</label>
                                    <textarea
                                        value={referralData.reason}
                                        onChange={(e) => setReferralData({...referralData, reason: e.target.value})}
                                        placeholder="Describe the medical condition and why referral is needed..."
                                        rows="3"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Specialist Type *</label>
                                    <select
                                        value={referralData.specialist}
                                        onChange={(e) => setReferralData({...referralData, specialist: e.target.value})}
                                        required
                                    >
                                        <option value="">Select Specialist</option>
                                        {specialistOptions.map(specialist => (
                                            <option key={specialist} value={specialist}>{specialist}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Urgency Level</label>
                                    <select
                                        value={referralData.urgency}
                                        onChange={(e) => setReferralData({...referralData, urgency: e.target.value})}
                                    >
                                        <option value="routine">Routine</option>
                                        <option value="urgent">Urgent</option>
                                        <option value="emergency">Emergency</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Additional Notes</label>
                                    <textarea
                                        value={referralData.notes}
                                        onChange={(e) => setReferralData({...referralData, notes: e.target.value})}
                                        placeholder="Any additional information for the specialist..."
                                        rows="2"
                                    />
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button
                                    onClick={() => setShowReferralModal(false)}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleWriteReferral}
                                    className="btn-referral"
                                >
                                    Create Referral
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* NEW: Prescription Modal */}
                {showPrescriptionModal && (
                    <div className="modal-overlay">
                        <div className="modal large-modal">
                            <div className="modal-header">
                                <h3>Write Prescription</h3>
                                <button
                                    onClick={() => setShowPrescriptionModal(false)}
                                    className="close-btn"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Patient Name *</label>
                                        <input
                                            type="text"
                                            value={prescriptionData.patientName}
                                            onChange={(e) => handlePrescriptionChange('patientName', e.target.value)}
                                            placeholder="Enter patient name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Patient ID *</label>
                                        <input
                                            type="text"
                                            value={prescriptionData.patientId}
                                            onChange={(e) => handlePrescriptionChange('patientId', e.target.value)}
                                            placeholder="Enter patient ID"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Medication *</label>
                                        <input
                                            type="text"
                                            value={prescriptionData.medication}
                                            onChange={(e) => handlePrescriptionChange('medication', e.target.value)}
                                            placeholder="Medication name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Dosage *</label>
                                        <input
                                            type="text"
                                            value={prescriptionData.dosage}
                                            onChange={(e) => handlePrescriptionChange('dosage', e.target.value)}
                                            placeholder="e.g., 500mg"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Frequency *</label>
                                        <input
                                            type="text"
                                            value={prescriptionData.frequency}
                                            onChange={(e) => handlePrescriptionChange('frequency', e.target.value)}
                                            placeholder="e.g., Twice daily"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Duration *</label>
                                        <input
                                            type="text"
                                            value={prescriptionData.duration}
                                            onChange={(e) => handlePrescriptionChange('duration', e.target.value)}
                                            placeholder="e.g., 7 days"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Instructions</label>
                                    <textarea
                                        value={prescriptionData.instructions}
                                        onChange={(e) => handlePrescriptionChange('instructions', e.target.value)}
                                        placeholder="Additional instructions for the patient..."
                                        rows="3"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        value={prescriptionData.date}
                                        onChange={(e) => handlePrescriptionChange('date', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button
                                    onClick={() => setShowPrescriptionModal(false)}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePrescriptionSubmit}
                                    className="btn-primary"
                                >
                                    Save Prescription
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* NEW: Medical Notes Modal */}
                {showMedicalNotesModal && (
                    <div className="modal-overlay">
                        <div className="modal large-modal">
                            <div className="modal-header">
                                <h3>Medical Notes</h3>
                                <button
                                    onClick={() => setShowMedicalNotesModal(false)}
                                    className="close-btn"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Patient Name *</label>
                                        <input
                                            type="text"
                                            value={medicalNoteData.patientName}
                                            onChange={(e) => handleMedicalNoteChange('patientName', e.target.value)}
                                            placeholder="Enter patient name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Patient ID *</label>
                                        <input
                                            type="text"
                                            value={medicalNoteData.patientId}
                                            onChange={(e) => handleMedicalNoteChange('patientId', e.target.value)}
                                            placeholder="Enter patient ID"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Symptoms & Complaints</label>
                                    <textarea
                                        value={medicalNoteData.symptoms}
                                        onChange={(e) => handleMedicalNoteChange('symptoms', e.target.value)}
                                        placeholder="Patient's reported symptoms and complaints..."
                                        rows="3"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Diagnosis *</label>
                                    <textarea
                                        value={medicalNoteData.diagnosis}
                                        onChange={(e) => handleMedicalNoteChange('diagnosis', e.target.value)}
                                        placeholder="Medical diagnosis..."
                                        rows="2"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Treatment Plan</label>
                                    <textarea
                                        value={medicalNoteData.treatment}
                                        onChange={(e) => handleMedicalNoteChange('treatment', e.target.value)}
                                        placeholder="Prescribed treatment and recommendations..."
                                        rows="3"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Additional Notes</label>
                                    <textarea
                                        value={medicalNoteData.notes}
                                        onChange={(e) => handleMedicalNoteChange('notes', e.target.value)}
                                        placeholder="Any additional observations or notes..."
                                        rows="2"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        value={medicalNoteData.date}
                                        onChange={(e) => handleMedicalNoteChange('date', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button
                                    onClick={() => setShowMedicalNotesModal(false)}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleMedicalNotesSubmit}
                                    className="btn-primary"
                                >
                                    Save Medical Notes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorDashboard;