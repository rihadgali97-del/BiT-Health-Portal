import React, { useState } from 'react';
import '../../styles/AdminDashboard.css';
import ManageUsers from './ManageUsers';
import ManageDoctors from './ManageDoctors';
import ManageStaff from './ManageStaff';
import ManageAppointments from './ManageAppointments';
import Reports from './Reports';

const AdminDashboard = ({ user, onLogout, navigateTo }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');

    // Sample admin data
    const adminProfile = {
        name: 'Admin User',
        email: 'admin@university.edu',
        role: 'System Administrator',
        lastLogin: new Date().toLocaleDateString()
    };

    // Sample statistics data
    const [stats, setStats] = useState({
        totalUsers: 1247,
        totalDoctors: 23,
        totalStaff: 45,
        todayAppointments: 18,
        pendingApprovals: 5,
        systemHealth: 'Optimal'
    });

    // Sample recent activities
    const recentActivities = [
        { id: 1, action: 'New doctor registration', user: 'Dr. Sarah Johnson', time: '2 hours ago', type: 'registration' },
        { id: 2, action: 'Appointment scheduled', user: 'John Smith', time: '3 hours ago', type: 'appointment' },
        { id: 3, action: 'User account deactivated', user: 'Mike Brown', time: '5 hours ago', type: 'security' },
        { id: 4, action: 'System backup completed', user: 'System', time: '6 hours ago', type: 'system' }
    ];

    const handleBackToHome = () => {
        navigateTo('home');
    };

    const handleViewUsers = () => {
        setActiveTab('manage-users');
        setSearchTerm('');
    };

    const handleViewDoctors = () => {
        setActiveTab('manage-doctors');
        setSearchTerm('');
    };

    const handleViewStaff = () => {
        setActiveTab('manage-staff');
        setSearchTerm('');
    };

    const handleViewAppointments = () => {
        setActiveTab('manage-appointments');
        setSearchTerm('');
    };

    const handleViewReports = () => {
        setActiveTab('reports');
        setSearchTerm('');
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'registration': return '👤';
            case 'appointment': return '📅';
            case 'security': return '🔒';
            case 'system': return '⚙️';
            default: return '📝';
        }
    };

    const renderOverview = () => (
        <div>
            {/* Stats Cards */}
            <div className="admin-stats">
                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                        <h3>{stats.totalUsers}</h3>
                        <p>Total Users</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🩺</div>
                    <div className="stat-content">
                        <h3>{stats.totalDoctors}</h3>
                        <p>Doctors</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">👨‍⚕️</div>
                    <div className="stat-content">
                        <h3>{stats.totalStaff}</h3>
                        <p>Staff Members</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📅</div>
                    <div className="stat-content">
                        <h3>{stats.todayAppointments}</h3>
                        <p>Today's Appointments</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-content">
                        <h3>{stats.pendingApprovals}</h3>
                        <p>Pending Approvals</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">💚</div>
                    <div className="stat-content">
                        <h3>{stats.systemHealth}</h3>
                        <p>System Health</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                    <div className="action-card" onClick={handleViewUsers}>
                        <h4>👥 Manage Users</h4>
                        <p>View and manage all user accounts</p>
                    </div>
                    <div className="action-card" onClick={handleViewDoctors}>
                        <h4>🩺 Manage Doctors</h4>
                        <p>Doctor accounts and specialties</p>
                    </div>
                    <div className="action-card" onClick={handleViewStaff}>
                        <h4>👨‍⚕️ Manage Staff</h4>
                        <p>Healthcare staff accounts</p>
                    </div>
                    <div className="action-card" onClick={handleViewAppointments}>
                        <h4>📅 Appointments</h4>
                        <p>View and manage appointments</p>
                    </div>
                    <div className="action-card" onClick={handleViewReports}>
                        <h4>📈 Generate Reports</h4>
                        <p>System analytics and reports</p>
                    </div>
                    <div className="action-card">
                        <h4>⚙️ System Settings</h4>
                        <p>Configure system preferences</p>
                    </div>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="recent-activities">
                <h3>Recent Activities</h3>
                <div className="activities-list">
                    {recentActivities.map(activity => (
                        <div key={activity.id} className="activity-item">
                            <div className="activity-icon">
                                {getActivityIcon(activity.type)}
                            </div>
                            <div className="activity-details">
                                <h4>{activity.action}</h4>
                                <p>By: {activity.user}</p>
                            </div>
                            <div className="activity-time">
                                {activity.time}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* System Status */}
            <div className="system-status">
                <h3>System Status</h3>
                <div className="status-grid">
                    <div className="status-item online">
                        <strong>Web Server</strong>
                        <span>Online</span>
                    </div>
                    <div className="status-item online">
                        <strong>Database</strong>
                        <span>Online</span>
                    </div>
                    <div className="status-item online">
                        <strong>API Services</strong>
                        <span>Online</span>
                    </div>
                    <div className="status-item online">
                        <strong>Email Service</strong>
                        <span>Online</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderManageUsers = () => (
        <ManageUsers navigateTo={navigateTo} />
    );

    const renderManageDoctors = () => (
        <ManageDoctors navigateTo={navigateTo} />
    );

    const renderManageStaff = () => (
        <ManageStaff navigateTo={navigateTo} />
    );

    const renderManageAppointments = () => (
        <ManageAppointments navigateTo={navigateTo} />
    );

    const renderReports = () => (
        <Reports navigateTo={navigateTo} />
    );

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-content">
                {/* Header */}
                <div className="admin-header">
                    <div className="admin-info">
                        <div className="admin-avatar">
                            {adminProfile.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <h1>Admin Dashboard</h1>
                            <p>Welcome back, {adminProfile.name}</p>
                            <span className="admin-role">{adminProfile.role}</span>
                        </div>
                    </div>
                    <div className="admin-actions">
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

                {/* Admin Profile Quick Info */}
                <div className="admin-profile-card">
                    <div className="profile-details">
                        <div className="detail-row">
                            <strong>Email:</strong> {adminProfile.email}
                        </div>
                        <div className="detail-row">
                            <strong>Last Login:</strong> {adminProfile.lastLogin}
                        </div>
                        <div className="detail-row">
                            <strong>System Time:</strong> {new Date().toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="admin-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        📊 Overview
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'manage-users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('manage-users')}
                    >
                        👥 Manage Users
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'manage-doctors' ? 'active' : ''}`}
                        onClick={() => setActiveTab('manage-doctors')}
                    >
                        🩺 Manage Doctors
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'manage-staff' ? 'active' : ''}`}
                        onClick={() => setActiveTab('manage-staff')}
                    >
                        👨‍⚕️ Manage Staff
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'manage-appointments' ? 'active' : ''}`}
                        onClick={() => setActiveTab('manage-appointments')}
                    >
                        📅 Appointments
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reports')}
                    >
                        📈 Reports
                    </button>
                </div>

                {/* Content */}
                <div className="admin-content">
                    {activeTab === 'overview' && renderOverview()}
                    {activeTab === 'manage-users' && renderManageUsers()}
                    {activeTab === 'manage-doctors' && renderManageDoctors()}
                    {activeTab === 'manage-staff' && renderManageStaff()}
                    {activeTab === 'manage-appointments' && renderManageAppointments()}
                    {activeTab === 'reports' && renderReports()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;