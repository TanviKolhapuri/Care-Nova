"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { usePatientDashboard } from "@/hooks/usePatientDashboard"
import { PatientHeader } from "./_components/PatientHeader"
import { OverviewTab } from "./_components/OverviewTab"
import { AppointmentsTab } from "./_components/AppointmentsTab"
import { ProfileTab } from "./_components/ProfileTab"
import { MedicalHistoryTab } from "./_components/MedicalHistoryTab"

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const {
    patient,
    appointments,
    user,
    loading,
    updatePatientProfile,
    getUpcomingAppointments,
    getPastAppointments,
    getCompletedAppointments
  } = usePatientDashboard()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PatientHeader user={user} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="medical-history">Medical History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab 
              patient={patient}
              appointments={appointments}
              upcomingAppointments={getUpcomingAppointments()}
              completedAppointments={getCompletedAppointments()}
            />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentsTab 
              appointments={appointments}
              upcomingAppointments={getUpcomingAppointments()}
              pastAppointments={getPastAppointments()}
            />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileTab 
              patient={patient}
              loading={loading}
              onUpdateProfile={updatePatientProfile}
            />
          </TabsContent>

          <TabsContent value="medical-history">
            <MedicalHistoryTab 
              patient={patient}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
