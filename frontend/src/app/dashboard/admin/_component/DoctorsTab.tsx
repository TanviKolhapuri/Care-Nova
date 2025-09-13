import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit } from "lucide-react"
import type { Doctor } from "@/types/dashboard"
import { DoctorFormDialog } from "./DoctorsFormDialog"

export function DoctorsTab() {
  const [doctors, setDoctors] = useState<Doctor[]>([])

  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/getdetails`, {
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()
      if (data.success) {
        setDoctors(data.data.doctors)
      }
    } catch (error) {
      console.error("Error fetching doctors:", error)
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  const handleAddDoctor = async (doctorData: Partial<Doctor>) => {
    setDoctors((prev) => [...prev, doctorData as Doctor]) // Optimistic update
    await fetchDoctors() // Refresh with latest data
  }

  const handleUpdateDoctor = async (doctorId: string, doctorData: Partial<Doctor>) => {
  setDoctors((prev) =>
    prev.map((doc) =>
      doc.userId._id === doctorId ? { ...doc, ...doctorData } : doc
    )
  )
  await fetchDoctors()
}

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Doctor Management</h2>
        <DoctorFormDialog
          trigger={
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Doctor
            </Button>
          }
          onSuccess={handleAddDoctor}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.userId._id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{doctor.name}</CardTitle>
                  <CardDescription>{doctor.specialization || "N/A"}</CardDescription>
                </div>
                <DoctorFormDialog
                  doctor={doctor}
                  trigger={
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  }
                  onSuccess={(data) => handleUpdateDoctor(doctor.userId._id, data)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Department:</strong> {doctor.department || "N/A"}</p>
                <p><strong>Experience:</strong> {doctor.experience || 0} years</p>
                <p><strong>Phone:</strong> {doctor.phone || "N/A"}</p>
                <p><strong>Fee:</strong> ${doctor.consultationFee || 0}</p>
                <p><strong>Qualifications:</strong> {doctor.qualifications || "N/A"}</p>
                <div>
                  <strong>Availability:</strong>
                  <div className="mt-1 space-y-1">
                    {doctor.availability?.length > 0 ? (
                      doctor.availability.map((slot, index) => (
                        <Badge key={index} variant="secondary" className="mr-1">
                          {slot.day}: {slot.startTime} - {slot.endTime}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-500">No slots</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
