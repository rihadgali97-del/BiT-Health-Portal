import React from 'react';

const PrescriptionModal = ({
                               showPrescriptionModal,
                               setShowPrescriptionModal,
                               prescriptionData,
                               handlePrescriptionChange,
                               handlePrescriptionSubmit
                           }) => {
    if (!showPrescriptionModal) return null;

    return (
        <div className="modal-overlay">
            <div className="modal large-modal">
                <div className="modal-header">
                    <h3>Write Prescription</h3>
                    <button
                        onClick={() => setShowPrescriptionModal(false)}
                        className="close-btn"
                    >
                        ×
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Patient Name *</label>
                            <input
                                type="text"
                                value={prescriptionData.patientName}
                                onChange={(e) => handlePrescriptionChange('patientName', e.target.value)}
                                placeholder="Enter patient name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Patient ID *</label>
                            <input
                                type="text"
                                value={prescriptionData.patientId}
                                onChange={(e) => handlePrescriptionChange('patientId', e.target.value)}
                                placeholder="Enter patient ID"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Medication *</label>
                            <input
                                type="text"
                                value={prescriptionData.medication}
                                onChange={(e) => handlePrescriptionChange('medication', e.target.value)}
                                placeholder="Medication name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Dosage *</label>
                            <input
                                type="text"
                                value={prescriptionData.dosage}
                                onChange={(e) => handlePrescriptionChange('dosage', e.target.value)}
                                placeholder="e.g., 500mg"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Frequency *</label>
                            <input
                                type="text"
                                value={prescriptionData.frequency}
                                onChange={(e) => handlePrescriptionChange('frequency', e.target.value)}
                                placeholder="e.g., Twice daily"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Duration *</label>
                            <input
                                type="text"
                                value={prescriptionData.duration}
                                onChange={(e) => handlePrescriptionChange('duration', e.target.value)}
                                placeholder="e.g., 7 days"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Instructions</label>
                        <textarea
                            value={prescriptionData.instructions}
                            onChange={(e) => handlePrescriptionChange('instructions', e.target.value)}
                            placeholder="Additional instructions for the patient..."
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="date"
                            value={prescriptionData.date}
                            onChange={(e) => handlePrescriptionChange('date', e.target.value)}
                        />
                    </div>
                </div>
                <div className="modal-actions">
                    <button
                        onClick={() => setShowPrescriptionModal(false)}
                        className="btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handlePrescriptionSubmit}
                        className="btn-primary"
                    >
                        Save Prescription
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionModal;