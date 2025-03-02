'use client'

import { Container } from '@/components/shared/container'
import { UserTicketDetail } from '@/components/shared/user-ticket-detail'

interface TicketPageProps {
  params: {
    id: string
  }
}

export default function TicketPage({ params }: TicketPageProps) {
  return (
    <Container>
      <UserTicketDetail ticketId={params.id} />
    </Container>
  )
}