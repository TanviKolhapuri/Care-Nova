import { useState, useEffect } from 'react'
import type { User, Doctor, Appointment } from '@/types/dashboard'
import { MOCK_PATIENTS, MOCK_DOCTORS, MOCK_APPOINTMENTS } from '@/constants/dashboard'

export function useDashboardData() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [patients, setPatients] = useState<User[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load user from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Load mock data - replace with actual API calls
    setAppointments(MOCK_APPOINTMENTS)
    setDoctors(MOCK_DOCTORS)
    setPatients(MOCK_PATIENTS)
  }, [])

  const updateAppointmentStatus = (appointmentId: string, status: 'approved' | 'rejected' | 'completed') => {
    setAppointments(prev => 
      prev.map(apt => 
        apt._id === appointmentId ? { ...apt, status } : apt
      )
    )
  }

  const addDoctor = (doctorData: Partial<Doctor>) => {
    // Implementation for adding doctor
    console.log('Adding doctor:', doctorData)
  }

  const updateDoctor = (doctorId: string, doctorData: Partial<Doctor>) => {
    // Implementation for updating doctor
    console.log('Updating doctor:', doctorId, doctorData)
  }

  const createAppointment = (appointmentData: Partial<Appointment>) => {
    // Implementation for creating appointment
    console.log('Creating appointment:', appointmentData)
  }

  return {
    appointments,
    doctors,
    patients,
    user,
    loading,
    updateAppointmentStatus,
    addDoctor,
    updateDoctor,
    createAppointment
  }
}
