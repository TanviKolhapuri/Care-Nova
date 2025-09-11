import type { User, Doctor, Patient, Appointment, MedicalRecord } from '@/types/patient-dashboard'

export const MOCK_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    _id: "mr1",
    condition: "Hypertension",
    symptoms: "High blood pressure, occasional headaches",
    currentMedications: ["Lisinopril 10mg daily", "Amlodipine 5mg daily"],
    notes: "Patient responds well to ACE inhibitors. Blood pressure well controlled.",
    allergies: ["Penicillin", "Shellfish"]
  },
  {
    _id: "mr2",
    condition: "Type 2 Diabetes",
    symptoms: "Increased thirst, frequent urination, fatigue",
    currentMedications: ["Metformin 500mg twice daily", "Glipizide 5mg daily"],
    notes: "Good glucose control with current medication regimen. HbA1c: 6.8%",
    allergies: ["Sulfa drugs"]
  },
  {
    _id: "mr3",
    condition: "Seasonal Allergies",
    symptoms: "Sneezing, runny nose, itchy eyes during spring",
    currentMedications: ["Loratadine 10mg as needed"],
    notes: "Symptoms well controlled with antihistamines during allergy season.",
    allergies: ["Pollen", "Dust mites"]
  }
]

export const MOCK_DOCTORS: Doctor[] = [
  {
    _id: "d1",
    userId: { _id: "u1", name: "Dr. Sarah Wilson", email: "sarah@carenova.com", role: "doctor", createdAt: "2024-01-01" },
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
  },
  {
    _id: "d2",
    userId: { _id: "u2", name: "Dr. Michael Brown", email: "michael@carenova.com", role: "doctor", createdAt: "2024-01-01" },
    specialization: "Endocrinology",
    qualifications: "MD, FACE",
    experience: 8,
    department: "Endocrinology",
    availability: [
      { day: "Tuesday", startTime: "08:00 AM", endTime: "04:00 PM" },
      { day: "Thursday", startTime: "08:00 AM", endTime: "04:00 PM" }
    ],
    phone: "+1-555-0102",
    consultationFee: 180
  }
]

export const MOCK_PATIENT: Patient = {
  _id: "p1",
  userId: { _id: "u3", name: "John Doe", email: "john@example.com", role: "patient", createdAt: "2024-01-15" },
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
    { medicalRecord: MOCK_MEDICAL_RECORDS[0] },
    { medicalRecord: MOCK_MEDICAL_RECORDS[1] },
    { medicalRecord: MOCK_MEDICAL_RECORDS[2] }
  ]
}

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    _id: "a1",
    patientId: "p1",
    doctorId: MOCK_DOCTORS[0],
    date: "2024-01-25",
    timeSlot: "10:00 AM",
    reason: "Regular cardiology checkup",
    status: "approved",
    createdAt: "2024-01-15"
  },
  {
    _id: "a2",
    patientId: "p1",
    doctorId: MOCK_DOCTORS[1],
    date: "2024-01-20",
    timeSlot: "02:00 PM",
    reason: "Diabetes follow-up consultation",
    status: "completed",
    createdAt: "2024-01-10"
  },
  {
    _id: "a3",
    patientId: "p1",
    doctorId: MOCK_DOCTORS[0],
    date: "2024-01-30",
    timeSlot: "11:00 AM",
    reason: "Blood pressure monitoring",
    status: "pending",
    createdAt: "2024-01-18"
  },
  {
    _id: "a4",
    patientId: "p1",
    doctorId: MOCK_DOCTORS[1],
    date: "2024-01-15",
    timeSlot: "09:00 AM",
    reason: "HbA1c results review",
    status: "completed",
    createdAt: "2024-01-08"
  }
]

export const APPOINTMENT_STATUS_VARIANTS = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800"
}

export const GENDER_OPTIONS = ['Male', 'Female', 'Other'] as const

export const RELATIONSHIP_OPTIONS = [
  'Spouse', 'Parent', 'Child', 'Sibling', 'Friend', 'Other'
] as const

export const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
]

export const APPOINTMENT_REASONS = [
  "Regular checkup",
  "Follow-up consultation",
  "New symptoms",
  "Medication review",
  "Test results discussion",
  "Second opinion",
  "Emergency consultation",
  "Other"
]
