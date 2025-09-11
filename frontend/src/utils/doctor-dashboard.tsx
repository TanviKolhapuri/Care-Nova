import { Badge } from "@/components/ui/badge"
import { APPOINTMENT_STATUS_VARIANTS } from '@/constants/doctor-dashboard'

export const getStatusBadge = (status: string) => {
  const variants = APPOINTMENT_STATUS_VARIANTS
  return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const formatTime = (timeString: string) => {
  return timeString
}

export const calculateAge = (dob: string) => {
  const birthDate = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

export const getPatientFullName = (patient: any) => {
  return patient.userId?.name || patient.name || 'Unknown Patient'
}
