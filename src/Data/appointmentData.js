// src/store/appointmentData.js

export const appointments = [
    {
        id: 1,
        patientName: 'John Smith',
        doctorName: 'Dr. Sarah Johnson',
        date: '2025-12-16', // Updated to 2025 for better context
        time: '10:00 AM',
        type: 'Checkup',
        status: 'scheduled', // Pending Approval
        department: 'General Practice'
    },
    {
        id: 2,
        patientName: 'Emily Chen',
        doctorName: 'Dr. Michael Chen',
        date: '2025-12-16',
        time: '11:30 AM',
        type: 'Consultation',
        status: 'scheduled', // Pending Approval
        department: 'Cardiology'
    },
    {
        id: 3,
        patientName: 'David Lee',
        doctorName: 'Dr. Sarah Johnson',
        date: '2025-12-15',
        time: '02:00 PM',
        type: 'Follow-up',
        status: 'completed',
        department: 'General Practice'
    },
    {
        id: 4,
        patientName: 'Maria Rodriguez',
        doctorName: 'Dr. Emily Carter',
        date: '2025-12-14',
        time: '09:00 AM',
        type: 'Therapy',
        status: 'cancelled',
        department: 'Psychiatry'
    }
];