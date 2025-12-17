// src/pages/DoctorDashboard.jsx (Updated Component)

import React, { useState } from 'react';
import '../../styles/DoctorDashboard.css';
import PrescriptionModal from '../../components/doctor/PrescriptionModal';
import MedicalNotesModal from '../../components/doctor/MedicalNotesModal';
import ReferralModal from '../../components/doctor/ReferralModal';
import RescheduleModal from '../../components/doctor/RescheduleModal';
import DashboardOverview from '../../components/doctor/DashboardOverview';
import AppointmentsView from '../../components/doctor/AppointmentsView';
import PatientsView from '../../components/doctor/PatientsView';

// --- IMPORT DATA ---
import {
    DOCTOR_PROFILE,
    INITIAL_APPOINTMENTS,
    INITIAL_PATIENT_RECORDS,
    AVAILABLE_TIME_SLOTS,
    SPECIALIST_OPTIONS
} from '../../Data/doctorSampleData';
// -------------------

const DoctorDashboard = ({ user, onLogout, navigateTo }) => {
    // --- State Management ---
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

    // State initialized with imported data
    const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
    const [patientRecords, setPatientRecords] = useState(INITIAL_PATIENT_RECORDS);
    const [prescriptions, setPrescriptions] = useState([]);
    const [medicalNotes, setMedicalNotes] = useState([]);

    // --- Modal Data State Initialization ---

    const initialPrescriptionState = {
        patientId: '',
        patientName: '',
        medication: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
        date: new Date().toISOString().split('T')[0]
    };
    const [prescriptionData, setPrescriptionData] = useState(initialPrescriptionState);

    const initialMedicalNoteState = {
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
    };
    const [medicalNoteData, setMedicalNoteData] = useState(initialMedicalNoteState);

    const initialReferralState = {
        reason: '',
        specialist: '',
        urgency: 'routine',
        medicalHistory: '',
        questions: '',
        notes: ''
    };
    const [referralData, setReferralData] = useState(initialReferralState);

    // Filter logic remains the same, operating on patientRecords state
    const filteredPatients = patientRecords.filter(patient =>
        searchTerm === '' ||
        patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- Handler Functions ---

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

    const handleOpenReferral = (patient) => {
        setSelectedPatient(patient);
        setReferralData(initialReferralState); // Reset form data
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
            referringDoctor: DOCTOR_PROFILE.name,
            date: new Date().toISOString().split('T')[0]
        });

        setShowReferralModal(false);
        alert(`Referral to ${referralData.specialist} created for ${selectedPatient.patientName}`);
    };

    const handleOpenPrescription = (patient = null) => {
        if (patient) {
            setPrescriptionData({
                ...initialPrescriptionState,
                patientId: patient.patientId || patient.id,
                patientName: patient.patientName || patient.name
            });
            setSelectedPatient(patient);
        } else {
            setPrescriptionData(initialPrescriptionState);
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
            doctor: DOCTOR_PROFILE.name,
            timestamp: new Date().toISOString()
        };

        setPrescriptions([...prescriptions, newPrescription]);
        setShowPrescriptionModal(false);
        setPrescriptionData(initialPrescriptionState); // Reset form

        alert(`Prescription for ${newPrescription.medication} created for ${newPrescription.patientName}`);
    };

    const handleOpenMedicalNotes = (patient = null) => {
        if (patient) {
            setMedicalNoteData({
                ...initialMedicalNoteState,
                patientId: patient.patientId || patient.id,
                patientName: patient.patientName || patient.name
            });
            setSelectedPatient(patient);
        } else {
            setMedicalNoteData(initialMedicalNoteState);
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
            doctor: DOCTOR_PROFILE.name,
            timestamp: new Date().toISOString()
        };

        setMedicalNotes([...medicalNotes, newMedicalNote]);
        setShowMedicalNotesModal(false);
        setMedicalNoteData(initialMedicalNoteState); // Reset form

        alert(`Medical notes saved for ${newMedicalNote.patientName}`);
    };

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
        switch (status) {
            case 'scheduled': return 'status-scheduled';
            case 'completed': return 'status-completed';
            case 'cancelled': return 'status-cancelled';
            case 'in-progress': return 'status-in-progress';
            default: return 'status-scheduled';
        }
    };

    return (
        <div className="doctor-dashboard-container">
            <div className="doctor-dashboard-content">
                <div className="doctor-header">
                    <div className="doctor-info">
                        <div className="doctor-avatar">
                            {/* Uses imported DOCTOR_PROFILE */}
                            {DOCTOR_PROFILE.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <h1>Doctor Dashboard</h1>
                            <p>Welcome back, {DOCTOR_PROFILE.name}</p>
                            <span className="doctor-specialty">{DOCTOR_PROFILE.specialty}</span>
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
                        {/* Uses imported DOCTOR_PROFILE */}
                        <div className="detail-row">
                            <strong>Email:</strong> {DOCTOR_PROFILE.email}
                        </div>
                        <div className="detail-row">
                            <strong>Phone:</strong> {DOCTOR_PROFILE.phone}
                        </div>
                        <div className="detail-row">
                            <strong>Office:</strong> {DOCTOR_PROFILE.office}
                        </div>
                        <div className="detail-row">
                            <strong>Schedule:</strong> {DOCTOR_PROFILE.schedule}
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

                {/* --- Modals --- */}

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

                <RescheduleModal
                    showRescheduleModal={showRescheduleModal}
                    setShowRescheduleModal={setShowRescheduleModal}
                    selectedAppointment={selectedAppointment}
                    newAppointmentDate={newAppointmentDate}
                    setNewAppointmentDate={setNewAppointmentDate}
                    newAppointmentTime={newAppointmentTime}
                    setNewAppointmentTime={setNewAppointmentTime}
                    // Uses imported AVAILABLE_TIME_SLOTS
                    availableTimeSlots={AVAILABLE_TIME_SLOTS} 
                    handleReschedule={handleReschedule}
                />

                <ReferralModal
                    showReferralModal={showReferralModal}
                    setShowReferralModal={setShowReferralModal}
                    selectedPatient={selectedPatient}
                    referralData={referralData}
                    setReferralData={setReferralData}
                    // Uses imported SPECIALIST_OPTIONS
                    specialistOptions={SPECIALIST_OPTIONS} 
                    handleWriteReferral={handleWriteReferral}
                />
            </div>
        </div>
    );
};

export default DoctorDashboard;