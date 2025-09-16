import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Doctor } from "@/types/dashboard"

interface DoctorFormDialogProps {
  doctor?: Doctor
  onSuccess?: (doctor: Doctor) => void
  trigger: React.ReactNode
}

export function DoctorFormDialog({ doctor, onSuccess, trigger }: DoctorFormDialogProps) {
  const isEditing = !!doctor

  const [formData, setFormData] = useState({
  name: doctor?.userId.name || "",
  email: doctor?.userId.email || "",
  specialization: doctor?.specialization || "",
  department: doctor?.department || "",
  experience: doctor?.experience?.toString() || "",
  phone: doctor?.phone || "",
  consultationFee: doctor?.consultationFee?.toString() || "",
  qualifications: doctor?.qualifications || "",
  availability: doctor?.availability || [{ day: "", startTime: "", endTime: "" }],
})


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleAvailabilityChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedAvailability = [...prev.availability]
      updatedAvailability[index] = { ...updatedAvailability[index], [field]: value }
      return { ...prev, availability: updatedAvailability }
    })
  }

  const addAvailabilityRow = () => {
    setFormData((prev) => ({
      ...prev,
      availability: [...prev.availability, { day: "", startTime: "", endTime: "" }],
    }))
  }

  const removeAvailabilityRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("No auth token found")

      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/adddoctordetails`

     const body = {
  ...(isEditing && { userId: doctor?.userId }), // for update
  name: formData.name,
  email: formData.email,
  specialization: formData.specialization,
  qualifications: formData.qualifications,
  experience: Number(formData.experience),
  department: formData.department,
  phone: formData.phone,
  consultationFee: Number(formData.consultationFee),
  availability: formData.availability,
}


      const response = await fetch(url, {
        method: "POST", // same endpoint for add/update
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to save doctor details")
      }

      const data = await response.json()
      onSuccess?.(data.doctor)
    } catch (err: any) {
      console.error("DoctorFormDialog error:", err.message)
      alert(err.message)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Doctor Details" : "Add New Doctor"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update doctor information"
              : "Enter doctor details to add them to the system"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          {[
            "name",
            "email",
            "specialization",
            "department",
            "experience",
            "phone",
            "consultationFee",
            "qualifications",
          ].map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field}>{field.replace(/^\w/, (c) => c.toUpperCase())}</Label>
              <Input
                id={field}
                type={
                  field === "email"
                    ? "email"
                    : field === "experience" || field === "consultationFee"
                    ? "number"
                    : "text"
                }
                value={formData[field as keyof typeof formData] as string}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        {/* Availability Section */}
        <div className="mt-6 space-y-4">
          <h3 className="font-semibold">Availability</h3>
          {formData.availability.map((slot, index) => (
            <div key={index} className="grid grid-cols-4 gap-2 items-end">
              <Input
                placeholder="Day"
                value={slot.day}
                onChange={(e) => handleAvailabilityChange(index, "day", e.target.value)}
              />
              <Input
                placeholder="Start Time (e.g., 09:00 AM)"
                value={slot.startTime}
                onChange={(e) => handleAvailabilityChange(index, "startTime", e.target.value)}
              />
              <Input
                placeholder="End Time (e.g., 01:00 PM)"
                value={slot.endTime}
                onChange={(e) => handleAvailabilityChange(index, "endTime", e.target.value)}
              />
              <Button variant="destructive" onClick={() => removeAvailabilityRow(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={addAvailabilityRow}>
            Add Availability
          </Button>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSubmit}>
            {isEditing ? "Save Changes" : "Add Doctor"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
