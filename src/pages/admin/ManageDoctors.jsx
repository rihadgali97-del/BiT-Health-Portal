import React, { useState } from 'react';
import '../../styles/AdminDashboard.css'; // Fixed path

const ManageDoctors = ({ navigateTo }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Sample doctors data
    const [doctors, setDoctors] = useState([
        {
            id: 1,
            name: 'Dr. Sarah Johnson',
            email: 's.johnson@doctor.university.edu',
            specialty: 'General Physician',
            phone: '(555) 123-4567',
            status: 'Active',
            patients: 247,
            joinDate: '2023-05-15'
        },
        {
            id: 2,
            name: 'Dr. Michael Chen',
            email: 'm.chen@doctor.university.edu',
            specialty: 'Psychiatrist',
            phone: '(555) 123-4568',
            status: 'Active',
            patients: 189,
            joinDate: '2023-08-22'
        }
    ]);

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBackToDashboard = () => {
        navigateTo('admin-dashboard');
    };

    const handleApproveDoctor = (doctorId) => {
        setDoctors(doctors.map(doctor =>
            doctor.id === doctorId ? { ...doctor, status: 'Active' } : doctor
        ));
    };

    const handleToggleStatus = (doctorId) => {
        setDoctors(doctors.map(doctor =>
            doctor.id === doctorId
                ? { ...doctor, status: doctor.status === 'Active' ? 'Inactive' : 'Active' }
                : doctor
        ));
    };

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-content">
                <div className="admin-header">
                    <div>
                        <h1>Manage Doctors</h1>
                        <p>Manage healthcare providers and approvals</p>
                    </div>
                    <button onClick={handleBackToDashboard} className="btn-secondary">
                        ← Back to Dashboard
                    </button>
                </div>

                {/* Search Bar */}
                <div className="search-section">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search doctors by name, email, or specialty..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <span className="search-icon">🔍</span>
                    </div>
                    {searchTerm && (
                        <p className="search-results-info">
                            Found {filteredDoctors.length} doctor(s)
                        </p>
                    )}
                </div>

                {/* Doctors Table */}
                <div className="admin-table-container">
                    <div className="table-header">
                        <span>Doctor</span>
                        <span>Contact</span>
                        <span>Specialty</span>
                        <span>Patients</span>
                        <span>Status</span>
                        <span>Actions</span>
                    </div>

                    {filteredDoctors.map(doctor => (
                        <div key={doctor.id} className="table-row">
                            <div className="user-info">
                                <strong>{doctor.name}</strong>
                                <span>Joined: {doctor.joinDate}</span>
                            </div>
                            <div className="contact-info">
                                <span>{doctor.email}</span>
                                <span>{doctor.phone}</span>
                            </div>
                            <span>{doctor.specialty}</span>
                            <span>{doctor.patients}</span>
                            <span className={`status-badge ${
                                doctor.status === 'Active' ? 'status-active' :
                                    doctor.status === 'Pending' ? 'status-pending' : 'status-inactive'
                            }`}>
                                {doctor.status}
                            </span>
                            <div className="actions">
                                <button
                                    onClick={() => handleToggleStatus(doctor.id)}
                                    className={`btn-small ${
                                        doctor.status === 'Active' ? 'btn-warning' : 'btn-success'
                                    }`}
                                >
                                    {doctor.status === 'Active' ? 'Deactivate' : 'Activate'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageDoctors;