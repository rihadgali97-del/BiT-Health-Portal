import React from 'react';

const MedicalNotesModal = ({
                               showMedicalNotesModal,
                               setShowMedicalNotesModal,
                               medicalNoteData,
                               handleMedicalNoteChange,
                               handleMedicalNotesSubmit
                           }) => {
    if (!showMedicalNotesModal) return null;

    return (
        <div className="modal-overlay">
            <div className="modal large-modal">
                <div className="modal-header">
                    <h3>Medical Notes</h3>
                    <button
                        onClick={() => setShowMedicalNotesModal(false)}
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
                                value={medicalNoteData.patientName}
                                onChange={(e) => handleMedicalNoteChange('patientName', e.target.value)}
                                placeholder="Enter patient name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Patient ID *</label>
                            <input
                                type="text"
                                value={medicalNoteData.patientId}
                                onChange={(e) => handleMedicalNoteChange('patientId', e.target.value)}
                                placeholder="Enter patient ID"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Symptoms & Complaints</label>
                        <textarea
                            value={medicalNoteData.symptoms}
                            onChange={(e) => handleMedicalNoteChange('symptoms', e.target.value)}
                            placeholder="Patient's reported symptoms and complaints..."
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label>Diagnosis *</label>
                        <textarea
                            value={medicalNoteData.diagnosis}
                            onChange={(e) => handleMedicalNoteChange('diagnosis', e.target.value)}
                            placeholder="Medical diagnosis..."
                            rows="2"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Treatment Plan</label>
                        <textarea
                            value={medicalNoteData.treatment}
                            onChange={(e) => handleMedicalNoteChange('treatment', e.target.value)}
                            placeholder="Prescribed treatment and recommendations..."
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label>Additional Notes</label>
                        <textarea
                            value={medicalNoteData.notes}
                            onChange={(e) => handleMedicalNoteChange('notes', e.target.value)}
                            placeholder="Any additional observations or notes..."
                            rows="2"
                        />
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="date"
                            value={medicalNoteData.date}
                            onChange={(e) => handleMedicalNoteChange('date', e.target.value)}
                        />
                    </div>
                </div>
                <div className="modal-actions">
                    <button
                        onClick={() => setShowMedicalNotesModal(false)}
                        className="btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleMedicalNotesSubmit}
                        className="btn-primary"
                    >
                        Save Medical Notes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MedicalNotesModal;