import React, { useState } from "react";

const BookAppointment = () => {
    const [studentId, setStudentId] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [reason, setReason] = useState("");
    const [message, setMessage] = useState("");

    const handleBooking = async (e) => {
        e.preventDefault();

        // Validate
        if (!studentId || !doctorId || !appointmentDate || !reason) {
            setMessage("All fields are required!");
            return;
        }

        const appointmentData = {
            studentId: Number(studentId),
            doctorId: Number(doctorId),
            appointmentDate,
            reason,
        };

        try {
            const response = await fetch("http://localhost:8080/api/appointments/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(appointmentData),
            });

            if (!response.ok) {
                const err = await response.text();
                throw new Error(err || "Failed to book appointment");
            }

            const data = await response.json();
            console.log("Appointment booked:", data);
            setMessage("Appointment booked successfully!");
        } catch (error) {
            console.error(error);
            setMessage("Error booking appointment: " + error.message);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px" }}>
            <h2>Book an Appointment</h2>
            <form onSubmit={handleBooking}>
                <label>
                    Student ID:
                    <input type="number" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
                </label>
                <br />
                <label>
                    Doctor ID:
                    <input type="number" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required />
                </label>
                <br />
                <label>
                    Appointment Date:
                    <input type="datetime-local" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
                </label>
                <br />
                <label>
                    Reason:
                    <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Book Appointment</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default BookAppointment;
