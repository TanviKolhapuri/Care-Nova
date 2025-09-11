import type { User, Doctor, Appointment } from '@/types/dashboard'

export const MOCK_PATIENTS: User[] = [
  { _id: "p1", name: "John Doe", email: "john@example.com", role: "patient", createdAt: "2024-01-15" },
  { _id: "p2", name: "Jane Smith", email: "jane@example.com", role: "patient", createdAt: "2024-01-10" },
  { _id: "p3", name: "Robert Johnson", email: "robert@example.com", role: "patient", createdAt: "2024-01-12" }
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
    specialization: "Pediatrics",
    qualifications: "MD, FAAP",
    experience: 8,
    department: "Pediatrics",
    availability: [
      { day: "Tuesday", startTime: "08:00 AM", endTime: "04:00 PM" },
      { day: "Thursday", startTime: "08:00 AM", endTime: "04:00 PM" }
    ],
    phone: "+1-555-0102",
    consultationFee: 150
  }
]

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    _id: "1",
    patientId: MOCK_PATIENTS[0],
    doctorId: MOCK_DOCTORS[0],
    date: "2024-01-20",
    timeSlot: "10:00 AM",
    reason: "Regular checkup",
    status: "pending",
    createdAt: "2024-01-15"
  },
  {
    _id: "2",
    patientId: MOCK_PATIENTS[1],
    doctorId: MOCK_DOCTORS[1],
    date: "2024-01-21",
    timeSlot: "02:00 PM",
    reason: "Child vaccination",
    status: "approved",
    createdAt: "2024-01-10"
  }
]

export const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", 
  "02:00 PM", "03:00 PM", "04:00 PM"
]

export const APPOINTMENT_STATUS_VARIANTS: Record<
  "pending" | "approved" | "rejected" | "completed",
  string
> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};
