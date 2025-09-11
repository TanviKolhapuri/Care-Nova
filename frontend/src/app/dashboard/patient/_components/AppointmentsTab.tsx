'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Phone } from 'lucide-react'

import type { Appointment, Doctor, BookAppointmentData } from '@/types/patient-dashboard'
import { getStatusBadge, formatDate, formatTime, formatCurrency } from '@/utils/patient-dashboard'
import { BookAppointmentDialog } from "./BookAppointmnetDialog"

export function AppointmentsTab() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([])
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true)
      setError(null)
      const token = localStorage.getItem("token")
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/appointment/appointments`, {
          headers:{
            "Authorization": `Bearer ${token}`
          }
        })
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch appointments')
        }
        console.log(data)
        const fetchedAppointments: Appointment[] = data.appointments || []

        setAppointments(fetchedAppointments)

        const now = new Date()
        setUpcomingAppointments(
          fetchedAppointments.filter(app => new Date(app.date) >= now)
        )
        setPastAppointments(
          fetchedAppointments.filter(app => new Date(app.date) < now)
        )

        // Extract doctors list from appointments for booking dialog
        const uniqueDoctors = Array.from(
          new Map(
            fetchedAppointments.map(app => [app.doctorId._id, app.doctorId])
          ).values()
        )
        setDoctors(uniqueDoctors)

      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  const onBookAppointment = async (appointmentData: BookAppointmentData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/appointment/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(appointmentData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to book appointment')
      // Re-fetch after booking
      await new Promise(resolve => setTimeout(resolve, 500))
      window.location.reload()
      return { success: true, message: data.message }
    } catch (error: any) {
      return { success: false, message: error.message }
    }
  }

  if (loading) {
    return <p className="text-center py-8">Loading appointments...</p>
  }

  if (error) {
    return <p className="text-center text-red-600 py-8">{error}</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Appointments</h2>
        <div className="flex items-center space-x-3">
          <BookAppointmentDialog
            doctors={doctors}
            onBookAppointment={onBookAppointment}
            loading={loading}
            trigger={
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Book New Appointment
              </Button>
            }
          />
          <div className="flex space-x-2">
            <Badge variant="secondary">{appointments.length} Total</Badge>
            <Badge className="bg-green-100 text-green-800">
              {upcomingAppointments.length} Upcoming
            </Badge>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      {upcomingAppointments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment._id} className="p-4 border rounded-lg bg-blue-50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-lg">{appointment.doctorId.userId.name}</h4>
                      <p className="text-sm text-gray-600">{appointment.doctorId.specialization}</p>
                      <p className="text-sm text-gray-600">{appointment.doctorId.department}</p>
                    </div>
                    {getStatusBadge(appointment.status)}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{formatDate(appointment.date)} at {formatTime(appointment.timeSlot)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{appointment.doctorId.phone}</span>
                    </div>
                    <p className="text-gray-700">
                      <strong>Reason:</strong> {appointment.reason}
                    </p>
                    <p className="text-gray-700">
                      <strong>Fee:</strong> {formatCurrency(appointment.doctorId.consultationFee)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Appointments Table */}
      {appointments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>All Appointments</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment._id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{appointment.doctorId.userId.name}</p>
                        <p className="text-sm text-gray-500">{appointment.doctorId.specialization}</p>
                        <p className="text-xs text-gray-500">{appointment.doctorId.department}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{formatDate(appointment.date)}</p>
                        <p className="text-sm text-gray-500">{formatTime(appointment.timeSlot)}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{appointment.reason}</p>
                    </TableCell>
                    <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                    <TableCell>
                      <p className="font-medium">{formatCurrency(appointment.doctorId.consultationFee)}</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* No Appointments */}
      {appointments.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Appointments Yet</h3>
            <p className="text-gray-500">Schedule your first appointment with our doctors</p>
            <BookAppointmentDialog
              doctors={doctors}
              onBookAppointment={onBookAppointment}
              loading={loading}
              trigger={<Button className="mt-4">Book Appointment</Button>}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
