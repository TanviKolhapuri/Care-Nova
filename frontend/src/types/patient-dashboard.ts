export interface User {
  _id: string
  name: string
  email: string
  role: string
  createdAt: string
}

export interface MedicalRecord {
  _id: string
  condition: string
  symptoms: string
  currentMedications: string[]
  notes: string
  allergies: string[]
}

export interface Doctor {
  _id: string
  userId: User
  specialization: string
  qualifications: string
  experience: number
  department: string
  availability: Array<{
    day: string
    startTime: string
    endTime: string
  }>
  phone: string
  consultationFee: number
}

export interface Patient {
  _id: string
  userId: User
  dob: string
  gender: 'Male' | 'Female' | 'Other'
  phone: string
  address: string
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  insuranceInfo: {
    provider: string
    policyNumber: string
  }
  esiInfo: {
    esiNumber: string
  }
  medicalHistory: Array<{
    medicalRecord: MedicalRecord
  }>
}

export interface Appointment {
  _id: string
  patientId: string
  doctorId: Doctor
  date: string
  timeSlot: string
  reason: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  createdAt: string
}

export interface UpdatePatientData {
  dob?: string
  gender?: 'Male' | 'Female' | 'Other'
  phone?: string
  address?: string
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
  insuranceInfo?: {
    provider: string
    policyNumber: string
  }
  esiInfo?: {
    esiNumber: string
  }
}

export interface BookAppointmentData {
  doctorId: string
  date: string
  timeSlot: string
  reason: string
}

export interface AvailableSlot {
  date: string
  timeSlot: string
  available: boolean
}
