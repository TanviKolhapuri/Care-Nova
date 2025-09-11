import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, CheckCircle, Clock } from 'lucide-react'
import type { Appointment, Doctor } from '@/types/doctor-dashboard'
import { getStatusBadge, formatDate, formatTime } from '@/utils/doctor-dashboard'

interface OverviewTabProps {
  doctor: Doctor | null
  appointments: Appointment[]
  todaysAppointments: Appointment[]
  upcomingAppointments: Appointment[]
  completedAppointments: Appointment[]
}

export function OverviewTab({ 
  doctor, 
  appointments, 
  todaysAppointments, 
  upcomingAppointments, 
  completedAppointments 
}: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {doctor?.userId.name}
        </h2>
        <p className="text-gray-600">
          {doctor?.specialization} • {doctor?.department} Department
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysAppointments.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled for today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(appointments.map(apt => apt.patientId._id)).size}
            </div>
            <p className="text-xs text-muted-foreground">Unique patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedAppointments.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysAppointments.length > 0 ? (
                todaysAppointments.map((appointment) => (
                  <div key={appointment._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{appointment.patientId.userId.name}</p>
                      <p className="text-sm text-gray-600">{appointment.reason}</p>
                      <p className="text-xs text-gray-500">{formatTime(appointment.timeSlot)}</p>
                    </div>
                    {getStatusBadge(appointment.status)}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No appointments scheduled for today</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedAppointments.slice(0, 3).map((appointment) => (
                <div key={appointment._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{appointment.patientId.userId.name}</p>
                    <p className="text-sm text-gray-600">Completed consultation</p>
                    <p className="text-xs text-gray-500">{formatDate(appointment.date)}</p>
                  </div>
                  {getStatusBadge(appointment.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
