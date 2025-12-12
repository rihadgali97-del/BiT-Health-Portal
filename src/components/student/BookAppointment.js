import React from 'react';

const BookAppointment = ({
                             availableDoctors,
                             handleOpenBooking,
                             handleBackToDashboard
                         }) => {
    return (
        <div>
            <div className="page-header">
                <button
                    onClick={handleBackToDashboard}
                    className="btn-secondary"
                >
                    ← Back to Dashboard
                </button>
                <h3>Book New Appointment</h3>
            </div>

            <div className="booking-section">
                <div className="booking-card">
                    <h4>Available Doctors</h4>
                    <div className="doctors-list">
                        {availableDoctors.map(doctor => (
                            <div key={doctor.id} className="doctor-card">
                                <div className="doctor-info">
                                    <h5>{doctor.name}</h5>
                                    <p>{doctor.specialty}</p>
                                </div>
                                <div className="available-slots">
                                    <strong>Available Slots:</strong>
                                    {doctor.availableSlots?.map(slot => (
                                        <span key={slot} className="time-slot">{slot}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {availableDoctors.length === 0 && (
                            <p className="no-data">No doctors available at the moment</p>
                        )}
                    </div>

                    <div className="booking-form">
                        <h4>Book Appointment</h4>
                        <button
                            onClick={handleOpenBooking}
                            className="btn-primary"
                        >
                            📅 Book New Appointment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;