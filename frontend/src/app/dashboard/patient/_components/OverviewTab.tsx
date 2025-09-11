import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import type { Patient, Appointment } from '@/types/patient-dashboard'
import { getStatusBadge, formatDate, formatTime, calculateAge } from '@/utils/patient-dashboard'

interface OverviewTabProps {
  patient: Patient | null
  appointments: Appointment[]
  upcomingAppointments: Appointment[]
  completedAppointments: Appointment[]
}

export function OverviewTab({ 
  patient, 
  appointments, 
  upcomingAppointments, 
  completedAppointments 
}: OverviewTabProps) {
  const pendingAppointments = appointments.filter(apt => apt.status === 'pending')

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {patient?.userId.name}
        </h2>
        <p className="text-gray-600">
          {patient && `Age: ${calculateAge(patient.dob)} • ${patient.gender}`}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedAppointments.length}</div>
            <p className="text-xs text-muted-foreground">Consultations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAppointments.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.slice(0, 3).map((appointment) => (
                  <div key={appointment._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{appointment.doctorId.userId.name}</p>
                      <p className="text-sm text-gray-600">{appointment.doctorId.specialization}</p>
                      <p className="text-xs text-gray-500">{formatDate(appointment.date)} at {formatTime(appointment.timeSlot)}</p>
                    </div>
                    {getStatusBadge(appointment.status)}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Medical History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patient?.medicalHistory.length ? (
                patient.medicalHistory.slice(0, 3).map((history, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">{history.medicalRecord.condition}</p>
                    <p className="text-sm text-gray-600">{history.medicalRecord.symptoms}</p>
                    {history.medicalRecord.currentMedications.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        Medications: {history.medicalRecord.currentMedications.slice(0, 2).join(', ')}
                        {history.medicalRecord.currentMedications.length > 2 && '...'}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No medical history recorded</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
