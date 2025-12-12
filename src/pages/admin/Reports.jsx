import React from 'react';
import '../../styles/DoctorDashboard.css';

const Reports = ({ navigateTo }) => {
    const stats = {
        totalUsers: 1289,
        activeDoctors: 38,
        monthlyAppointments: 456,
        systemUptime: '99.9%'
    };

    const handleBackToDashboard = () => {
        navigateTo('admin-dashboard');
    };

    const handleGenerateReport = (type) => {
        alert(`Generating ${type} report...`);
    };

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-content">
                <div className="admin-header">
                    <div>
                        <h1>Reports & Analytics</h1>
                        <p>System overview and analytics</p>
                    </div>
                    <button onClick={handleBackToDashboard} className="btn-secondary">
                        ← Back to Dashboard
                    </button>
                </div>

                {/* Report Cards */}
                <div className="report-stats">
                    <div className="stat-card">
                        <div className="stat-icon">👥</div>
                        <div className="stat-content">
                            <h3>{stats.totalUsers}</h3>
                            <p>Total Users</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">👨‍⚕️</div>
                        <div className="stat-content">
                            <h3>{stats.activeDoctors}</h3>
                            <p>Active Doctors</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">📅</div>
                        <div className="stat-content">
                            <h3>{stats.monthlyAppointments}</h3>
                            <p>Monthly Appointments</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⚡</div>
                        <div className="stat-content">
                            <h3>{stats.systemUptime}</h3>
                            <p>System Uptime</p>
                        </div>
                    </div>
                </div>

                {/* Report Actions */}
                <div className="report-actions">
                    <h3>Generate Reports</h3>
                    <div className="actions-grid">
                        <div className="action-card" onClick={() => handleGenerateReport('user')}>
                            <h4>📊 User Report</h4>
                            <p>User registration and activity</p>
                        </div>
                        <div className="action-card" onClick={() => handleGenerateReport('appointment')}>
                            <h4>📅 Appointment Report</h4>
                            <p>Appointment statistics</p>
                        </div>
                        <div className="action-card" onClick={() => handleGenerateReport('medical')}>
                            <h4>🏥 Medical Report</h4>
                            <p>Health records overview</p>
                        </div>
                        <div className="action-card" onClick={() => handleGenerateReport('system')}>
                            <h4>⚡ System Report</h4>
                            <p>System performance</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;