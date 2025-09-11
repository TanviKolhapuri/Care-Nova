import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Phone, MapPin, Shield, Heart } from 'lucide-react'
import type { Patient } from '@/types/doctor-dashboard'
import { calculateAge, getPatientFullName } from '@/utils/doctor-dashboard'
import { PatientMedicalHistoryCard } from './PatientMedicalHistoryCard'

interface PatientDetailsDialogProps {
  patient: Patient
  trigger: React.ReactNode
}

export function PatientDetailsDialog({ patient, trigger }: PatientDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {getPatientFullName(patient)}
          </DialogTitle>
          <DialogDescription>
            Complete patient information and medical history
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Information */}
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                Personal Information
              </h3>
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {getPatientFullName(patient)}</p>
                <p><strong>Email:</strong> {patient.userId.email}</p>
                <p><strong>Age:</strong> {calculateAge(patient.dob)} years</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
                <p><strong>Date of Birth:</strong> {new Date(patient.dob).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Information
              </h3>
              <div className="space-y-2 text-sm">
                <p><strong>Phone:</strong> {patient.phone}</p>
                <p><strong>Address:</strong> {patient.address}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Emergency Contact
              </h3>
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {patient.emergencyContact.name}</p>
                <p><strong>Phone:</strong> {patient.emergencyContact.phone}</p>
                <p><strong>Relationship:</strong> {patient.emergencyContact.relationship}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Insurance Information
              </h3>
              <div className="space-y-2 text-sm">
                <p><strong>Provider:</strong> {patient.insuranceInfo.provider}</p>
                <p><strong>Policy Number:</strong> {patient.insuranceInfo.policyNumber}</p>
                {patient.esiInfo.esiNumber && (
                  <p><strong>ESI Number:</strong> {patient.esiInfo.esiNumber}</p>
                )}
              </div>
            </div>
          </div>

          {/* Medical History */}
          <div>
            <PatientMedicalHistoryCard patient={patient} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
