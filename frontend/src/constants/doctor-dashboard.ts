import type { User, Doctor, Patient, Appointment, MedicalRecord } from '@/types/doctor-dashboard'

export const MOCK_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    _id: "mr1",
    condition: "Hypertension",
    symptoms: "High blood pressure, headaches",
    currentMedications: ["Lisinopril 10mg", "Amlodipine 5mg"],
    notes: "Patient responds well to ACE inhibitors",
    allergies: ["Penicillin"]
  },
  {
    _id: "mr2",
    condition: "Type 2 Diabetes",
    symptoms: "Increased thirst, frequent urination",
    currentMedications: ["Metformin 500mg"],
    notes: "Good glucose control with current medication",
    allergies: ["Sulfa drugs"]
  }
]

export const MOCK_PATIENTS: Patient[] = [
  {
    _id: "p1",
    userId: { _id: "u1", name: "John Doe", email: "john@example.com", role: "patient", createdAt: "2024-01-15" },
    dob: "1985-05-15",
    gender: "Male",
    phone: "+1-555-0123",
    address: "123 Main St, City, State 12345",
    emergencyContact: {
      name: "Jane Doe",
      phone: "+1-555-0124",
      relationship: "Spouse"
    },
    insuranceInfo: {
      provider: "Blue Cross Blue Shield",
      policyNumber: "BC123456789"
    },
    esiInfo: {
      esiNumber: "ESI987654321"
    },
    medicalHistory: [
      { medicalRecord: MOCK_MEDICAL_RECORDS[0] }
    ]
  },
  {
    _id: "p2",
    userId: { _id: "u2", name: "Jane Smith", email: "jane@example.com", role: "patient", createdAt: "2024-01-10" },
    dob: "1990-08-22",
    gender: "Female",
    phone: "+1-555-0125",
    address: "456 Oak Ave, City, State 12345",
    emergencyContact: {
      name: "Robert Smith",
      phone: "+1-555-0126",
      relationship: "Father"
    },
    insuranceInfo: {
      provider: "Aetna",
      policyNumber: "AET987654321"
    },
    esiInfo: {
      esiNumber: "ESI123456789"
    },
    medicalHistory: [
      { medicalRecord: MOCK_MEDICAL_RECORDS[1] }
    ]
  }
]

export const MOCK_DOCTOR: Doctor = {
  _id: "d1",
  userId: { _id: "u3", name: "Dr. Sarah Wilson", email: "sarah@carenova.com", role: "doctor", createdAt: "2024-01-01" },
  specialization: "Cardiology",
  qualifications: "MD, FACC",
  experience: 10,
  department: "Cardiology",
  availability: [
    { day: "Monday", startTime: "09:00 AM", endTime: "05:00 PM" },
    { day: "Wednesday", startTime: "09:00 AM", endTime: "05:00 PM" },
    { day: "Friday", startTime: "09:00 AM", endTime: "01:00 PM" }
  ],
  phone: "+1-555-0101",
  consultationFee: 200
}

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    _id: "a1",
    patientId: MOCK_PATIENTS[0],
    doctorId: MOCK_DOCTOR,
    date: "2024-01-20",
    timeSlot: "10:00 AM",
    reason: "Regular checkup",
    status: "approved",
    createdAt: "2024-01-15"
  },
  {
    _id: "a2",
    patientId: MOCK_PATIENTS[1],
    doctorId: MOCK_DOCTOR,
    date: "2024-01-21",
    timeSlot: "02:00 PM",
    reason: "Follow-up consultation",
    status: "completed",
    createdAt: "2024-01-10"
  },
  {
    _id: "a3",
    patientId: MOCK_PATIENTS[0],
    doctorId: MOCK_DOCTOR,
    date: "2024-01-22",
    timeSlot: "11:00 AM",
    reason: "Blood pressure monitoring",
    status: "pending",
    createdAt: "2024-01-18"
  }
]

export const DAYS_OF_WEEK = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
]

export const TIME_SLOTS = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
]

export const APPOINTMENT_STATUS_VARIANTS = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800"
}
