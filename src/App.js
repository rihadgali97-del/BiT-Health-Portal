import React, { useState } from 'react';
import Home from './pages/common/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentDashboard from './pages/student/Dashboard';
import BookAppointment from './pages/student/BookAppointment';
import HealthRecords from './pages/student/HealthRecords';
import MyAppointments from './pages/student/MyAppointments';
import DoctorDashboard from './pages/doctor/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageDoctors from './pages/admin/ManageDoctors';
import ManageAppointments from './pages/admin/ManageAppointments';
import Reports from './pages/admin/Reports';
import Blog from './pages/common/Blog';
import Contact from './pages/common/Contact';
import Features from './pages/common/Features';
import BlogManagement from './pages/doctor/BlogManagement';
import AdminBlogManagement from './pages/admin/AdminBlogManagement';
import DoctorProfile from './components/doctor/DoctorProfile';
import StudentProfile from './components/student/StudentProfile';
import StudentNotifications from './pages/student/Notifications';
import DoctorNotifications from './pages/doctor/Notifications';
import NurseDashboard from './pages/staff/NurseDashboard';
import ReceptionistDashboard from './pages/staff/ReceptionistDashboard';
import PharmacistDashboard from './pages/staff/PharmacistDashboard';
import LabTechnicianDashboard from './pages/staff/LabTechnicianDashboard';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [user, setUser] = useState(null);

    const USER_ROLES = {
        "rihadgali97@gmail.com": "admin",   // << YOU ARE ADMIN
        // Add more special cases:
        "john.doctor@gmail.com": "doctor",
        "nurse.mary@gmail.com": "nurse"
    };

    const detectUserType = (email) => {
        const emailLower = email.toLowerCase();

        // 1. If email is in predefined role list, use it
        if (USER_ROLES[emailLower]) {
            console.log("Detected special user:", emailLower, "→", USER_ROLES[emailLower]);
            return USER_ROLES[emailLower];
        }

        // 2. Otherwise fallback to your domain rules
        if (emailLower.includes("@admin.")) return "admin";
        if (emailLower.includes("@doctor.") || emailLower.includes(".dr@")) return "doctor";
        if (emailLower.includes("@nurse.")) return "nurse";
        if (emailLower.includes("@reception.")) return "receptionist";
        if (emailLower.includes("@pharmacy.")) return "pharmacist";
        if (emailLower.includes("@lab.")) return "lab_technician";

        // 3. Default role
        return "student";
    };

    const handleLogin = (userData) => {
        console.log('🔐 Login received:', userData);
        setUser(userData);

        const userType = detectUserType(userData.email);

        console.log('Setting page to:', `${userType}-dashboard`);
        setCurrentPage(`${userType}-dashboard`);
    };


    const handleRegister = (userData) => {
        console.log('📝 Register received:', userData);
        setUser(userData);

        // Always go to student dashboard after registration for now
        console.log('Setting page to: student-dashboard');
        setCurrentPage('student-dashboard');
    };

    const handleLogout = () => {
        console.log('👋 Logging out');
        setUser(null);
        setCurrentPage('home');
    };

    const handleUpdateProfile = (updatedData) => {
        console.log('Profile updated:', updatedData);
        // Update user state if needed
    };

    const renderPage = () => {
        console.log('🔄 Rendering page:', currentPage);

        // Common props for all pages
        const commonProps = {
            user: user,
            navigateTo: setCurrentPage,
            onLogout: handleLogout,
            onUpdateProfile: handleUpdateProfile
        };

        switch(currentPage) {
            case 'home':
                return <Home {...commonProps} />;
            case 'login':
                return <Login {...commonProps} onLogin={handleLogin} />;
            case 'register':
                return <Register {...commonProps} onRegister={handleRegister} />;
            case 'student-dashboard':
                return <StudentDashboard {...commonProps} />;
            case 'book-appointment':
                return <BookAppointment {...commonProps} />;
            case 'health-records':
                return <HealthRecords {...commonProps} />;
            case 'my-appointments':
                return <MyAppointments {...commonProps} />;
            case 'doctor-dashboard':
                return <DoctorDashboard {...commonProps} />;
            case 'admin-dashboard':
                return <AdminDashboard {...commonProps} />;
            case 'manage-users':
                return <ManageUsers {...commonProps} />;
            case 'manage-doctors':
                return <ManageDoctors {...commonProps} />;
            case 'manage-appointments':
                return <ManageAppointments {...commonProps} />;
            case 'reports':
                return <Reports {...commonProps} />;
            case 'contact':
                return <Contact {...commonProps} />;
            case 'features':
                return <Features {...commonProps} />;
            case 'blog':
                return <Blog {...commonProps} />;
            case 'doctor-blog-management':
                return <BlogManagement {...commonProps} />;
            case 'admin-blog-management':
                return <AdminBlogManagement {...commonProps} />;
            case 'doctor-profile':
                return <DoctorProfile {...commonProps} />;
            case 'student-profile':
                return <StudentProfile {...commonProps} />;
            case 'student-notifications':
                return <StudentNotifications {...commonProps} />;
            case 'doctor-notifications':
                return <DoctorNotifications {...commonProps} />;
            case 'nurse-dashboard':
                return <NurseDashboard {...commonProps} />;
            case 'receptionist-dashboard':
                return <ReceptionistDashboard {...commonProps} />;
            case 'pharmacist-dashboard':
                return <PharmacistDashboard {...commonProps} />;
            case 'lab-technician-dashboard':
                return <LabTechnicianDashboard {...commonProps} />;
            default:
                console.log('Unknown page, defaulting to home');
                return <Home {...commonProps} />;
        }
    };

    return (
        <div className="App">
            {/* Debug header */}
            <div style={{
                padding: '5px 10px',
                backgroundColor: '#f0f0f0',
                fontSize: '12px',
                borderBottom: '1px solid #ccc'
            }}>
                Current: {currentPage} |
                {user ? ` User: ${user.email || 'No email'}` : ' No user'}
            </div>

            {renderPage()}
        </div>
    );
}

export default App;