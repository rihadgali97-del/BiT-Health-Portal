import React, { useState } from 'react';
import '../../styles/StudentDashboard.css';

const StudentDashboard = ({ user, onLogout, navigateTo }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [bookingData, setBookingData] = useState({
        date: '',
        time: '',
        reason: '',
        type: 'general'
    });

    // Use the actual user data from registration or create sample data
    const studentProfile = user ? {
        name: user.fullName || 'John Smith',
        studentId: user.studentId || 'STU2024001',
        email: user.email || 'john.smith@university.edu',
        phone: user.phoneNumber || '(555) 987-6543',
        department: user.department || 'Computer Science',
        year: '3rd Year', // You might want to add this to registration
        age: user.age || '21',
        sex: user.sex || 'Male',
        bloodGroup: 'O+', // You might want to add this to registration
        allergies: user.allergies || 'None', // You might want to add this to registration
        emergencyContact: '(555) 123-4567' // You might want to add this to registration
    } : {
        name: 'John Smith',
        studentId: 'STU2024001',
        email: 'john.smith@university.edu',
        phone: '(555) 987-6543',
        department: 'Computer Science',
        year: '3rd Year',
        age: '21',
        sex: 'Male',
        bloodGroup: 'O+',
        allergies: 'None',
        emergencyContact: '(555) 123-4567'
    };

    // Sample appointments data
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            doctorName: 'Dr. Sarah Johnson',
            date: '2024-02-15',
            time: '10:00 AM',
            status: 'scheduled',
            type: 'Regular Checkup',
            reason: 'Annual physical examination',
            location: 'Health Center - Room 101'
        },
        {
            id: 2,
            doctorName: 'Dr. Michael Chen',
            date: '2024-02-20',
            time: '2:30 PM',
            status: 'scheduled',
            type: 'Consultation',
            reason: 'Follow-up on lab results',
            location: 'Health Center - Room 203'
        },
        {
            id: 3,
            doctorName: 'Dr. Emily Wilson',
            date: '2024-02-10',
            time: '11:00 AM',
            status: 'completed',
            type: 'Vaccination',
            reason: 'Flu shot administration',
            location: 'Health Center - Room 105'
        }
    ]);

    // Sample health records
    const healthRecords = [
        {
            id: 1,
            date: '2024-02-10',
            doctor: 'Dr. Emily Wilson',
            diagnosis: 'Routine Vaccination',
            prescription: 'Flu Vaccine',
            notes: 'No adverse reactions observed'
        },
        {
            id: 2,
            date: '2024-01-15',
            doctor: 'Dr. Sarah Johnson',
            diagnosis: 'Annual Checkup - Normal',
            prescription: 'None',
            notes: 'All vitals within normal range'
        },
        {
            id: 3,
            date: '2023-12-05',
            doctor: 'Dr. Michael Chen',
            diagnosis: 'Upper Respiratory Infection',
            prescription: 'Antibiotics, Rest',
            notes: 'Follow up if symptoms persist'
        }
    ];

    // Available doctors for booking
    const availableDoctors = [
        { id: 1, name: 'Dr. Sarah Johnson', specialty: 'General Physician', availableSlots: ['09:00 AM', '10:00 AM', '11:00 AM'] },
        { id: 2, name: 'Dr. Michael Chen', specialty: 'Internal Medicine', availableSlots: ['02:00 PM', '03:00 PM', '04:00 PM'] },
        { id: 3, name: 'Dr. Emily Wilson', specialty: 'Pediatrics', availableSlots: ['09:30 AM', '10:30 AM', '11:30 AM'] }
    ];

    // Available time slots
    const availableTimeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
        '03:00 PM', '03:30 PM', '04:00 PM'
    ];

    // Search functionality
    const filteredAppointments = appointments.filter(apt =>
        searchTerm === '' ||
        apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Booking functionality
    const handleOpenBooking = () => {
        setBookingData({
            date: '',
            time: '',
            reason: '',
            type: 'general'
        });
        setShowBookingModal(true);
    };

    const handleBookAppointment = () => {
        if (!bookingData.date || !bookingData.time || !bookingData.reason) {
            alert('Please fill in all required fields.');
            return;
        }

        const newAppointment = {
            id: appointments.length + 1,
            doctorName: 'Dr. Sarah Johnson', // Default doctor for demo
            date: bookingData.date,
            time: bookingData.time,
            status: 'scheduled',
            type: bookingData.type,
            reason: bookingData.reason,
            location: 'Health Center'
        };

        setAppointments([...appointments, newAppointment]);
        setShowBookingModal(false);
        alert(`Appointment booked for ${bookingData.date} at ${bookingData.time}`);
    };

    const handleCancelAppointment = (appointmentId) => {
        const updatedAppointments = appointments.map(apt =>
            apt.id === appointmentId
                ? { ...apt, status: 'cancelled' }
                : apt
        );
        setAppointments(updatedAppointments);
        alert('Appointment cancelled successfully');
    };

    const handleBackToHome = () => {
        navigateTo('home');
    };

    const handleBackToDashboard = () => {
        setActiveTab('overview');
        setSearchTerm('');
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
            <div className="student-stats">
                <div className="stat-card">
                    <div className="stat-icon">📅</div>
                    <div className="stat-content">
                        <h3>{appointments.filter(a => a.status === 'scheduled').length}</h3>
                        <p>Upcoming Appointments</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📋</div>
                    <div className="stat-content">
                        <h3>{healthRecords.length}</h3>
                        <p>Health Records</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">💊</div>
                    <div className="stat-content">
                        <h3>2</h3>
                        <p>Active Prescriptions</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🔔</div>
                    <div className="stat-content">
                        <h3>3</h3>
                        <p>Notifications</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                    <div className="action-card" onClick={() => setActiveTab('book-appointment')}>
                        <h4>📅 Book Appointment</h4>
                        <p>Schedule a new medical appointment</p>
                    </div>
                    <div className="action-card" onClick={() => setActiveTab('my-appointments')}>
                        <h4>📋 My Appointments</h4>
                        <p>View and manage your appointments</p>
                    </div>
                    <div className="action-card" onClick={() => setActiveTab('health-records')}>
                        <h4>🏥 Health Records</h4>
                        <p>Access your medical history</p>
                    </div>
                    <div className="action-card">
                        <h4>📱 Download Records</h4>
                        <p>Get your health records in PDF</p>
                    </div>
                </div>
            </div>

            {/* Personal Information Card */}
            <div className="personal-info-section">
                <h3>Personal Information</h3>
                <div className="personal-info-card">
                    <div className="info-grid">
                        <div className="info-item">
                            <strong>Full Name:</strong>
                            <span>{studentProfile.name}</span>
                        </div>
                        <div className="info-item">
                            <strong>Student ID:</strong>
                            <span>{studentProfile.studentId}</span>
                        </div>
                        <div className="info-item">
                            <strong>Email:</strong>
                            <span>{studentProfile.email}</span>
                        </div>
                        <div className="info-item">
                            <strong>Phone:</strong>
                            <span>{studentProfile.phone}</span>
                        </div>
                        <div className="info-item">
                            <strong>Department:</strong>
                            <span>{studentProfile.department}</span>
                        </div>
                        <div className="info-item">
                            <strong>Age:</strong>
                            <span>{studentProfile.age}</span>
                        </div>
                        <div className="info-item">
                            <strong>Sex:</strong>
                            <span>{studentProfile.sex}</span>
                        </div>
                        <div className="info-item">
                            <strong>Blood Group:</strong>
                            <span>{studentProfile.bloodGroup}</span>
                        </div>
                        <div className="info-item">
                            <strong>Allergies:</strong>
                            <span>{studentProfile.allergies}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="upcoming-section">
                <h3>Upcoming Appointments</h3>
                <div className="appointments-list">
                    {appointments
                        .filter(apt => apt.status === 'scheduled')
                        .slice(0, 3)
                        .map(appointment => (
                            <div key={appointment.id} className="appointment-item">
                                <div className="appointment-time">
                                    <strong>{appointment.time}</strong>
                                    <span>{appointment.date}</span>
                                </div>
                                <div className="appointment-details">
                                    <h4>{appointment.doctorName}</h4>
                                    <p>{appointment.type} - {appointment.reason}</p>
                                    <span className="location">{appointment.location}</span>
                                </div>
                                <div className="appointment-actions">
                                    <button
                                        onClick={() => handleCancelAppointment(appointment.id)}
                                        className="btn-cancel small"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );

    const renderMyAppointments = () => (
        <div>
            <div className="page-header">

                <h3>My Appointments</h3>
            </div>

            {/* Search Section */}
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
            </div>
        </div>
    );

    const renderBookAppointment = () => (
        <div>
            <div className="page-header">

                <h3>Book New Appointment</h3>
            </div>

            <div className="booking-section">
                <div className="booking-card">
                    <h4>Available Doctors</h4>
                    <div className="doctors-list">
                        {availableDoctors.map(doctor => (
                            <div key={doctor.id} className="doctor-card">
                                <div className="doctor-info">
                                    <h5>{doctor.name}</h5>
                                    <p>{doctor.specialty}</p>
                                </div>
                                <div className="available-slots">
                                    <strong>Available Slots:</strong>
                                    {doctor.availableSlots.map(slot => (
                                        <span key={slot} className="time-slot">{slot}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="booking-form">
                        <h4>Book Appointment</h4>
                        <button
                            onClick={handleOpenBooking}
                            className="btn-primary"
                        >
                            📅 Book New Appointment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderHealthRecords = () => (
        <div>
            <div className="page-header">
               
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
            </div>
        </div>
    );

    return (
        <div className="student-dashboard-container">
            <div className="student-dashboard-content">
                {/* Header */}
                <div className="student-header">
                    <div className="student-info">
                        <div className="student-avatar">
                            {studentProfile.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <h1>Student Dashboard</h1>
                            <p>Welcome back, {studentProfile.name}</p>
                            <span className="student-id">ID: {studentProfile.studentId}</span>
                        </div>
                    </div>
                    <div className="student-actions">
                        <button
                            onClick={handleBackToHome}
                            className="[btn-secondary]"
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

                {/* Student Profile Quick Info */}
                <div className="student-profile-card">
                    <div className="profile-details">
                        <div className="detail-row">
                            <strong>Department:</strong> {studentProfile.department}
                        </div>
                        <div className="detail-row">
                            <strong>Year:</strong> {studentProfile.year}
                        </div>
                        <div className="detail-row">
                            <strong>Blood Group:</strong> {studentProfile.bloodGroup}
                        </div>
                        <div className="detail-row">
                            <strong>Allergies:</strong> {studentProfile.allergies}
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="student-tabs">
                    <button
                        onClick={() => navigateTo('student-profile')}
                        className={`student-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
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
                        className={`tab-btn ${activeTab === 'my-appointments' ? 'active' : ''}`}
                        onClick={() => setActiveTab('my-appointments')}
                    >
                        📅 My Appointments
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'book-appointment' ? 'active' : ''}`}
                        onClick={() => setActiveTab('book-appointment')}
                    >
                        ➕ Book Appointment
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'health-records' ? 'active' : ''}`}
                        onClick={() => setActiveTab('health-records')}
                    >
                        🏥 Health Records
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => navigateTo('student-notifications')}
                    >
                        🔔 Notifications
                    </button>

                </div>

                {/* Content */}
                <div className="student-content">
                    {activeTab === 'overview' && renderOverview()}
                    {activeTab === 'my-appointments' && renderMyAppointments()}
                    {activeTab === 'book-appointment' && renderBookAppointment()}
                    {activeTab === 'health-records' && renderHealthRecords()}
                </div>

                {/* Booking Modal */}
                {showBookingModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-header">
                                <h3>Book New Appointment</h3>
                                <button
                                    onClick={() => setShowBookingModal(false)}
                                    className="close-btn"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Appointment Date *</label>
                                    <input
                                        type="date"
                                        value={bookingData.date}
                                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Preferred Time *</label>
                                    <select
                                        value={bookingData.time}
                                        onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                                        required
                                    >
                                        <option value="">Select Time</option>
                                        {availableTimeSlots.map(time => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Appointment Type</label>
                                    <select
                                        value={bookingData.type}
                                        onChange={(e) => setBookingData({...bookingData, type: e.target.value})}
                                    >
                                        <option value="general">General Consultation</option>
                                        <option value="checkup">Regular Checkup</option>
                                        <option value="followup">Follow-up</option>
                                        <option value="emergency">Emergency</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Reason for Visit *</label>
                                    <textarea
                                        value={bookingData.reason}
                                        onChange={(e) => setBookingData({...bookingData, reason: e.target.value})}
                                        placeholder="Please describe your symptoms or reason for the appointment..."
                                        rows="3"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button
                                    onClick={() => setShowBookingModal(false)}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleBookAppointment}
                                    className="btn-primary"
                                >
                                    Book Appointment
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;