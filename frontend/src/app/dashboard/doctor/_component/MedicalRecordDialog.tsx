import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from 'lucide-react'
import type { Appointment, CreateMedicalRecordData } from '@/types/doctor-dashboard'
import { getPatientFullName, calculateAge } from '@/utils/doctor-dashboard'

interface MedicalRecordDialogProps {
  appointment: Appointment
  onCreateRecord: (recordData: CreateMedicalRecordData) => void
  trigger: React.ReactNode
}

export function MedicalRecordDialog({ appointment, onCreateRecord, trigger }: MedicalRecordDialogProps) {
  const [medications, setMedications] = useState<string[]>([''])
  const [allergies, setAllergies] = useState<string[]>([''])
  const [open, setOpen] = useState(false)

  const addMedication = () => {
    setMedications([...medications, ''])
  }

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index))
  }

  const updateMedication = (index: number, value: string) => {
    const updated = [...medications]
    updated[index] = value
    setMedications(updated)
  }

  const addAllergy = () => {
    setAllergies([...allergies, ''])
  }

  const removeAllergy = (index: number) => {
    setAllergies(allergies.filter((_, i) => i !== index))
  }

  const updateAllergy = (index: number, value: string) => {
    const updated = [...allergies]
    updated[index] = value
    setAllergies(updated)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const recordData: CreateMedicalRecordData = {
      condition: formData.get('condition') as string,
      symptoms: formData.get('symptoms') as string,
      currentMedications: medications.filter(med => med.trim() !== ''),
      notes: formData.get('notes') as string,
      allergies: allergies.filter(allergy => allergy.trim() !== ''),
      patientId: appointment.patientId._id,
      appointmentId: appointment._id
    }

    onCreateRecord(recordData)
    setOpen(false)
    
    // Reset form
    setMedications([''])
    setAllergies([''])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Medical Record</DialogTitle>
          <DialogDescription>
            Create a new medical record for {getPatientFullName(appointment.patientId)}
          </DialogDescription>
        </DialogHeader>

        {/* Patient Information Summary */}
        <div className="p-4 bg-blue-50 rounded-lg mb-4">
          <h4 className="font-medium text-blue-900 mb-2">Patient Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Name:</strong> {getPatientFullName(appointment.patientId)}</p>
              <p><strong>Age:</strong> {calculateAge(appointment.patientId.dob)} years</p>
              <p><strong>Gender:</strong> {appointment.patientId.gender}</p>
            </div>
            <div>
              <p><strong>Phone:</strong> {appointment.patientId.phone}</p>
              <p><strong>Appointment:</strong> {appointment.date} at {appointment.timeSlot}</p>
              <p><strong>Reason:</strong> {appointment.reason}</p>
            </div>
          </div>
          
          {/* Existing Medical History */}
          {appointment.patientId.medicalHistory.length > 0 && (
            <div className="mt-3">
              <strong className="text-sm text-blue-900">Existing Medical History:</strong>
              <div className="flex flex-wrap gap-1 mt-1">
                {appointment.patientId.medicalHistory.map((history, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-white">
                    {history.medicalRecord.condition}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Condition and Symptoms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="condition">Condition *</Label>
              <Input 
                id="condition" 
                name="condition"
                placeholder="e.g., Hypertension, Diabetes Type 2"
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="symptoms">Symptoms *</Label>
              <Input 
                id="symptoms" 
                name="symptoms"
                placeholder="e.g., High blood pressure, headaches"
                required 
              />
            </div>
          </div>

          {/* Current Medications */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Current Medications</Label>
              <Button type="button" variant="outline" size="sm" onClick={addMedication}>
                <Plus className="h-4 w-4 mr-1" />
                Add Medication
              </Button>
            </div>
            <div className="space-y-2">
              {medications.map((medication, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="e.g., Lisinopril 10mg daily"
                    value={medication}
                    onChange={(e) => updateMedication(index, e.target.value)}
                  />
                  {medications.length > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeMedication(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Allergies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Allergies</Label>
              <Button type="button" variant="outline" size="sm" onClick={addAllergy}>
                <Plus className="h-4 w-4 mr-1" />
                Add Allergy
              </Button>
            </div>
            <div className="space-y-2">
              {allergies.map((allergy, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="e.g., Penicillin, Peanuts"
                    value={allergy}
                    onChange={(e) => updateAllergy(index, e.target.value)}
                  />
                  {allergies.length > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeAllergy(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea 
              id="notes" 
              name="notes"
              placeholder="Any additional observations, treatment notes, or recommendations..."
              rows={4}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Create Medical Record
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
