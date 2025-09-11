'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus } from 'lucide-react'
import type { Appointment } from '@/types/doctor-dashboard'
import { getStatusBadge, formatDate, formatTime, calculateAge, getPatientFullName } from '@/utils/doctor-dashboard'
import { MedicalRecordDialog } from './MedicalRecordDialog'
import { PatientDetailsDialog } from './PatientDetailsDialog'

export function AppointmentsTab() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch appointments for doctor
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

        setAppointments(data.appointments || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  // Add or update a patient's medical record
  const onSaveMedicalRecord = async (patientId: string, recordData: any) => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/doctor/patients/${patientId}/medical-record`, {
        method: 'POST', // single endpoint for add/update
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(recordData)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to save medical record')

      alert('Medical record saved successfully')

      // Optional: update appointment state if record info is needed immediately
      setAppointments(prev =>
        prev.map(app =>
          app.patientId._id === patientId
            ? { ...app, medicalRecord: data.record }
            : app
        )
      )
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
        <h2 className="text-2xl font-bold">My Appointments</h2>
        <div className="flex space-x-2">
          <Badge variant="secondary">{appointments.length} Total</Badge>
          <Badge className="bg-green-100 text-green-800">
            {appointments.filter(apt => apt.status === 'completed').length} Completed
          </Badge>
        </div>
      </div>

      {appointments.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
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
                      <PatientDetailsDialog
                        patient={appointment.patientId}
                        trigger={
                          <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                            <p className="font-medium text-blue-600 hover:text-blue-800">
                              {getPatientFullName(appointment.patientId)}
                            </p>
                            <p className="text-sm text-gray-500">
                              Age: {calculateAge(appointment.patientId.dob)} • {appointment.patientId.gender}
                            </p>
                            <p className="text-xs text-gray-500">{appointment.patientId.phone}</p>
                          </div>
                        }
                      />
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
                      <div className="flex space-x-2">
                        <MedicalRecordDialog
                          appointment={appointment}
                          onCreateRecord={(record) => onSaveMedicalRecord(appointment.patientId._id, record)}
                          trigger={
                            <Button size="sm" variant="outline">
                              <Plus className="h-4 w-4" />
                            </Button>
                          }
                        />
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => console.log("Report creation logic", appointment._id)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
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
