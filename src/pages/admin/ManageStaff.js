import React, { useState } from 'react';

const ManageStaff = ({ navigateTo }) => {
    const [activeTab, setActiveTab] = useState('create');
    const [staffForm, setStaffForm] = useState({
        fullName: '',
        staffId: '',
        staffType: 'nurse',
        department: '',
        email: '',
        phoneNumber: '',
        qualifications: ''
    });
    const [existingStaff, setExistingStaff] = useState([]);

    const staffTypes = [
        { value: 'nurse', label: 'Nurse' },
        { value: 'receptionist', label: 'Receptionist' },
        { value: 'pharmacist', label: 'Pharmacist' },
        { value: 'lab_technician', label: 'Lab Technician' },
        { value: 'doctor', label: 'Doctor' }
    ];

    const departments = [
        'Emergency Department',
        'Outpatient Clinic',
        'Pharmacy',
        'Laboratory',
        'Reception',
        'General Practice',
        'Pediatrics',
        'Surgery'
    ];

    const handleStaffFormChange = (field, value) => {
        setStaffForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const generateStaffEmail = (fullName, staffType) => {
        const nameParts = fullName.toLowerCase().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts[nameParts.length - 1];
        return `${firstName}.${lastName}@${staffType}.university.edu`;
    };

    const handleCreateStaff = (e) => {
        e.preventDefault();

        if (!staffForm.fullName || !staffForm.staffId) {
            alert('Please fill in all required fields');
            return;
        }

        // Generate temporary password
        const tempPassword = Math.random().toString(36).slice(-8) + 'A1!';

        // Auto-generate email if not provided
        const email = staffForm.email || generateStaffEmail(staffForm.fullName, staffForm.staffType);

        const newStaff = {
            id: Date.now(),
            ...staffForm,
            email,
            tempPassword,
            status: 'active',
            createdAt: new Date().toISOString(),
            createdBy: 'Admin' // In real app, use actual admin name
        };

        setExistingStaff(prev => [...prev, newStaff]);

        // Reset form
        setStaffForm({
            fullName: '',
            staffId: '',
            staffType: 'nurse',
            department: '',
            email: '',
            phoneNumber: '',
            qualifications: ''
        });

        alert(`Staff account created!\nTemporary Password: ${tempPassword}\nPlease provide this to the staff member securely.`);
    };

    const handleDeactivateStaff = (staffId) => {
        setExistingStaff(prev =>
            prev.map(staff =>
                staff.id === staffId
                    ? { ...staff, status: 'inactive' }
                    : staff
            )
        );
        alert('Staff account deactivated');
    };

    const handleResetPassword = (staffId) => {
        const newTempPassword = Math.random().toString(36).slice(-8) + 'A1!';
        setExistingStaff(prev =>
            prev.map(staff =>
                staff.id === staffId
                    ? { ...staff, tempPassword: newTempPassword }
                    : staff
            )
        );
        alert(`Password reset!\nNew Temporary Password: ${newTempPassword}`);
    };

    return (
        <div className="admin-content-section">
            <div className="section-header">
                <h2>Staff Management</h2>
                <p>Create and manage healthcare staff accounts</p>
            </div>

            <div className="admin-tabs">
                <button
                    className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
                    onClick={() => setActiveTab('create')}
                >
                    👨‍⚕️ Create Staff
                </button>
                <button
                    className={`tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
                    onClick={() => setActiveTab('manage')}
                >
                    📋 Manage Staff
                </button>
            </div>

            {activeTab === 'create' && (
                <div className="create-staff-section">
                    <div className="admin-card">
                        <h3>Create New Staff Account</h3>
                        <form onSubmit={handleCreateStaff}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Full Name *</label>
                                    <input
                                        type="text"
                                        value={staffForm.fullName}
                                        onChange={(e) => handleStaffFormChange('fullName', e.target.value)}
                                        placeholder="Enter staff full name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Staff ID *</label>
                                    <input
                                        type="text"
                                        value={staffForm.staffId}
                                        onChange={(e) => handleStaffFormChange('staffId', e.target.value)}
                                        placeholder="Enter staff ID"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Staff Type *</label>
                                    <select
                                        value={staffForm.staffType}
                                        onChange={(e) => handleStaffFormChange('staffType', e.target.value)}
                                        required
                                    >
                                        {staffTypes.map(type => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Department *</label>
                                    <select
                                        value={staffForm.department}
                                        onChange={(e) => handleStaffFormChange('department', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        value={staffForm.email}
                                        onChange={(e) => handleStaffFormChange('email', e.target.value)}
                                        placeholder={`Auto-generates to: ${generateStaffEmail(staffForm.fullName, staffForm.staffType)}`}
                                    />
                                    <small>Leave empty to auto-generate</small>
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        value={staffForm.phoneNumber}
                                        onChange={(e) => handleStaffFormChange('phoneNumber', e.target.value)}
                                        placeholder="+251 9XX XXX XXX"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Qualifications & Specializations</label>
                                <textarea
                                    value={staffForm.qualifications}
                                    onChange={(e) => handleStaffFormChange('qualifications', e.target.value)}
                                    placeholder="Enter qualifications, certifications, or specializations..."
                                    rows="3"
                                />
                            </div>

                            <button type="submit" className="btn-primary">
                                Create Staff Account
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {activeTab === 'manage' && (
                <div className="manage-staff-section">
                    <div className="admin-card">
                        <h3>Existing Staff Accounts</h3>
                        <div className="staff-table">
                            <div className="table-header">
                                <span>Name</span>
                                <span>Staff ID</span>
                                <span>Role</span>
                                <span>Department</span>
                                <span>Status</span>
                                <span>Actions</span>
                            </div>
                            {existingStaff.map(staff => (
                                <div key={staff.id} className="table-row">
                                    <div className="staff-info">
                                        <strong>{staff.fullName}</strong>
                                        <span>{staff.email}</span>
                                    </div>
                                    <span>{staff.staffId}</span>
                                    <span className={`role-badge role-${staff.staffType}`}>
                                        {staffTypes.find(t => t.value === staff.staffType)?.label}
                                    </span>
                                    <span>{staff.department}</span>
                                    <span className={`status-badge ${staff.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                                        {staff.status}
                                    </span>
                                    <div className="actions">
                                        <button
                                            onClick={() => handleResetPassword(staff.id)}
                                            className="btn-outline small"
                                        >
                                            Reset Password
                                        </button>
                                        <button
                                            onClick={() => handleDeactivateStaff(staff.id)}
                                            className="btn-cancel small"
                                        >
                                            Deactivate
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {existingStaff.length === 0 && (
                                <div className="no-data">
                                    No staff accounts created yet
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageStaff;