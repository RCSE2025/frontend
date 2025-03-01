import { Ticket, TicketFilters } from '@/shared/types'
import { userHttp as http } from '../common'
import {
  AddTicketCommentRequest,
  CreateTicketRequest,
  GetTicketsResponse,
  UpdateTicketRequest
} from './types'

export const getTickets = async (
  filters?: TicketFilters,
  page: number = 1,
  limit: number = 10
): Promise<GetTicketsResponse> => {
  const params = new URLSearchParams()

  if (filters?.status?.length) {
    filters.status.forEach((status) => params.append('status', status))
  }

  if (filters?.priority?.length) {
    filters.priority.forEach((priority) => params.append('priority', priority))
  }

  if (filters?.assignedToId) {
    params.append('assignedToId', filters.assignedToId)
  }

  if (filters?.searchQuery) {
    params.append('search', filters.searchQuery)
  }

  if (filters?.sortBy) {
    params.append('sortBy', filters.sortBy)
  }

  params.append('page', page.toString())
  params.append('limit', limit.toString())

  const response = await http.get('/tickets', { params })
  return response.data
}

export const getTicketById = async (id: string): Promise<Ticket> => {
  const response = await http.get(`/tickets/${id}`)
  return response.data
}

export const createTicket = async (request: CreateTicketRequest): Promise<Ticket> => {
  const response = await http.post('/tickets', request)
  return response.data
}

export const updateTicket = async (request: UpdateTicketRequest): Promise<Ticket> => {
  const response = await http.put(`/tickets/${request.id}`, request)
  return response.data
}

export const deleteTicket = async (id: string): Promise<void> => {
  await http.delete(`/tickets/${id}`)
}

export const addTicketComment = async (request: AddTicketCommentRequest): Promise<Ticket> => {
  const response = await http.post(`/tickets/${request.ticketId}/comments`, {
    content: request.content
  })
  return response.data
}

export const getAdmins = async (): Promise<{ id: string; name: string }[]> => {
  const response = await http.get('/admins')
  return response.data
}
