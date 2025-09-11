import { useState, useEffect } from 'react'
import type { User, Patient, Appointment, UpdatePatientData, BookAppointmentData } from '@/types/patient-dashboard'
import { MOCK_PATIENT, MOCK_APPOINTMENTS, MOCK_DOCTORS } from '@/constants/patient-dashboard'

export function usePatientDashboard() {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load user from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Load mock data - replace with actual API calls
    setPatient(MOCK_PATIENT)
    setAppointments(MOCK_APPOINTMENTS)
  }, [])

  const updatePatientProfile = async (patientData: UpdatePatientData) => {
    setLoading(true)
    try {
      // This would typically make an API call
      if (patient) {
        setPatient({ ...patient, ...patientData })
      }
      console.log('Updating patient profile:', patientData)
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Error updating patient profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const bookAppointment = async (appointmentData: BookAppointmentData) => {
    setLoading(true)
    try {
      // This would typically make an API call to book the appointment
      const newAppointment: Appointment = {
        _id: `a${Date.now()}`,
        patientId: patient?._id || '',
        doctorId: MOCK_DOCTORS.find(d => d._id === appointmentData.doctorId)!,
        date: appointmentData.date,
        timeSlot: appointmentData.timeSlot,
        reason: appointmentData.reason,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
      
      setAppointments(prev => [...prev, newAppointment])
      console.log('Booking appointment:', appointmentData)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { success: true, message: 'Appointment booked successfully!' }
    } catch (error) {
      console.error('Error booking appointment:', error)
      return { success: false, message: 'Failed to book appointment. Please try again.' }
    } finally {
      setLoading(false)
    }
  }

  const getUpcomingAppointments = () => {
    const today = new Date()
    return appointments.filter(apt => 
      new Date(apt.date) >= today && 
      (apt.status === 'approved' || apt.status === 'pending')
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  const getPastAppointments = () => {
    const today = new Date()
    return appointments.filter(apt => 
      new Date(apt.date) < today || apt.status === 'completed'
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const getAppointmentsByStatus = (status: string) => {
    return appointments.filter(apt => apt.status === status)
  }

  const getTotalAppointments = () => appointments.length

  const getCompletedAppointments = () => appointments.filter(apt => apt.status === 'completed')

  const getAvailableDoctors = () => {
    return MOCK_DOCTORS
  }

  return {
    patient,
    appointments,
    user,
    loading,
    updatePatientProfile,
    bookAppointment,
    getUpcomingAppointments,
    getPastAppointments,
    getAppointmentsByStatus,
    getTotalAppointments,
    getCompletedAppointments,
    getAvailableDoctors
  }
}
