import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye } from 'lucide-react'
import type { Appointment, User } from '@/types/dashboard'
import { formatCurrency } from '@/utils/dashboard'

interface BillingTabProps {
  appointments: Appointment[]
  patients: User[]
}

export function BillingTab({ appointments, patients }: BillingTabProps) {
  const completedAppointments = appointments.filter(apt => apt.status === 'completed')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Billing & Invoices</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Generate Bill
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today's Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{formatCurrency(1250)}</div>
            <p className="text-sm text-gray-500">5 bills generated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{formatCurrency(850)}</div>
            <p className="text-sm text-gray-500">3 outstanding bills</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{formatCurrency(25400)}</div>
            <p className="text-sm text-gray-500">120 bills this month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bills</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bill ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>#INV-001</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>Dr. Sarah Wilson</TableCell>
                <TableCell>2024-01-20</TableCell>
                <TableCell>{formatCurrency(200)}</TableCell>
                <TableCell><Badge className="bg-green-100 text-green-800">Paid</Badge></TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>#INV-002</TableCell>
                <TableCell>Jane Smith</TableCell>
                <TableCell>Dr. Michael Brown</TableCell>
                <TableCell>2024-01-21</TableCell>
                <TableCell>{formatCurrency(150)}</TableCell>
                <TableCell><Badge className="bg-orange-100 text-orange-800">Pending</Badge></TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
