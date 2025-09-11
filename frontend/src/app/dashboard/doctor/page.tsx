"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDoctorDashboard } from "@/hooks/useDoctorDashboard"
import { DoctorHeader } from "./_component/DoctorHeader"
import { OverviewTab } from "./_component/OverviewTab"
import { AppointmentsTab } from "./_component/AppointmentsTab"
import { ProfileTab } from "./_component/ProfileTab"
import { ReportsTab } from "./_component/ReportsTab"

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const {
    doctor,
    appointments,
    patients,
    user,
    loading,
    updateDoctorProfile,
    updateAppointmentStatus,
    createPatientReport,
    getTodaysAppointments,
    getUpcomingAppointments,
    getCompletedAppointments,
    createMedicalRecord // Use createMedicalRecord function from the hook
  } = useDoctorDashboard()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  const handleCreateReport = (appointmentId: string) => {
    // This would typically open a modal or navigate to a report creation page
    console.log('Creating report for appointment:', appointmentId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DoctorHeader user={user} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab 
              doctor={doctor}
              appointments={appointments}
              todaysAppointments={getTodaysAppointments()}
              upcomingAppointments={getUpcomingAppointments()}
              completedAppointments={getCompletedAppointments()}
            />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentsTab 
              appointments={appointments}
              onUpdateStatus={updateAppointmentStatus}
              onCreateReport={handleCreateReport}
              onCreateMedicalRecord={createMedicalRecord} // This now uses the function from the hook
            />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileTab 
              doctor={doctor}
              onUpdateProfile={updateDoctorProfile}
            />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsTab 
              appointments={appointments}
              onCreateReport={createPatientReport}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
