import { productApi } from './business-panel'
import { orderApi } from './order'
import { ticketApi } from './ticket'
import { userApi } from './user'

// Use mock API for development
const useMockAPI = true

export const API = useMockAPI
  ? {
      User: userApi,
      Ticket: ticketApi,
      Order: orderApi,
      Product: productApi
    }
  : {
      User: userApi,
      Ticket: ticketApi,
      Order: orderApi,
      Product: productApi
    }
