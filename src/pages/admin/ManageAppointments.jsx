import React, { useState } from 'react';
import '../../styles/AdminDashboard.css'; // Fixed path

const ManageAppointments = ({ navigateTo }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Sample appointments data
    const appointments = [
        {
            id: 1,
            patientName: 'John Smith',
            doctorName: 'Dr. Sarah Johnson',
            date: '2024-02-15',
            time: '10:00 AM',
            type: 'Checkup',
            status: 'scheduled',
            department: 'Computer Science'
        },
        {
            id: 2,
            patientName: 'Emily Chen',
            doctorName: 'Dr. Michael Chen',
            date: '2024-02-15',
            time: '11:30 AM',
            type: 'Consultation',
            status: 'scheduled',
            department: 'Engineering'
        }
    ];

    const filteredAppointments = appointments.filter(apt =>
        (statusFilter === 'all' || apt.status === statusFilter) &&
        (apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            apt.department.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleBackToDashboard = () => {
        navigateTo('admin-dashboard');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'scheduled': return 'status-scheduled';
            case 'completed': return 'status-completed';
            case 'cancelled': return 'status-cancelled';
            default: return 'status-scheduled';
        }
    };

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-content">
                <div className="admin-header">
                    <div>
                        <h1>Manage Appointments</h1>
                        <p>View and monitor all appointments</p>
                    </div>
                    <button onClick={handleBackToDashboard} className="btn-secondary">
                        ← Back to Dashboard
                    </button>
                </div>

                {/* Search and Filter */}
                <div className="filter-section">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search appointments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <span className="search-icon">🔍</span>
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Status</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                {/* Appointments Table */}
                <div className="admin-table-container">
                    <div className="table-header">
                        <span>Patient</span>
                        <span>Doctor</span>
                        <span>Date & Time</span>
                        <span>Type</span>
                        <span>Department</span>
                        <span>Status</span>
                    </div>

                    {filteredAppointments.map(apt => (
                        <div key={apt.id} className="table-row">
                            <div className="user-info">
                                <strong>{apt.patientName}</strong>
                            </div>
                            <div className="user-info">
                                <strong>{apt.doctorName}</strong>
                            </div>
                            <div className="datetime">
                                <span>{apt.date}</span>
                                <span>{apt.time}</span>
                            </div>
                            <span>{apt.type}</span>
                            <span>{apt.department}</span>
                            <span className={`status-badge ${getStatusColor(apt.status)}`}>
                                {apt.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageAppointments;