// sampleData.js

// --- Student Profile Data (Used as fallback/example) ---
export const studentProfileData = {
    name: 'Jane Doe',
    studentId: 'STU2024002',
    email: 'jane.doe@university.edu',
    phone: '(555) 111-2222',
    department: 'Biology',
    year: '4th Year',
    age: '22',
    sex: 'Female',
    bloodGroup: 'A-',
    allergies: 'Penicillin',
    emergencyContact: '(555) 333-4444'
};

// --- Appointments Data ---
export const appointmentsData = [
    {
        id: 1,
        doctorName: 'Dr. Sarah Johnson',
        date: '2024-02-15',
        time: '10:00 AM',
        status: 'scheduled',
        type: 'Regular Checkup',
        reason: 'Annual physical examination',
        location: 'Health Center - Room 101'
    },
    {
        id: 2,
        doctorName: 'Dr. Michael Chen',
        date: '2024-02-20',
        time: '2:30 PM',
        status: 'scheduled',
        type: 'Consultation',
        reason: 'Follow-up on lab results',
        location: 'Health Center - Room 203'
    },
    {
        id: 3,
        doctorName: 'Dr. Emily Wilson',
        date: '2024-02-10',
        time: '11:00 AM',
        status: 'completed',
        type: 'Vaccination',
        reason: 'Flu shot administration',
        location: 'Health Center - Room 105'
    }
];

// --- Health Records Data ---
export const healthRecordsData = [
    {
        id: 1,
        date: '2024-02-10',
        doctor: 'Dr. Emily Wilson',
        diagnosis: 'Routine Vaccination',
        prescription: 'Flu Vaccine',
        notes: 'No adverse reactions observed'
    },
    {
        id: 2,
        date: '2024-01-15',
        doctor: 'Dr. Sarah Johnson',
        diagnosis: 'Annual Checkup - Normal',
        prescription: 'None',
        notes: 'All vitals within normal range'
    },
    {
        id: 3,
        date: '2023-12-05',
        doctor: 'Dr. Michael Chen',
        diagnosis: 'Upper Respiratory Infection',
        prescription: 'Antibiotics, Rest',
        notes: 'Follow up if symptoms persist'
    }
];

// --- Available Doctors Data ---
export const availableDoctorsData = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'General Physician', availableSlots: ['09:00 AM', '10:00 AM', '11:00 AM'] },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Internal Medicine', availableSlots: ['02:00 PM', '03:00 PM', '04:00 PM'] },
    { id: 3, name: 'Dr. Emily Wilson', specialty: 'Pediatrics', availableSlots: ['09:30 AM', '10:30 AM', '11:30 AM'] }
];

// --- Available Time Slots Data ---
export const availableTimeSlotsData = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM'
];