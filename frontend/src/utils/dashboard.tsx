// status.tsx
import { Badge } from "@/components/ui/badge";
import { APPOINTMENT_STATUS_VARIANTS } from "@/constants/dashboard";

export const getStatusBadge = (status: string) => {
  const variants = APPOINTMENT_STATUS_VARIANTS;
  return (
    <Badge className={variants[status as keyof typeof variants]}>
      {status}
    </Badge>
  );
};


export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
