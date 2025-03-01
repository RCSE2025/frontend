import { Ticket, TicketPriority, TicketStatus } from '@/shared/types'

export interface CreateTicketRequest {
  title: string
  description: string
  priority: TicketPriority
}

export interface UpdateTicketRequest {
  id: string
  status?: TicketStatus
  priority?: TicketPriority
  assignedToId?: string
}

export interface AddTicketCommentRequest {
  ticketId: string
  content: string
}

export interface GetTicketsResponse {
  tickets: Ticket[]
  total: number
}
