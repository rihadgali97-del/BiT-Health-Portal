import React, { useState } from 'react';
import '../../styles/DoctorDashboard.css';
import PrescriptionModal from './PrescriptionModal';
import MedicalNotesModal from './MedicalNotesModal';
import DashboardOverview from './DashboardOverview';
import AppointmentsView from './AppointmentsView';
import PatientsView from './PatientsView';

const DoctorDashboard = ({ user, onLogout, navigateTo }) => {
    // All your existing state and functions remain exactly the same
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

    // All your existing sample data arrays remain exactly the same
    const doctorProfile = {
        name: 'Dr. Sarah Johnson',
        specialty: 'General Physician',
        email: 's.johnson@university.edu',
        phone: '(555) 123-4567',
        office: 'Health Center - Room 101',
        schedule: 'Mon-Fri: 9:00 AM - 5:00 PM'
    };

    const [appointments, setAppointments] = useState([
        // ... your exact same appointments data
    ]);

    const patientRecords = [
        // ... your exact same patient records data
    ];

    const availableTimeSlots = [
        // ... your exact same time slots
    ];

    const specialistOptions = [
        // ... your exact same specialist options
    ];

    // All your existing handler functions remain exactly the same
    const filteredPatients = patientRecords.filter(patient =>
        searchTerm === '' ||
        patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenReschedule = (appointment) => {
        // ... same implementation
    };

    const handleReschedule = () => {
        // ... same implementation
    };

    const handleOpenReferral = (patient) => {
        // ... same implementation
    };

    const handleWriteReferral = () => {
        // ... same implementation
    };

    const handleOpenPrescription = (patient = null) => {
        // ... same implementation
    };

    const handlePrescriptionSubmit = () => {
        // ... same implementation
    };

    const handleOpenMedicalNotes = (patient = null) => {
        // ... same implementation
    };

    const handleMedicalNotesSubmit = () => {
        // ... same implementation
    };

    const handlePrescriptionChange = (field, value) => {
        // ... same implementation
    };

    const handleMedicalNoteChange = (field, value) => {
        // ... same implementation
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

    const handleViewPatientDetails = (patientId) => {
        alert(`Viewing details for patient ${patientId}`);
    };

    const getStatusColor = (status) => {
        // ... same implementation
    };

    return (
        <div className="doctor-dashboard-container">
            <div className="doctor-dashboard-content">
                {/* Your exact same header, profile card, and tabs JSX */}
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
                    {/* Your exact same tabs */}
                </div>

                <div className="doctor-content">
                    {activeTab === 'overview' && (
                        <DashboardOverview
                            appointments={appointments}
                            patientRecords={patientRecords}
                            prescriptions={prescriptions}
                            handleViewAppointments={handleViewAppointments}
                            handleViewPatients={handleViewPatients}
                            handleOpenPrescription={handleOpenPrescription}
                            handleOpenMedicalNotes={handleOpenMedicalNotes}
                            handleStartConsultation={handleStartConsultation}
                        />
                    )}
                    {activeTab === 'appointments' && (
                        <AppointmentsView
                            appointments={appointments}
                            getStatusColor={getStatusColor}
                            handleStartConsultation={handleStartConsultation}
                            handleOpenReschedule={handleOpenReschedule}
                            handleOpenPrescription={handleOpenPrescription}
                            handleViewPatientDetails={handleViewPatientDetails}
                        />
                    )}
                    {activeTab === 'patients' && (
                        <PatientsView
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            filteredPatients={filteredPatients}
                            patientRecords={patientRecords}
                            handleOpenMedicalNotes={handleOpenMedicalNotes}
                            handleOpenPrescription={handleOpenPrescription}
                            handleOpenReferral={handleOpenReferral}
                        />
                    )}
                </div>

                {/* Modal Components */}
                <PrescriptionModal
                    showPrescriptionModal={showPrescriptionModal}
                    setShowPrescriptionModal={setShowPrescriptionModal}
                    prescriptionData={prescriptionData}
                    handlePrescriptionChange={handlePrescriptionChange}
                    handlePrescriptionSubmit={handlePrescriptionSubmit}
                />

                <MedicalNotesModal
                    showMedicalNotesModal={showMedicalNotesModal}
                    setShowMedicalNotesModal={setShowMedicalNotesModal}
                    medicalNoteData={medicalNoteData}
                    handleMedicalNoteChange={handleMedicalNoteChange}
                    handleMedicalNotesSubmit={handleMedicalNotesSubmit}
                />

                {/* Keep your existing RescheduleModal and ReferralModal JSX exactly as they are */}
            </div>
        </div>
    );
};

export default DoctorDashboard;