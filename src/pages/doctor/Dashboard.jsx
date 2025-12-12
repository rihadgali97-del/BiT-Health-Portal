import React, { useState } from 'react';
import '../../styles/DoctorDashboard.css';
import PrescriptionModal from '../../components/doctor/PrescriptionModal';
import MedicalNotesModal from '../../components/doctor/MedicalNotesModal';
import ReferralModal from '../../components/doctor/ReferralModal';
import RescheduleModal from '../../components/doctor/RescheduleModal';
import DashboardOverview from '../../components/doctor/DashboardOverview';
import AppointmentsView from '../../components/doctor/AppointmentsView';
import PatientsView from '../../components/doctor/PatientsView';

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
        medicalHistory: '',
        questions: '',
        notes: ''
    });

    const doctorProfile = {
        name: 'Dr. Sarah Johnson',
        specialty: 'General Physician',
        email: 's.johnson@university.edu',
        phone: '(555) 123-4567',
        office: 'Health Center - Room 101',
        schedule: 'Mon-Fri: 9:00 AM - 5:00 PM'
    };

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

    const availableTimeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
        '03:00 PM', '03:30 PM', '04:00 PM'
    ];

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

    const filteredPatients = patientRecords.filter(patient =>
        searchTerm === '' ||
        patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    availableTimeSlots={availableTimeSlots}
                    handleReschedule={handleReschedule}
                />

                <ReferralModal
                    showReferralModal={showReferralModal}
                    setShowReferralModal={setShowReferralModal}
                    selectedPatient={selectedPatient}
                    referralData={referralData}
                    setReferralData={setReferralData}
                    specialistOptions={specialistOptions}
                    handleWriteReferral={handleWriteReferral}
                />
            </div>
        </div>
    );
};

export default DoctorDashboard;