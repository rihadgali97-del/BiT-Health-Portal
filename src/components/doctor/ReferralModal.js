import React from 'react';

const ReferralModal = ({
                           showReferralModal,
                           setShowReferralModal,
                           selectedPatient,
                           referralData,
                           setReferralData,
                           specialistOptions,
                           handleWriteReferral
                       }) => {
    if (!showReferralModal || !selectedPatient) return null;

    const handleInputChange = (field, value) => {
        setReferralData({
            ...referralData,
            [field]: value
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>Write Medical Referral</h3>
                    <button
                        onClick={() => setShowReferralModal(false)}
                        className="close-btn"
                    >
                        ×
                    </button>
                </div>
                <div className="modal-body">
                    <div className="patient-info-section">
                        <p><strong>Patient:</strong> {selectedPatient.patientName}</p>
                        <p><strong>Patient ID:</strong> {selectedPatient.patientId}</p>
                        <p><strong>Current Condition:</strong> {selectedPatient.condition}</p>
                        <p><strong>Last Visit:</strong> {selectedPatient.lastVisit}</p>
                    </div>

                    <div className="form-group">
                        <label>Referral Reason *</label>
                        <textarea
                            value={referralData.reason}
                            onChange={(e) => handleInputChange('reason', e.target.value)}
                            placeholder="Describe the medical condition and why referral is needed..."
                            rows="3"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Specialist Type *</label>
                        <select
                            value={referralData.specialist}
                            onChange={(e) => handleInputChange('specialist', e.target.value)}
                            required
                        >
                            <option value="">Select Specialist</option>
                            {specialistOptions.map(specialist => (
                                <option key={specialist} value={specialist}>{specialist}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Urgency Level *</label>
                        <select
                            value={referralData.urgency}
                            onChange={(e) => handleInputChange('urgency', e.target.value)}
                            required
                        >
                            <option value="routine">Routine (Within 2-4 weeks)</option>
                            <option value="urgent">Urgent (Within 1 week)</option>
                            <option value="emergency">Emergency (Within 24-48 hours)</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Relevant Medical History</label>
                        <textarea
                            value={referralData.medicalHistory}
                            onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                            placeholder="Any relevant medical history, current medications, or test results..."
                            rows="2"
                        />
                    </div>

                    <div className="form-group">
                        <label>Specific Questions for Specialist</label>
                        <textarea
                            value={referralData.questions}
                            onChange={(e) => handleInputChange('questions', e.target.value)}
                            placeholder="Specific questions or concerns you'd like the specialist to address..."
                            rows="2"
                        />
                    </div>

                    <div className="form-group">
                        <label>Additional Notes</label>
                        <textarea
                            value={referralData.notes}
                            onChange={(e) => handleInputChange('notes', e.target.value)}
                            placeholder="Any additional information for the specialist..."
                            rows="2"
                        />
                    </div>

                    <div className="referral-summary">
                        <h4>Referral Summary</h4>
                        <div className="summary-details">
                            <p><strong>Patient:</strong> {selectedPatient.patientName}</p>
                            <p><strong>Referred to:</strong> {referralData.specialist || 'Not selected'}</p>
                            <p><strong>Urgency:</strong> {referralData.urgency || 'Not specified'}</p>
                        </div>
                    </div>
                </div>
                <div className="modal-actions">
                    <button
                        onClick={() => setShowReferralModal(false)}
                        className="btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleWriteReferral}
                        className="btn-referral"
                        disabled={!referralData.reason || !referralData.specialist || !referralData.urgency}
                    >
                        Create Referral
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReferralModal;