export interface User {
  _id: string
  name: string
  email: string
  role: string
  createdAt: string
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

export interface Appointment {
  _id: string
  patientName?: string
  patientId: User
  doctorId: Doctor
  date: string
  timeSlot: string
  reason: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  createdAt: string
}

export interface Bill {
  _id: string
  patientId: string
  appointmentId: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  createdAt: string
}



const hello =9;