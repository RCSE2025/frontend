import { create } from 'zustand'
import { API } from '../api'
import {
  AddTicketCommentRequest,
  CreateTicketRequest,
  Ticket,
  UpdateTicketRequest
} from '../api/ticket/types'

interface ITicketStore {
  tickets: Ticket[]
  currentTicket: Ticket | null
  totalTickets: number
  loading: boolean
  admins: { id: string; name: string }[]
  page: number
  limit: number

  setPage: (page: number) => void
  setLimit: (limit: number) => void

  fetchTickets: () => Promise<void>
  fetchUserTickets: (email: string) => Promise<void>
  fetchTicketById: (id: string) => Promise<void>
  createTicket: (request: CreateTicketRequest) => Promise<void>
  updateTicket: (request: UpdateTicketRequest) => Promise<void>
  deleteTicket: (id: string) => Promise<void>
  addComment: (request: AddTicketCommentRequest) => Promise<void>
}

export const useTickets = create<ITicketStore>((set, get) => ({
  tickets: [],
  currentTicket: null,
  totalTickets: 0,
  loading: false,
  admins: [],
  filters: {},
  page: 1,
  limit: 10,

  setPage: (page: number) => set({ page }),
  setLimit: (limit: number) => set({ limit, page: 1 }),

  fetchTickets: async () => {
    set({ loading: true })

    try {
      const response = await API.Ticket.getTickets()
      set({ tickets: response, loading: false })
    } catch (error) {
      console.error('Error fetching tickets:', error)
      set({ loading: false })
    }
  },

  fetchUserTickets: async (email: string) => {
    set({ loading: true })

    try {
      const response = await API.Ticket.getTickets()
      const currentUser = await API.User.getUser()
      set({
        tickets: response.filter((ticket) => ticket.username === currentUser.email),
        loading: false
      })
    } catch (error) {
      console.error('Error fetching user tickets:', error)
      set({ loading: false })
    }
  },

  fetchTicketById: async (id: string) => {
    set({ loading: true })

    try {
      const ticket = await API.Ticket.getTicketById(id)
      set({ currentTicket: ticket, loading: false })
    } catch (error) {
      console.error('Error fetching ticket:', error)
      set({ loading: false })
    }
  },

  createTicket: async (request: CreateTicketRequest) => {
    set({ loading: true })

    try {
      await API.Ticket.createTicket(request)
      await get().fetchUserTickets(request.username) // Обновляем список тикетов пользователя после создания
    } catch (error) {
      console.error('Error creating ticket:', error)
      set({ loading: false })
    }
  },

  updateTicket: async (request: UpdateTicketRequest) => {
    set({ loading: true })

    try {
      const updatedTicket = await API.Ticket.updateTicket(request)

      // Update current ticket if it's the one being updated
      if (get().currentTicket?.id === updatedTicket.id) {
        set({ currentTicket: updatedTicket })
      }

      // Update ticket in the list
      set((state) => ({
        tickets: state.tickets.map((ticket) =>
          ticket.id === updatedTicket.id ? updatedTicket : ticket
        ),
        loading: false
      }))
    } catch (error) {
      console.error('Error updating ticket:', error)
      set({ loading: false })
    }
  },

  deleteTicket: async (id: string) => {
    set({ loading: true })

    try {
      await API.Ticket.deleteTicket(id)

      // Remove ticket from the list
      set((state) => ({
        tickets: state.tickets.filter((ticket) => ticket.id !== id),
        loading: false
      }))

      // Clear current ticket if it's the one being deleted
      if (get().currentTicket?.id === id) {
        set({ currentTicket: null })
      }
    } catch (error) {
      console.error('Error deleting ticket:', error)
      set({ loading: false })
    }
  },

  addComment: async (request: AddTicketCommentRequest) => {
    set({ loading: true })

    try {
      const updatedTicket = await API.Ticket.addTicketComment(request)

      // Update current ticket if it's the one being commented on
      if (get().currentTicket?.id === updatedTicket.id) {
        set({ currentTicket: updatedTicket })
      }

      // Update ticket in the list
      set((state) => ({
        tickets: state.tickets.map((ticket) =>
          ticket.id === updatedTicket.id ? updatedTicket : ticket
        ),
        loading: false
      }))
    } catch (error) {
      console.error('Error adding comment:', error)
      set({ loading: false })
    }
  }
}))
