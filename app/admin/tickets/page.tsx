import { AdminLayout } from '@/components/admin/layout'
import { TicketList } from '@/components/admin/ticket-list'

export default function AdminTicketsPage() {
  return (
    <AdminLayout title="Управление тикетами">
      <TicketList />
    </AdminLayout>
  )
}
