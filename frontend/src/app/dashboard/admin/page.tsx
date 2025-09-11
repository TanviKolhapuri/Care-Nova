"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDashboardData } from "@/hooks/useDashboardData"
import { DashboardHeader } from "./_component/DashboardHeader"
import { OverviewTab } from "./_component/OverviewTab"
import { AppointmentsTab } from "./_component/AppointmentsTab"
import { DoctorsTab } from "./_component/DoctorsTab"
import { CreateAppointmentTab } from "./_component/CreateAppointmentTab"
import { BillingTab } from "./_component/BillingTab"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const {
    appointments,
    doctors,
    patients,
    user,
    loading,
    updateAppointmentStatus,
    addDoctor,
    updateDoctor,
    createAppointment
  } = useDashboardData()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="create-appointment">New Appointment</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab 
              appointments={appointments}
              doctors={doctors}
              patients={patients}
            />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentsTab 
              appointments={appointments}
              onUpdateStatus={updateAppointmentStatus}
            />
          </TabsContent>

          <TabsContent value="doctors">
            <DoctorsTab 
              doctors={doctors}
              onAddDoctor={addDoctor}
              onUpdateDoctor={updateDoctor}
            />
          </TabsContent>

          <TabsContent value="create-appointment">
            <CreateAppointmentTab 
              doctors={doctors}
              patients={patients}
              onCreateAppointment={createAppointment}
            />
          </TabsContent>

          <TabsContent value="billing">
            <BillingTab 
              appointments={appointments}
              patients={patients}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
