'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Filter, Download, CheckCircle, XCircle, Clock } from 'lucide-react'
import type { Appointment } from '@/types/dashboard'
import { getStatusBadge } from '@/utils/dashboard'

export function AppointmentsTab() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
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
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch appointments')
        }
        console.log(data)
        setAppointments(data.appointments || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  // Update appointment status
  const onUpdateStatus = async (appointmentId: string, status: 'approved' | 'rejected' | 'completed') => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/appointment/${appointmentId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to update status')

      // Refresh state
      setAppointments(prev =>
        prev.map(app => app._id === appointmentId ? { ...app, status } : app)
      )
      console.log(data)
    } catch (err: any) {
      console.error(err.message)
      alert(err.message)
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
        <h2 className="text-2xl font-bold">All Appointments</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {appointments.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment._id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{appointment.patientName
                        }</p>
                        <p className="text-sm text-gray-500">{appointment.patientId.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{appointment.doctorId.userId.name}</p>
                        <p className="text-sm text-gray-500">{appointment.doctorId.specialization}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{appointment.date}</p>
                        <p className="text-sm text-gray-500">{appointment.timeSlot}</p>
                      </div>
                    </TableCell>
                    <TableCell>{appointment.reason}</TableCell>
                    <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {appointment.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onUpdateStatus(appointment._id, 'approved')}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onUpdateStatus(appointment._id, 'rejected')}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {appointment.status === 'approved' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onUpdateStatus(appointment._id, 'completed')}
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <p>No appointments found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
