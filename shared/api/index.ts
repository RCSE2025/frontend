import { userApi } from './user'
import { productApi } from './product'
import { orderApi } from './order'
import { Ticket } from './ticket'
import { MockAPI } from './mock'

// Use mock API for development
const useMockAPI = true

export const API = useMockAPI
  ? {
      User: MockAPI.User,
      Ticket: MockAPI.Ticket
    }
  : {
      User: userApi,
      Ticket
    }
