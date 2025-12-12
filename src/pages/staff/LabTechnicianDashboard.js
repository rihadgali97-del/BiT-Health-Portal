import React, { useState } from 'react';
import '../../styles/StaffDashboard.css';

const LabTechnicianDashboard = ({ user, onLogout, navigateTo }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');

    // Lab technician profile
    const labTechProfile = user ? {
        name: user.fullName,
        staffId: user.staffId,
        email: user.email,
        department: user.department
    } : {};

    // Sample data
    const [testOrders, setTestOrders] = useState([
        {
            id: 1,
            patientName: 'John Smith',
            patientId: 'STU2024001',
            doctorName: 'Dr. Sarah Johnson',
            testType: 'Blood Test - CBC',
            status: 'pending',
            orderedDate: '2024-02-15',
            priority: 'routine'
        },
        {
            id: 2,
            patientName: 'Emily Chen',
            patientId: 'STU2024002',
            doctorName: 'Dr. Michael Brown',
            testType: 'Urine Analysis',
            status: 'in_progress',
            orderedDate: '2024-02-14',
            priority: 'urgent'
        }
    ]);

    const [testResults, setTestResults] = useState([
        {
            id: 1,
            patientName: 'Michael Brown',
            testType: 'Blood Glucose',
            result: '95 mg/dL',
            status: 'normal',
            completedDate: '2024-02-13'
        }
    ]);

    // Stats
    const stats = {
        totalOrders: testOrders.length,
        pendingTests: testOrders.filter(t => t.status === 'pending').length,
        completedToday: testResults.filter(r => r.completedDate === new Date().toISOString().split('T')[0]).length,
        urgentTests: testOrders.filter(t => t.priority === 'urgent').length
    };

    const handleStartTest = (orderId) => {
        setTestOrders(prev =>
            prev.map(order => order.id === orderId ? { ...order, status: 'in_progress' } : order)
        );
    };

    const handleCompleteTest = (orderId) => {
        setTestOrders(prev =>
            prev.map(order => order.id === orderId ? { ...order, status: 'completed' } : order)
        );
    };

    const handleBackToHome = () => {
        navigateTo('home');
    };

    const renderOverview = () => (
        <div>
            <div className="staff-stats">
                <div className="stat-card">
                    <div className="stat-icon">🧪</div>
                    <div className="stat-content">
                        <h3>{stats.totalOrders}</h3>
                        <p>Total Test Orders</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-content">
                        <h3>{stats.pendingTests}</h3>
                        <p>Pending Tests</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-content">
                        <h3>{stats.completedToday}</h3>
                        <p>Completed Today</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🚨</div>
                    <div className="stat-content">
                        <h3>{stats.urgentTests}</h3>
                        <p>Urgent Tests</p>
                    </div>
                </div>
            </div>

            <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                    <div className="action-card" onClick={() => setActiveTab('test-orders')}>
                        <h4>📋 Test Orders</h4>
                        <p>Manage laboratory tests</p>
                    </div>
                    <div className="action-card" onClick={() => setActiveTab('results')}>
                        <h4>📊 Test Results</h4>
                        <p>View and manage results</p>
                    </div>
                    <div className="action-card">
                        <h4>🔬 Equipment</h4>
                        <p>Lab equipment management</p>
                    </div>
                    <div className="action-card">
                        <h4>📈 Analytics</h4>
                        <p>Laboratory reports</p>
                    </div>
                </div>
            </div>

            <div className="pending-tests">
                <h3>Pending Test Orders</h3>
                <div className="test-orders-list">
                    {testOrders.filter(order => order.status === 'pending').map(order => (
                        <div key={order.id} className="test-order-item">
                            <div className="test-info">
                                <h4>{order.patientName}</h4>
                                <p>{order.testType}</p>
                                <span className={`priority ${order.priority}`}>{order.priority}</span>
                            </div>
                            <button
                                onClick={() => handleStartTest(order.id)}
                                className="btn-primary small"
                            >
                                Start Test
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderTestOrders = () => (
        <div>
            <div className="page-header">
                <button onClick={() => setActiveTab('overview')} className="btn-secondary">
                    ← Back to Overview
                </button>
                <h3>Test Orders Management</h3>
            </div>

            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search test orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="test-orders-table">
                <div className="table-header">
                    <span>Patient</span>
                    <span>Test Type</span>
                    <span>Doctor</span>
                    <span>Priority</span>
                    <span>Status</span>
                    <span>Actions</span>
                </div>
                {testOrders.map(order => (
                    <div key={order.id} className="table-row">
                        <div className="patient-info">
                            <strong>{order.patientName}</strong>
                            <span>ID: {order.patientId}</span>
                        </div>
                        <span>{order.testType}</span>
                        <span>{order.doctorName}</span>
                        <span className={`priority-badge ${order.priority}`}>
                            {order.priority}
                        </span>
                        <span className={`status-badge ${order.status === 'completed' ? 'status-completed' : order.status === 'in_progress' ? 'status-in-progress' : 'status-pending'}`}>
                            {order.status.replace('_', ' ')}
                        </span>
                        <div className="actions">
                            {order.status === 'pending' && (
                                <button
                                    onClick={() => handleStartTest(order.id)}
                                    className="btn-primary small"
                                >
                                    Start Test
                                </button>
                            )}
                            {order.status === 'in_progress' && (
                                <button
                                    onClick={() => handleCompleteTest(order.id)}
                                    className="btn-primary small"
                                >
                                    Complete
                                </button>
                            )}
                            <button className="btn-outline small">Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderResults = () => (
        <div>
            <div className="page-header">
                <button onClick={() => setActiveTab('overview')} className="btn-secondary">
                    ← Back to Overview
                </button>
                <h3>Test Results</h3>
            </div>

            <div className="test-results-grid">
                {testResults.map(result => (
                    <div key={result.id} className="test-result-card">
                        <div className="result-header">
                            <h4>{result.patientName}</h4>
                            <span className={`result-status ${result.status}`}>
                                {result.status}
                            </span>
                        </div>
                        <div className="result-details">
                            <p><strong>Test:</strong> {result.testType}</p>
                            <p><strong>Result:</strong> {result.result}</p>
                            <p><strong>Completed:</strong> {result.completedDate}</p>
                        </div>
                        <div className="result-actions">
                            <button className="btn-primary small">View Full Report</button>
                            <button className="btn-outline small">Send to Doctor</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="staff-dashboard-container">
            <div className="staff-dashboard-content">
                <div className="staff-header">
                    <div className="staff-info">
                        <div className="staff-avatar">🔬</div>
                        <div>
                            <h1>Lab Technician Dashboard</h1>
                            <p>Welcome back, {labTechProfile.name || 'Lab Technician'}</p>
                            <span className="staff-role">Medical Laboratory Technician</span>
                        </div>
                    </div>
                    <div className="staff-actions">
                        <button onClick={handleBackToHome} className="btn-secondary">
                            🏠 Back to Home
                        </button>
                        <button onClick={onLogout} className="btn-primary logout-btn">
                            🚪 Logout
                        </button>
                    </div>
                </div>

                <div className="staff-profile-card">
                    <div className="profile-details">
                        <div className="detail-row">
                            <strong>Staff ID:</strong> {labTechProfile.staffId || 'N/A'}
                        </div>
                        <div className="detail-row">
                            <strong>Department:</strong> {labTechProfile.department || 'N/A'}
                        </div>
                    </div>
                </div>

                <div className="staff-tabs">
                    <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}>
                        📊 Overview
                    </button>
                    <button className={`tab-btn ${activeTab === 'test-orders' ? 'active' : ''}`}
                            onClick={() => setActiveTab('test-orders')}>
                        📋 Test Orders
                    </button>
                    <button className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
                            onClick={() => setActiveTab('results')}>
                        📊 Results
                    </button>
                </div>

                <div className="staff-content">
                    {activeTab === 'overview' && renderOverview()}
                    {activeTab === 'test-orders' && renderTestOrders()}
                    {activeTab === 'results' && renderResults()}
                </div>
            </div>
        </div>
    );
};

export default LabTechnicianDashboard;