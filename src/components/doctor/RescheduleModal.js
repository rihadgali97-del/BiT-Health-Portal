import React from 'react';

const RescheduleModal = ({
                             showRescheduleModal,
                             setShowRescheduleModal,
                             selectedAppointment,
                             newAppointmentDate,
                             setNewAppointmentDate,
                             newAppointmentTime,
                             setNewAppointmentTime,
                             availableTimeSlots,
                             handleReschedule
                         }) => {
    if (!showRescheduleModal || !selectedAppointment) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>Reschedule Appointment</h3>
                    <button
                        onClick={() => setShowRescheduleModal(false)}
                        className="close-btn"
                    >
                        ×
                    </button>
                </div>
                <div className="modal-body">
                    <p><strong>Patient:</strong> {selectedAppointment.patientName}</p>
                    <p><strong>Current:</strong> {selectedAppointment.date} at {selectedAppointment.time}</p>

                    <div className="form-group">
                        <label>New Date *</label>
                        <input
                            type="date"
                            value={newAppointmentDate}
                            onChange={(e) => setNewAppointmentDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>New Time *</label>
                        <select
                            value={newAppointmentTime}
                            onChange={(e) => setNewAppointmentTime(e.target.value)}
                            required
                        >
                            <option value="">Select Time</option>
                            {availableTimeSlots.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="modal-actions">
                    <button
                        onClick={() => setShowRescheduleModal(false)}
                        className="btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleReschedule}
                        className="btn-primary"
                    >
                        Confirm Reschedule
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RescheduleModal;