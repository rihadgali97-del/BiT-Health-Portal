// src/data/doctorSampleData.js

/**
 * 👩‍⚕️ Doctor Profile Data (Constant)
 */
export const DOCTOR_PROFILE = {
    name: 'Dr. Sarah Johnson',
    specialty: 'General Physician',
    email: 's.johnson@university.edu',
    phone: '(555) 123-4567',
    office: 'Health Center - Room 101',
    schedule: 'Mon-Fri: 9:00 AM - 5:00 PM'
};

/**
 * 📅 Initial Appointments Data (Used for useState initialization)
 */
export const INITIAL_APPOINTMENTS = [
    {
        id: 1,
        patientName: 'John Smith',
        patientId: 'STU2024001',
        date: '2024-02-15',
        time: '10:00 AM',
        status: 'scheduled',
        type: 'Regular Checkup',
        reason: 'Annual physical examination',
        age: 21,
        department: 'Computer Science'
    },
    {
        id: 2,
        patientName: 'Emily Chen',
        patientId: 'STU2024002',
        date: '2024-02-15',
        time: '11:30 AM',
        status: 'scheduled',
        type: 'Follow-up',
        reason: 'Cold and flu symptoms',
        age: 20,
        department: 'Engineering'
    },
    {
        id: 3,
        patientName: 'Michael Brown',
        patientId: 'STU2024003',
        date: '2024-02-14',
        time: '2:15 PM',
        status: 'completed',
        type: 'Consultation',
        reason: 'Sports injury assessment',
        age: 22,
        department: 'Business'
    },
    {
        id: 4,
        patientName: 'Sarah Wilson',
        patientId: 'STU2024004',
        date: '2024-02-14',
        time: '3:45 PM',
        status: 'completed',
        type: 'Vaccination',
        reason: 'Flu shot administration',
        age: 19,
        department: 'Arts'
    }
];

/**
 * 👥 Initial Patient Records Data (Used for useState initialization)
 */
export const INITIAL_PATIENT_RECORDS = [
    {
        id: 1,
        patientName: 'John Smith',
        patientId: 'STU2024001',
        lastVisit: '2024-01-15',
        condition: 'Healthy',
        nextAppointment: '2024-02-15',
        notes: 'Regular checkup - all vitals normal'
    },
    {
        id: 2,
        patientName: 'Emily Chen',
        patientId: 'STU2024002',
        lastVisit: '2024-02-10',
        condition: 'Upper respiratory infection',
        nextAppointment: '2024-02-15',
        notes: 'Prescribed antibiotics, follow-up scheduled'
    },
    {
        id: 3,
        patientName: 'Michael Brown',
        patientId: 'STU2024003',
        lastVisit: '2024-02-14',
        condition: 'Complex cardiac symptoms',
        nextAppointment: '2024-02-28',
        notes: 'Referred to cardiology for further evaluation'
    },
    {
        id: 4,
        patientName: 'Sarah Wilson',
        patientId: 'STU2024004',
        lastVisit: '2024-02-14',
        condition: 'Healthy',
        nextAppointment: '2024-11-20',
        notes: 'Flu shot administered, no adverse reactions'
    }
];

/**
 * ⏰ Available Time Slots for Rescheduling/Booking (Lookup)
 */
export const AVAILABLE_TIME_SLOTS = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM'
];

/**
 * 🧑‍🔬 Specialist Options for Referrals (Lookup)
 */
export const SPECIALIST_OPTIONS = [
    'Cardiologist',
    'Neurologist',
    'Orthopedic Surgeon',
    'Psychiatrist',
    'Dermatologist',
    'Endocrinologist',
    'Gastroenterologist',
    'Oncologist',
    'Rheumatologist',
    'Pulmonologist'
];