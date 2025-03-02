import { ticketHttp as http } from '../common'
import { AddTicketCommentRequest, CreateTicketRequest, Ticket, UpdateTicketRequest } from './types'

export const getTickets = async (): Promise<Ticket[]> => {
  const response = await http.get('/tickets/')
  return response.data
}

export const createTicket = async (request: CreateTicketRequest): Promise<Ticket> => {
  const response = await http.post('/tickets', request)
  return response.data
}

export const getTicketById = async (id: string): Promise<Ticket> => {
  const response = await http.get(`/tickets/${id}`)
  return response.data
}

export const updateTicket = async (request: UpdateTicketRequest): Promise<Ticket> => {
  const response = await http.patch(`/tickets/${request.id}`, request)
  return response.data
}

export const deleteTicket = async (id: string): Promise<void> => {
  await http.delete(`/tickets/${id}`)
}

export const addTicketComment = async (request: AddTicketCommentRequest): Promise<Ticket> => {
  const response = await http.post(`/tickets/${request.ticketId}/comments`, {
    text: request.text,
    username: request.username
  })
  return response.data
}
