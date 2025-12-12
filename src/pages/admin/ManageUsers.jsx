import React, { useState } from 'react';
import '../../styles/AdminDashboard.css'; // Fixed path

const ManageUsers = ({ navigateTo }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    // Sample students data
    const [students, setStudents] = useState([
        {
            id: 1,
            name: 'John Smith',
            studentId: 'STU2024001',
            email: 'john.smith@student.university.edu',
            department: 'Computer Science',
            age: 21,
            sex: 'Male',
            status: 'Active',
            registrationDate: '2024-01-15'
        },
        {
            id: 2,
            name: 'Emily Chen',
            studentId: 'STU2024002',
            email: 'emily.chen@student.university.edu',
            department: 'Engineering',
            age: 20,
            sex: 'Female',
            status: 'Active',
            registrationDate: '2024-01-16'
        }
    ]);

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBackToDashboard = () => {
        navigateTo('admin-dashboard');
    };

    const handleToggleStatus = (studentId) => {
        setStudents(students.map(student =>
            student.id === studentId
                ? { ...student, status: student.status === 'Active' ? 'Inactive' : 'Active' }
                : student
        ));
    };

    const handleViewDetails = (student) => {
        setSelectedUser(student);
    };

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-content">
                <div className="admin-header">
                    <div>
                        <h1>Manage Students</h1>
                        <p>View and manage all student accounts</p>
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
                            placeholder="Search students by name, ID, email, or department..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <span className="search-icon">🔍</span>
                    </div>
                    {searchTerm && (
                        <p className="search-results-info">
                            Found {filteredStudents.length} student(s)
                        </p>
                    )}
                </div>

                {/* Students Table */}
                <div className="admin-table-container">
                    <div className="table-header">
                        <span>Student</span>
                        <span>Contact</span>
                        <span>Department</span>
                        <span>Status</span>
                        <span>Actions</span>
                    </div>

                    {filteredStudents.map(student => (
                        <div key={student.id} className="table-row">
                            <div className="user-info">
                                <strong>{student.name}</strong>
                                <span>ID: {student.studentId}</span>
                            </div>
                            <div className="contact-info">
                                <span>{student.email}</span>
                                <span>Age: {student.age} • {student.sex}</span>
                            </div>
                            <span>{student.department}</span>
                            <span className={`status-badge ${student.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                                {student.status}
                            </span>
                            <div className="actions">
                                <button
                                    onClick={() => handleToggleStatus(student.id)}
                                    className={`btn-small ${student.status === 'Active' ? 'btn-warning' : 'btn-success'}`}
                                >
                                    {student.status === 'Active' ? 'Deactivate' : 'Activate'}
                                </button>
                                <button
                                    onClick={() => handleViewDetails(student)}
                                    className="btn-outline small"
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* User Details Modal */}
                {selectedUser && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-header">
                                <h3>Student Details</h3>
                                <button onClick={() => setSelectedUser(null)} className="close-btn">×</button>
                            </div>
                            <div className="modal-body">
                                <div className="user-details-grid">
                                    <div><strong>Name:</strong> {selectedUser.name}</div>
                                    <div><strong>Student ID:</strong> {selectedUser.studentId}</div>
                                    <div><strong>Email:</strong> {selectedUser.email}</div>
                                    <div><strong>Department:</strong> {selectedUser.department}</div>
                                    <div><strong>Age:</strong> {selectedUser.age}</div>
                                    <div><strong>Sex:</strong> {selectedUser.sex}</div>
                                    <div><strong>Status:</strong> {selectedUser.status}</div>
                                    <div><strong>Registered:</strong> {selectedUser.registrationDate}</div>
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button onClick={() => setSelectedUser(null)} className="btn-secondary">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;