export interface CreateTicketRequest {
  title: string
  description: string
  status: string
  username: string
}

export interface UpdateTicketRequest {
  id: number
  status: TicketStatus
}

export interface AddTicketCommentRequest {
  ticketId: string
  text: string
}

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED'
}

export const ticketStatusMap: Record<TicketStatus, string> = {
  [TicketStatus.OPEN]: 'Открыт',
  [TicketStatus.IN_PROGRESS]: 'Обработка',
  [TicketStatus.CLOSED]: 'Закрыт'
}

export interface TicketComment {
  id: string
  username: string
  text: string
  created_at: Date
  updated_at: Date
}

export interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  created_at: Date
  updated_at: Date
  username: string
  comments: TicketComment[]
}
