import { useState, useEffect } from 'react'
import type { User, Doctor, Patient, Appointment, PatientReport, CreateMedicalRecordData } from '@/types/doctor-dashboard'
import { MOCK_DOCTOR, MOCK_PATIENTS, MOCK_APPOINTMENTS } from '@/constants/doctor-dashboard'

export function useDoctorDashboard() {
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load user from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Load mock data - replace with actual API calls
    setDoctor(MOCK_DOCTOR)
    setAppointments(MOCK_APPOINTMENTS)
    setPatients(MOCK_PATIENTS)
  }, [])

  const updateDoctorProfile = (doctorData: Partial<Doctor>) => {
    if (doctor) {
      setDoctor({ ...doctor, ...doctorData })
    }
    console.log('Updating doctor profile:', doctorData)
  }

  const updateAppointmentStatus = (appointmentId: string, status: 'approved' | 'rejected' | 'completed') => {
    setAppointments(prev => 
      prev.map(apt => 
        apt._id === appointmentId ? { ...apt, status } : apt
      )
    )
  }

  const createPatientReport = (reportData: Partial<PatientReport>) => {
    console.log('Creating patient report:', reportData)
    // Implementation for creating patient report
  }

  const createMedicalRecord = (medicalRecordData: CreateMedicalRecordData) => {
    console.log('Creating medical record:', medicalRecordData)
    // Implementation for creating medical record via API
    // This would typically make a POST request to your backend
  }

  const getTodaysAppointments = () => {
    const today = new Date().toISOString().split('T')[0]
    return appointments.filter(apt => apt.date === today)
  }

  const getUpcomingAppointments = () => {
    const today = new Date()
    return appointments.filter(apt => new Date(apt.date) > today)
  }

  const getCompletedAppointments = () => {
    return appointments.filter(apt => apt.status === 'completed')
  }

  return {
    doctor,
    appointments,
    patients,
    user,
    loading,
    updateDoctorProfile,
    updateAppointmentStatus,
    createPatientReport,
    createMedicalRecord,
    getTodaysAppointments,
    getUpcomingAppointments,
    getCompletedAppointments
  }
}
