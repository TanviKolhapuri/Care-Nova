"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Pill, AlertTriangle, Stethoscope } from "lucide-react"
import type { Patient } from "@/types/patient-dashboard"

interface MedicalHistoryTabProps {
  patient: Patient | null

}

export function MedicalHistoryTab({ patient }: MedicalHistoryTabProps) {
  const [medicalHistory, setMedicalHistory] = useState<any[]>(patient?.medicalHistory || [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!patient?._id) return
    const token = localStorage.getItem('token')
    const fetchMedicalHistory = async () => {
      setLoading(true)
      setError(null)
      try {
        console.log(patient._id)
      
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/patient/medical-records`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )

        if (!res.ok) {
          const errorText = await res.text()
          throw new Error(`Failed to fetch: ${errorText}`)
        }

        const data = await res.json()

        // data.records is an array of medical records
        // Convert it to your expected structure if needed:
        // Your component expects medicalHistory array with objects like { medicalRecord: record }
        const updatedHistory = data.records.map((record: any) => ({
          medicalRecord: record,
        }))

        setMedicalHistory(updatedHistory)
      } catch (err: any) {
        setError(err.message || "Error fetching medical history")
      } finally {
        setLoading(false)
      }
    }

    fetchMedicalHistory()
  }, [])

  if (!patient) return null

  if (loading) return <div>Loading medical history...</div>
  if (error) return <div className="text-red-600">Error: {error}</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Medical History</h2>
        <Badge variant="secondary">
          {medicalHistory.length} Record{medicalHistory.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {medicalHistory.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {medicalHistory.map((history, index) => (
            <Card key={index} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-blue-600" />
                  {history.medicalRecord?.condition}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Symptoms */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Symptoms
                  </h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {history.medicalRecord?.symptoms}
                  </p>
                </div>

                {/* Current Medications */}
                {history.medicalRecord?.currentMedications?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Pill className="h-4 w-4" />
                      Current Medications
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {history.medicalRecord?.currentMedications?.map(
                        (medication: string, medIndex: number) => (
                          <Badge
                            key={medIndex}
                            variant="secondary"
                            className="bg-green-100 text-green-800"
                          >
                            {medication}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Allergies */}
                {history.medicalRecord?.allergies?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Allergies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {history.medicalRecord.allergies.map(
                        (allergy: string, allergyIndex: number) => (
                          <Badge
                            key={allergyIndex}
                            variant="destructive"
                            className="bg-red-100 text-red-800"
                          >
                            {allergy}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {history.medicalRecord?.notes && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Doctor's Notes
                    </h4>
                    <p className="text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-l-blue-200">
                      {history.medicalRecord?.notes}
                    </p>
                  </div>
                )}

                {index < medicalHistory.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No Medical History
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Your medical history will appear here after your doctor adds
              medical records during consultations.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Summary Card */}
      {medicalHistory?.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Medical Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-blue-900 mb-2">
                  Active Conditions
                </h5>
                <div className="space-y-1">
                  {medicalHistory?.map((history, index) => (
                    <p key={index} className="text-blue-800">
                      {history.medicalRecord?.condition}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-medium text-blue-900 mb-2">
                  All Medications
                </h5>
                <div className="space-y-1">
                  {Array.from(
                    new Set(
                      medicalHistory.flatMap(
                        (h) => h.medicalRecord?.currentMedications
                      )
                    )
                  ).map((medication, index) => (
                    <p key={index} className="text-blue-800">
                      {medication}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-medium text-blue-900 mb-2">
                  Known Allergies
                </h5>
                <div className="space-y-1">
                  {Array.from(
                    new Set(
                      medicalHistory.flatMap((h) => h.medicalRecord?.allergies)
                    )
                  ).map((allergy, index) => (
                    <p key={index} className="text-red-700 font-medium">
                      {allergy}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
