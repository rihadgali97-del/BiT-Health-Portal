import React, { useState } from 'react';
import '../../styles/StaffDashboard.css';

const PharmacistDashboard = ({ user, onLogout, navigateTo }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [newStock, setNewStock] = useState('');

    // Pharmacist profile
    const pharmacistProfile = user ? {
        name: user.fullName,
        staffId: user.staffId,
        email: user.email,
        department: user.department
    } : {};

    // Sample data
    const [prescriptions, setPrescriptions] = useState([
        {
            id: 1,
            patientName: 'John Smith',
            patientId: 'STU2024001',
            doctorName: 'Dr. Sarah Johnson',
            medication: 'Amoxicillin 500mg',
            dosage: '1 tablet every 8 hours',
            duration: '7 days',
            status: 'pending',
            date: '2024-02-15'
        },
        {
            id: 2,
            patientName: 'Emily Chen',
            patientId: 'STU2024002',
            doctorName: 'Dr. Michael Brown',
            medication: 'Ibuprofen 400mg',
            dosage: '1 tablet as needed',
            duration: '5 days',
            status: 'dispensed',
            date: '2024-02-14'
        }
    ]);

    const [inventory, setInventory] = useState([
        { id: 1, name: 'Amoxicillin 500mg', stock: 45, threshold: 10 },
        { id: 2, name: 'Ibuprofen 400mg', stock: 23, threshold: 5 },
        { id: 3, name: 'Paracetamol 500mg', stock: 67, threshold: 15 },
        { id: 4, name: 'Vitamin C 1000mg', stock: 8, threshold: 10 }
    ]);

    // Stats
    const stats = {
        totalPrescriptions: prescriptions.length,
        pendingDispensing: prescriptions.filter(p => p.status === 'pending').length,
        lowStock: inventory.filter(item => item.stock <= item.threshold).length,
        totalMedications: inventory.length
    };

    const handleDispense = (prescriptionId) => {
        setPrescriptions(prev =>
            prev.map(p => p.id === prescriptionId ? { ...p, status: 'dispensed' } : p)
        );
    };

    const handleOpenUpdateModal = (medication) => {
        setSelectedMedication(medication);
        setNewStock(medication.stock.toString());
        setShowUpdateModal(true);
    };

    const handleUpdateStock = () => {
        if (!newStock || isNaN(newStock) || parseInt(newStock) < 0) {
            alert('Please enter a valid stock quantity');
            return;
        }

        setInventory(prev =>
            prev.map(item =>
                item.id === selectedMedication.id
                    ? { ...item, stock: parseInt(newStock) }
                    : item
            )
        );

        setShowUpdateModal(false);
        alert(`Stock updated for ${selectedMedication.name}`);
    };

    const handleReorder = (medication) => {
        const reorderQuantity = medication.threshold * 3;

        setInventory(prev =>
            prev.map(item =>
                item.id === medication.id
                    ? { ...item, stock: item.stock + reorderQuantity }
                    : item
            )
        );

        alert(`Reorder placed for ${medication.name}. ${reorderQuantity} units will be added.`);
    };

    const handleBackToHome = () => {
        navigateTo('home');
    };

    const renderOverview = () => (
        <div>
            <div className="staff-stats">
                <div className="stat-card">
                    <div className="stat-icon">💊</div>
                    <div className="stat-content">
                        <h3>{stats.totalPrescriptions}</h3>
                        <p>Total Prescriptions</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-content">
                        <h3>{stats.pendingDispensing}</h3>
                        <p>Pending Dispensing</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📦</div>
                    <div className="stat-content">
                        <h3>{stats.lowStock}</h3>
                        <p>Low Stock Items</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📋</div>
                    <div className="stat-content">
                        <h3>{stats.totalMedications}</h3>
                        <p>Medications</p>
                    </div>
                </div>
            </div>

            <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                    <div className="action-card" onClick={() => setActiveTab('prescriptions')}>
                        <h4>📝 Prescriptions</h4>
                        <p>Manage medication orders</p>
                    </div>
                    <div className="action-card" onClick={() => setActiveTab('inventory')}>
                        <h4>📦 Inventory</h4>
                        <p>Medication stock management</p>
                    </div>
                    <div className="action-card">
                        <h4>🧪 Drug Interactions</h4>
                        <p>Check medication safety</p>
                    </div>
                    <div className="action-card">
                        <h4>📊 Reports</h4>
                        <p>Pharmacy analytics</p>
                    </div>
                </div>
            </div>

            <div className="pending-prescriptions">
                <h3>Pending Prescriptions</h3>
                <div className="prescriptions-list">
                    {prescriptions.filter(p => p.status === 'pending').map(prescription => (
                        <div key={prescription.id} className="prescription-item">
                            <div className="prescription-info">
                                <h4>{prescription.patientName}</h4>
                                <p>{prescription.medication}</p>
                                <span className="doctor">Dr. {prescription.doctorName}</span>
                            </div>
                            <button
                                onClick={() => handleDispense(prescription.id)}
                                className="btn-primary small"
                            >
                                Dispense
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderPrescriptions = () => (
        <div>
            <div className="page-header">
                <button onClick={() => setActiveTab('overview')} className="btn-secondary">
                    ← Back to Overview
                </button>
                <h3>Prescription Management</h3>
            </div>

            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search prescriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="prescriptions-table">
                <div className="table-header">
                    <span>Patient</span>
                    <span>Medication</span>
                    <span>Doctor</span>
                    <span>Status</span>
                    <span>Actions</span>
                </div>
                {prescriptions.map(prescription => (
                    <div key={prescription.id} className="table-row">
                        <div className="patient-info">
                            <strong>{prescription.patientName}</strong>
                            <span>ID: {prescription.patientId}</span>
                        </div>
                        <div className="medication-info">
                            <strong>{prescription.medication}</strong>
                            <span>{prescription.dosage}</span>
                        </div>
                        <span>{prescription.doctorName}</span>
                        <span className={`status-badge ${prescription.status === 'dispensed' ? 'status-completed' : 'status-pending'}`}>
                            {prescription.status}
                        </span>
                        <div className="actions">
                            {prescription.status === 'pending' && (
                                <button
                                    onClick={() => handleDispense(prescription.id)}
                                    className="btn-primary small"
                                >
                                    Dispense
                                </button>
                            )}
                            <button className="btn-outline small">Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderInventory = () => (
        <div>
            <div className="page-header">
                <button onClick={() => setActiveTab('overview')} className="btn-secondary">
                    ← Back to Overview
                </button>
                <h3>Medication Inventory</h3>
            </div>

            <div className="inventory-table">
                <div className="table-header">
                    <span>Medication</span>
                    <span>Current Stock</span>
                    <span>Threshold</span>
                    <span>Status</span>
                    <span>Actions</span>
                </div>
                {inventory.map(item => (
                    <div key={item.id} className="table-row">
                        <div className="medication-info">
                            <strong>{item.name}</strong>
                        </div>
                        <div className="stock-info">
                            <span className={`stock-number ${item.stock <= item.threshold ? 'low-stock' : 'adequate-stock'}`}>
                                {item.stock} units
                            </span>
                        </div>
                        <span>{item.threshold} units</span>
                        <span className={`status-badge ${item.stock <= item.threshold ? 'status-critical' : 'status-stable'}`}>
                            {item.stock <= item.threshold ? 'Low Stock' : 'Adequate'}
                        </span>
                        <div className="actions">
                            <button
                                onClick={() => handleOpenUpdateModal(item)}
                                className="btn-outline small"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleReorder(item)}
                                className="btn-primary small"
                            >
                                Reorder
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Low Stock Alert Section */}
            {inventory.filter(item => item.stock <= item.threshold).length > 0 && (
                <div className="low-stock-alert">
                    <h4>🚨 Low Stock Alerts</h4>
                    <div className="alert-list">
                        {inventory.filter(item => item.stock <= item.threshold).map(item => (
                            <div key={item.id} className="alert-item">
                                <span className="alert-medication">{item.name}</span>
                                <span className="alert-stock">Only {item.stock} units left</span>
                                <button
                                    onClick={() => handleReorder(item)}
                                    className="btn-primary small"
                                >
                                    Reorder Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Update Stock Modal */}
            {showUpdateModal && selectedMedication && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Update Stock - {selectedMedication.name}</h3>
                            <button
                                onClick={() => setShowUpdateModal(false)}
                                className="close-btn"
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Current Stock: {selectedMedication.stock} units</label>
                                <input
                                    type="number"
                                    value={newStock}
                                    onChange={(e) => setNewStock(e.target.value)}
                                    placeholder="Enter new stock quantity"
                                    min="0"
                                    required
                                />
                                <small>Threshold: {selectedMedication.threshold} units</small>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button
                                onClick={() => setShowUpdateModal(false)}
                                className="btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateStock}
                                className="btn-primary"
                            >
                                Update Stock
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="staff-dashboard-container">
            <div className="staff-dashboard-content">
                <div className="staff-header">
                    <div className="staff-info">
                        <div className="staff-avatar">🧪</div>
                        <div>
                            <h1>Pharmacist Dashboard</h1>
                            <p>Welcome back, {pharmacistProfile.name || 'Pharmacist'}</p>
                            <span className="staff-role">Licensed Pharmacist</span>
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
                            <strong>Staff ID:</strong> {pharmacistProfile.staffId || 'N/A'}
                        </div>
                        <div className="detail-row">
                            <strong>Department:</strong> {pharmacistProfile.department || 'N/A'}
                        </div>
                    </div>
                </div>

                <div className="staff-tabs">
                    <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}>
                        📊 Overview
                    </button>
                    <button className={`tab-btn ${activeTab === 'prescriptions' ? 'active' : ''}`}
                            onClick={() => setActiveTab('prescriptions')}>
                        📝 Prescriptions
                    </button>
                    <button className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
                            onClick={() => setActiveTab('inventory')}>
                        📦 Inventory
                    </button>
                </div>

                <div className="staff-content">
                    {activeTab === 'overview' && renderOverview()}
                    {activeTab === 'prescriptions' && renderPrescriptions()}
                    {activeTab === 'inventory' && renderInventory()}
                </div>
            </div>
        </div>
    );
};

export default PharmacistDashboard;