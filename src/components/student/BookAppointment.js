import React, { useState } from 'react';

// API Function (Keep this function logic outside the component or in a separate API utility file)
// Note: This logic is integrated directly here for simplicity, but a separate file is cleaner.
async function bookAppointment(appointmentData) {
    const API_BASE_URL = 'http://localhost:8080/api/appointments/book';
    
    // Format the date for Java's LocalDateTime: YYYY-MM-DDTHH:mm:ss
    const formattedDate = appointmentData.appointmentDate.toISOString().slice(0, 19);

    const payload = {
        // Assuming studentId is provided via props or context (see note below)
        studentId: appointmentData.studentId, 
        doctorId: appointmentData.doctorId,
        appointmentDate: formattedDate,
        reason: appointmentData.reason,
    };

    console.log("Sending appointment request:", payload);

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        const bookedAppointment = await response.json();
        return bookedAppointment;

    } catch (error) {
        console.error('Failed to book appointment:', error.message);
        throw error;
    }
}

const BookAppointment = ({
    availableDoctors,
    // Assume studentId is passed via props or fetched from context
    currentStudentId, 
    handleBackToDashboard,
    // handleOpenBooking is no longer needed as we directly handle booking here
}) => {
    
    // 1. State for Form Data
    const [formData, setFormData] = useState({
        // Use a Date object internally for easier manipulation
        appointmentDate: new Date(), 
        reason: '',
        doctorId: null,
    });
    
    // 2. State for UI Feedback
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);


    // --- Handlers ---

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleDoctorSelect = (doctorId) => {
        setSelectedDoctorId(doctorId);
        setFormData(prev => ({ ...prev, doctorId }));
        setError(null); // Clear error on new selection
    };

    const handleDateChange = (e) => {
        // Converts date and time string inputs into a single Date object
        const dateTimeString = e.target.value; 
        setFormData(prev => ({ ...prev, appointmentDate: new Date(dateTimeString) }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!currentStudentId) {
            setError("Error: Student ID is missing. Cannot book appointment.");
            return;
        }
        if (!formData.doctorId) {
            setError("Please select a doctor.");
            return;
        }
        if (!formData.reason.trim()) {
            setError("Please provide a reason for the appointment.");
            return;
        }

        setLoading(true);

        // Prepare data for the API call
        const requestData = {
            ...formData,
            studentId: currentStudentId,
        };

        try {
            const result = await bookAppointment(requestData);
            setSuccessMessage(`Appointment successfully booked with ID: ${result.id} for ${result.appointmentDate}`);
            
            // Optionally clear the form or go back to dashboard
            setFormData({ appointmentDate: new Date(), reason: '', doctorId: null });
            setSelectedDoctorId(null);

        } catch (err) {
            setError(`Booking failed: ${err.message}. Please try again.`);
        } finally {
            setLoading(false);
        }
    };


    // --- Render Logic ---

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
                
                {/* Available Doctors List */}
                <div className="doctors-list-container">
                    <h4>1. Select a Doctor</h4>
                    <div className="doctors-list">
                        {availableDoctors.length === 0 && (
                            <p className="no-data">No doctors available at the moment</p>
                        )}
                        {availableDoctors.map(doctor => (
                            <div 
                                key={doctor.id} 
                                className={`doctor-card ${selectedDoctorId === doctor.id ? 'selected' : ''}`}
                                onClick={() => handleDoctorSelect(doctor.id)}
                            >
                                <div className="doctor-info">
                                    <h5>{doctor.fullName || doctor.name}</h5>
                                    <p>{doctor.specialty}</p>
                                </div>
                                {/* Assuming 'schedule' or similar holds available slots */}
                                <div className="available-slots">
                                    <strong>Consultation Fee:</strong> ${doctor.consultationFee || 'N/A'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Booking Form */}
                <div className="booking-form-container">
                    <h4>2. Fill Details & Confirm</h4>
                    
                    <form onSubmit={handleSubmit} className="form-group-flex">
                        
                        {/* Selected Doctor Display */}
                        {selectedDoctorId && (
                            <p className="selected-doctor-display">
                                Selected Doctor: <strong>
                                    {availableDoctors.find(d => d.id === selectedDoctorId)?.fullName || 'N/A'}
                                </strong>
                            </p>
                        )}
                        
                        {/* Date/Time Input */}
                        <label>
                            Appointment Date & Time:
                            {/* Use local-datetime for combined input */}
                            <input
                                type="datetime-local"
                                name="appointmentDate"
                                required
                                // Convert Date object to string format for input value
                                value={new Date(formData.appointmentDate.getTime() - (formData.appointmentDate.getTimezoneOffset() * 60000)).toISOString().slice(0, 16)}
                                onChange={handleDateChange}
                            />
                        </label>

                        {/* Reason Input */}
                        <label>
                            Reason for Visit:
                            <textarea
                                name="reason"
                                rows="3"
                                required
                                value={formData.reason}
                                onChange={handleInputChange}
                            ></textarea>
                        </label>

                        {/* Feedback Messages */}
                        {error && <p className="error-message">{error}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}

                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={loading || !selectedDoctorId}
                        >
                            {loading ? 'Booking...' : '✅ Confirm Appointment'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;