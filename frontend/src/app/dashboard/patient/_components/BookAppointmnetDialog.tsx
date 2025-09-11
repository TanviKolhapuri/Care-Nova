"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Clock, User, Stethoscope, Phone, DollarSign, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { TIME_SLOTS, APPOINTMENT_REASONS } from '@/constants/patient-dashboard'
import { formatCurrency } from '@/utils/patient-dashboard'

interface Doctor {
  _id: string
  name: string
  specialization: string
  qualifications: string
  experience: number
  department: string
  availability: { day: string; startTime: string; endTime: string }[]
  phone: string
  consultationFee: number
}

interface BookAppointmentData {
  doctorId: string
  date: string
  timeSlot: string
  reason: string
}

export function BookAppointmentDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("")
  const [reason, setReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)
  const maxDateString = maxDate.toISOString().split('T')[0]

  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/getdetails`, {
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()
      if (data.success && Array.isArray(data.data.doctors)) {
        setDoctors(data.data.doctors)
      }
    } catch (error) {
      console.error("Error fetching doctors:", error)
    }
  }

  useEffect(() => {
    if (open) {
      fetchDoctors()
    }
  }, [open])

  const handleDoctorSelect = (doctorId: string) => {
    const doctor = doctors.find(d => d._id === doctorId)
    setSelectedDoctor(doctor || null)
    setSelectedDate("")
    setSelectedTimeSlot("")
  }

  // Mock demo style — ignore date, show all slots from doctor's availability
  const getDoctorTimeSlots = () => {
    if (!selectedDoctor) return []
    const allSlots: string[] = [
      "09:00 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM",
      "12:00 PM - 01:00 PM",
      "01:00 PM - 02:00 PM",
      "02:00 PM - 03:00 PM",
      "03:00 PM - 04:00 PM",
      "04:00 PM - 05:00 PM",
    ]

    return allSlots
  }

  // Helper to convert "10 am" to Date object for comparison
  const parseTime = (timeStr: string) => {
    return new Date(`2000-01-01 ${timeStr.trim()}`).getTime()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDoctor || !selectedDate || !selectedTimeSlot || !reason) {
      setMessage({ type: "error", text: "Please fill in all required fields" })
      return
    }
    const appointmentData: BookAppointmentData = {
      doctorId: selectedDoctor._id,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      reason: reason === "Other" ? customReason : reason
    }
    try {
      setLoading(true)
      const token = localStorage.getItem("token") // assuming you stored it under 'token'

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/appointment/book-appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData),
      })

      const data = await res.json()
      if (res.ok) {
        setMessage({ type: "success", text: data.message || "Appointment booked successfully." })
        resetForm()
        setTimeout(() => {
          setOpen(false)
          setMessage(null)
        }, 2000)
      } else {
        setMessage({ type: "error", text: data.message || "Failed to book appointment" })
      }
    } catch (err) {
      console.error("Booking error:", err)
      setMessage({ type: "error", text: "Server error while booking appointment" })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSelectedDoctor(null)
    setSelectedDate("")
    setSelectedTimeSlot("")
    setReason("")
    setCustomReason("")
  }

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen)
      if (!newOpen) resetForm()
    }}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Book New Appointment
          </DialogTitle>
          <DialogDescription>
            Schedule an appointment with one of our available doctors
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Doctor List */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Select Doctor</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctors.map((doctor) => (
                <Card
                  key={doctor._id}
                  className={`cursor-pointer transition-all ${selectedDoctor?._id === doctor._id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'}`}
                  onClick={() => handleDoctorSelect(doctor._id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {doctor.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Stethoscope className="h-3 w-3" />
                          {doctor.specialization}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{doctor.department}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-gray-500" />
                        <span>{doctor.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-3 w-3 text-gray-500" />
                        <span>{formatCurrency(doctor.consultationFee)}</span>
                      </div>
                      <p className="text-xs text-gray-600"><strong>Experience:</strong> {doctor.experience} years</p>
                      <p className="text-xs text-gray-600"><strong>Qualifications:</strong> {doctor.qualifications}</p>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs font-medium text-gray-700 mb-1">Available Days:</p>
                      <div className="flex flex-wrap gap-1">
                        {doctor.availability.map((slot, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{slot.day}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          {selectedDoctor && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Appointment Date *</Label>
                <Input
                  id="date"
                  type="date"
                  min={today}
                  max={maxDateString}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Time Slot *</Label>
                <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {getDoctorTimeSlots().map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {slot}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Reason */}
          {selectedDoctor && (
            <div>
              <Label>Reason for Visit *</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  {APPOINTMENT_REASONS.map((reasonOption) => (
                    <SelectItem key={reasonOption} value={reasonOption}>{reasonOption}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {reason === "Other" && (
                <Textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Describe your reason"
                  required
                  className="mt-2"
                />
              )}
            </div>
          )}

          {/* Message */}
          {message && (
            <Alert className={message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              {message.type === "success" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={loading || !selectedDoctor || !selectedDate || !selectedTimeSlot || !reason}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Calendar className="h-4 w-4 mr-2" />}
              Book Appointment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
