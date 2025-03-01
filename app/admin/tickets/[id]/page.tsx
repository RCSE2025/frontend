'use client'

import { AdminLayout } from '@/components/admin/layout'
import { TicketDetail } from '@/components/admin/ticket-detail'
import { useParams } from 'next/navigation'

export default function AdminTicketDetailPage() {
  const params = useParams()
  const ticketId = params.id as string

  return (
    <AdminLayout title="Детали тикета">
      <TicketDetail ticketId={ticketId} />
    </AdminLayout>
  )
}
