import React, { useState } from 'react';
import '../../styles/AdminDashboard.css'; 
// 1. Import the sample data from the new store file
import { appointments as initialAppointments } from '../../Data/appointmentData'; 

const ManageAppointments = ({ navigateTo }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    // Use state for appointments so actions can update the status
    const [appointments, setAppointments] = useState(initialAppointments);

    const filteredAppointments = appointments.filter(apt =>
        (statusFilter === 'all' || apt.status === statusFilter) &&
        (apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            apt.department.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleBackToDashboard = () => {
        navigateTo('admin-dashboard');
    };
    
    // --- New Action Handlers ---
    const handleApprove = (id) => {
        setAppointments(prevApts => 
            prevApts.map(apt => 
                apt.id === id ? { ...apt, status: 'approved' } : apt
            )
        );
        console.log(`Appointment ${id} approved.`);
    };

    const handleCancel = (id) => {
        setAppointments(prevApts => 
            prevApts.map(apt => 
                apt.id === id ? { ...apt, status: 'cancelled' } : apt
            )
        );
        console.log(`Appointment ${id} cancelled.`);
    };
    // ----------------------------

    const getStatusColor = (status) => {
        switch (status) {
            case 'scheduled': 
            case 'approved': return 'status-active'; // Use 'active' style for scheduled/approved
            case 'completed': return 'status-completed';
            case 'cancelled': return 'status-inactive'; // Use 'inactive' style for cancelled
            default: return 'status-active';
        }
    };

    // Note: The structure inside the return statement is updated to match the image's layout and headers.

    return (
        <div className="admin-dashboard-container">
            
            {/* End Admin Header Placeholder */}

            <div className="admin-dashboard-content">
                <div className="content-card"> {/* Use a card-like structure as in the image */}
                    <div className="admin-header">
                        <div>
                            {/* Mimic the 'Manage Students' header style */}
                            <h2>Manage Appointments</h2>
                            <p className="subtitle">View and monitor all appointments</p>
                        </div>
        
                    </div>

                    {/* Search and Filter Section (Combined into one row like the image) */}
                    <div className="filter-row">
                        <div className="search-container table-search">
                            <input
                                type="text"
                                placeholder="Search appointments by patient, doctor, or department"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            <span className="search-icon">🔍</span>
                        </div>
                        <div className="status-filter">
                           <label htmlFor="statusFilter">Filter by Status:</label>
                           <select
                                id="statusFilter"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">All Status</option>
                                <option value="scheduled">Scheduled (Pending)</option>
                                <option value="approved">Approved</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    {/* Appointments Table */}
                    <div className="admin-table-container">
                        <div className="table-header appointment-table-header">
                            <span className="patient-col">Patient</span>
                            <span className="doctor-col">Doctor</span>
                            <span className="datetime-col">Date & Time</span>
                            <span className="type-col">Type</span>
                            <span className="department-col">Department</span>
                            <span className="status-col">Status</span>
                            <span className="actions-col">Actions</span> {/* New Column */}
                        </div>

                        {filteredAppointments.length === 0 && (
                            <div className="no-results">No appointments match the current criteria.</div>
                        )}

                        {filteredAppointments.map(apt => (
                            <div key={apt.id} className="table-row">
                                <div className="user-info patient-col">
                                    <strong>{apt.patientName}</strong>
                                </div>
                                <div className="user-info doctor-col">
                                    {apt.doctorName}
                                </div>
                                <div className="datetime-col">
                                    <span className="date-display">{apt.date}</span>
                                    <span className="time-display">{apt.time}</span>
                                </div>
                                <span className="type-col">{apt.type}</span>
                                <span className="department-col">{apt.department}</span>
                                <span className={`status-badge ${getStatusColor(apt.status)} status-col`}>
                                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                                </span>
                                
                                {/* New Actions Column */}
                                <div className="actions-col">
                                    {apt.status === 'scheduled' && (
                                        <>
                                            <button 
                                                onClick={() => handleApprove(apt.id)} 
                                                className="btn-action btn-approve"
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                onClick={() => handleCancel(apt.id)} 
                                                className="btn-action btn-cancel"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                    {(apt.status === 'approved' || apt.status === 'completed') && (
                                        <button 
                                            onClick={() => alert(`Viewing details for ${apt.patientName}`)}
                                            className="btn-action btn-view"
                                        >
                                            View
                                        </button>
                                    )}
                                    {apt.status === 'cancelled' && (
                                        <button disabled className="btn-action btn-disabled">
                                            Cancelled
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageAppointments;