import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Patient } from '@/types/doctor-dashboard'
import { calculateAge } from '@/utils/doctor-dashboard'

interface PatientMedicalHistoryCardProps {
  patient: Patient
}

export function PatientMedicalHistoryCard({ patient }: PatientMedicalHistoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Medical History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {patient.medicalHistory.length > 0 ? (
          patient.medicalHistory.map((history, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900">
                  {history.medicalRecord.condition}
                </h4>
              </div>
              
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Symptoms:</strong>
                  <p className="text-gray-600 mt-1">{history.medicalRecord.symptoms}</p>
                </div>
                
                {history.medicalRecord.currentMedications.length > 0 && (
                  <div>
                    <strong>Current Medications:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {history.medicalRecord.currentMedications.map((medication, medIndex) => (
                        <Badge key={medIndex} variant="secondary" className="text-xs">
                          {medication}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {history.medicalRecord.allergies.length > 0 && (
                  <div>
                    <strong>Allergies:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {history.medicalRecord.allergies.map((allergy, allergyIndex) => (
                        <Badge key={allergyIndex} variant="destructive" className="text-xs">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {history.medicalRecord.notes && (
                  <div>
                    <strong>Notes:</strong>
                    <p className="text-gray-600 mt-1">{history.medicalRecord.notes}</p>
                  </div>
                )}
              </div>
              
              {index < patient.medicalHistory.length - 1 && <Separator />}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No medical history recorded</p>
        )}
      </CardContent>
    </Card>
  )
}
