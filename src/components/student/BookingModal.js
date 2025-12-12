import React from 'react';

const BookingModal = ({
                          showBookingModal,
                          setShowBookingModal,
                          bookingData,
                          setBookingData,
                          availableTimeSlots,
                          handleBookAppointment
                      }) => {
    if (!showBookingModal) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>Book New Appointment</h3>
                    <button
                        onClick={() => setShowBookingModal(false)}
                        className="close-btn"
                    >
                        ×
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Appointment Date *</label>
                        <input
                            type="date"
                            value={bookingData.date}
                            onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                            min={new Date().toISOString().split('T')[0]}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Preferred Time *</label>
                        <select
                            value={bookingData.time}
                            onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                            required
                        >
                            <option value="">Select Time</option>
                            {availableTimeSlots.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Appointment Type</label>
                        <select
                            value={bookingData.type}
                            onChange={(e) => setBookingData({...bookingData, type: e.target.value})}
                        >
                            <option value="general">General Consultation</option>
                            <option value="checkup">Regular Checkup</option>
                            <option value="followup">Follow-up</option>
                            <option value="emergency">Emergency</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Reason for Visit *</label>
                        <textarea
                            value={bookingData.reason}
                            onChange={(e) => setBookingData({...bookingData, reason: e.target.value})}
                            placeholder="Please describe your symptoms or reason for the appointment..."
                            rows="3"
                            required
                        />
                    </div>
                </div>
                <div className="modal-actions">
                    <button
                        onClick={() => setShowBookingModal(false)}
                        className="btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleBookAppointment}
                        className="btn-primary"
                    >
                        Book Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;