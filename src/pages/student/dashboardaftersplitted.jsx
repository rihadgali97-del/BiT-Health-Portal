import React, { useState } from 'react';
import '../../styles/StudentDashboard.css';
import StudentHeader from '../../components/student/StudentHeader';
import StudentProfileCard from '../../components/student/StudentProfileCard';
import BookingModal from '../../components/student/BookingModal';
import DashboardOverview from '../../components/student/DashboardOverview';
import MyAppointments from '../../components/student/MyAppointments';
import BookAppointment from '../../components/student/BookAppointment';
import HealthRecords from '../../components/student/HealthRecords';

const StudentDashboard = ({ user, onLogout, navigateTo }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [showBookingModal, setShowBookingModal] = useState(false);

    // State for backend data
    const [appointments, setAppointments] = useState([]);
    const [healthRecords, setHealthRecords] = useState([]);
    const [availableDoctors, setAvailableDoctors] = useState([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

    const [bookingData, setBookingData] = useState({
        date: '',
        time: '',
        reason: '',
        type: 'general',
        doctorId: ''
    });

    // Use the actual user data from registration
    const studentProfile = user ? {
        name: user.fullName,
        studentId: user.studentId,
        email: user.email,
        phone: user.phoneNumber,
        department: user.department,
        year: user.yearOfEducation ? `${user.yearOfEducation}${getOrdinalSuffix(user.yearOfEducation)} Year` : '',
        age: user.age,
        sex: user.sex,
        bloodGroup: user.bloodGroup || 'Not specified',
        allergies: user.allergies || 'None',
        emergencyContact: user.emergencyContact || 'Not specified'
    } : {};

    // Helper function to get ordinal suffix
    function getOrdinalSuffix(year) {
        if (year === '1') return 'st';
        if (year === '2') return 'nd';
        if (year === '3') return 'rd';
        return 'th';
    }

    // Search functionality
    const filteredAppointments = appointments.filter(apt =>
        searchTerm === '' ||
        apt.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.reason?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Booking functionality
    const handleOpenBooking = () => {
        setBookingData({
            date: '',
            time: '',
            reason: '',
            type: 'general',
            doctorId: ''
        });
        setShowBookingModal(true);
    };

    const handleBookAppointment = () => {
        if (!bookingData.date || !bookingData.time || !bookingData.reason) {
            alert('Please fill in all required fields.');
            return;
        }

        // This will be replaced with API call
        const newAppointment = {
            id: Date.now(), // Temporary ID, backend will generate
            doctorName: 'Doctor Name', // Will come from backend
            date: bookingData.date,
            time: bookingData.time,
            status: 'scheduled',
            type: bookingData.type,
            reason: bookingData.reason,
            location: 'Health Center'
        };

        setAppointments(prev => [...prev, newAppointment]);
        setShowBookingModal(false);
        alert(`Appointment booked for ${bookingData.date} at ${bookingData.time}`);
    };

    const handleCancelAppointment = (appointmentId) => {
        // This will be replaced with API call
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

    return (
        <div className="student-dashboard-container">
            <div className="student-dashboard-content">
                <StudentHeader
                    studentProfile={studentProfile}
                    handleBackToHome={handleBackToHome}
                    onLogout={onLogout}
                />

                <StudentProfileCard studentProfile={studentProfile} />

                <div className="student-tabs">
                    <button
                        onClick={() => navigateTo('student-profile')}
                        className="student-tab-btn"
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
                        className="tab-btn"
                        onClick={() => navigateTo('student-notifications')}
                    >
                        🔔 Notifications
                    </button>
                </div>

                <div className="student-content">
                    {activeTab === 'overview' && (
                        <DashboardOverview
                            appointments={appointments}
                            healthRecords={healthRecords}
                            studentProfile={studentProfile}
                            handleCancelAppointment={handleCancelAppointment}
                            setActiveTab={setActiveTab}
                        />
                    )}
                    {activeTab === 'my-appointments' && (
                        <MyAppointments
                            filteredAppointments={filteredAppointments}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            getStatusColor={getStatusColor}
                            handleCancelAppointment={handleCancelAppointment}
                            handleBackToDashboard={handleBackToDashboard}
                        />
                    )}
                    {activeTab === 'book-appointment' && (
                        <BookAppointment
                            availableDoctors={availableDoctors}
                            handleOpenBooking={handleOpenBooking}
                            handleBackToDashboard={handleBackToDashboard}
                        />
                    )}
                    {activeTab === 'health-records' && (
                        <HealthRecords
                            healthRecords={healthRecords}
                            handleBackToDashboard={handleBackToDashboard}
                        />
                    )}
                </div>

                <BookingModal
                    showBookingModal={showBookingModal}
                    setShowBookingModal={setShowBookingModal}
                    bookingData={bookingData}
                    setBookingData={setBookingData}
                    availableTimeSlots={availableTimeSlots}
                    handleBookAppointment={handleBookAppointment}
                />
            </div>
        </div>
    );
};

export default StudentDashboard;