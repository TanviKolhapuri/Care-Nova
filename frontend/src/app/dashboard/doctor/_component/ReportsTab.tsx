import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Eye } from 'lucide-react'
import type { Appointment, PatientReport } from '@/types/doctor-dashboard'
import { formatDate, getPatientFullName } from '@/utils/doctor-dashboard'

interface ReportsTabProps {
  appointments: Appointment[]
  onCreateReport: (reportData: Partial<PatientReport>) => void
}

export function ReportsTab({ appointments, onCreateReport }: ReportsTabProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<string>("")
  const completedAppointments = appointments.filter(apt => apt.status === 'completed')

  const handleCreateReport = (formData: FormData) => {
    const reportData = {
      appointmentId: selectedAppointment,
      diagnosis: formData.get('diagnosis') as string,
      treatment: formData.get('treatment') as string,
      medications: (formData.get('medications') as string).split(',').map(med => med.trim()),
      followUpDate: formData.get('followUpDate') as string,
      notes: formData.get('notes') as string
    }
    onCreateReport(reportData)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Patient Reports</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Report
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Patient Report</DialogTitle>
              <DialogDescription>Generate a medical report for a completed appointment</DialogDescription>
            </DialogHeader>
            <form action={handleCreateReport} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="appointment">Select Appointment</Label>
                <Select name="appointment" value={selectedAppointment} onValueChange={setSelectedAppointment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose completed appointment" />
                  </SelectTrigger>
                  <SelectContent>
                    {completedAppointments.map((appointment) => (
                      <SelectItem key={appointment._id} value={appointment._id}>
                        {getPatientFullName(appointment.patientId)} - {formatDate(appointment.date)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedAppointment && (
                <>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    {(() => {
                      const apt = completedAppointments.find(a => a._id === selectedAppointment)
                      return apt ? (
                        <div>
                          <h4 className="font-medium">Patient Information</h4>
                          <p className="text-sm text-gray-600">
                            <strong>Name:</strong> {getPatientFullName(apt.patientId)}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Age:</strong> {apt.patientId.dob} • <strong>Gender:</strong> {apt.patientId.gender}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Reason:</strong> {apt.reason}
                          </p>
                          {apt.patientId.medicalHistory.length > 0 && (
                            <div className="mt-2">
                              <strong className="text-sm">Medical History:</strong>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {apt.patientId.medicalHistory.map((history, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {history.medicalRecord.condition}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : null
                    })()}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="diagnosis">Diagnosis</Label>
                      <Input name="diagnosis" placeholder="Primary diagnosis" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="followUpDate">Follow-up Date</Label>
                      <Input name="followUpDate" type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="treatment">Treatment Plan</Label>
                    <Textarea name="treatment" placeholder="Describe the treatment plan" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medications">Medications</Label>
                    <Textarea 
                      name="medications" 
                      placeholder="List medications (comma-separated)"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea 
                      name="notes" 
                      placeholder="Any additional observations or instructions"
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline">Cancel</Button>
                    <Button type="submit">Create Report</Button>
                  </div>
                </>
              )}
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Recent Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedAppointments.slice(0, 6).map((appointment) => (
          <Card key={appointment._id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{getPatientFullName(appointment.patientId)}</CardTitle>
                  <CardDescription>{formatDate(appointment.date)}</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm"><strong>Reason:</strong> {appointment.reason}</p>
                <p className="text-sm"><strong>Status:</strong> {appointment.status}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {appointment.patientId.medicalHistory.map((history, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {history.medicalRecord.condition}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {completedAppointments.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Yet</h3>
            <p className="text-gray-500">Complete appointments to generate patient reports</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
