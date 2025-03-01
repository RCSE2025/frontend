import { userApi } from './user'
import { productApi } from './product'
import { orderApi } from './order'
import { Ticket } from './ticket'
import { MockAPI } from './mock'

// Use mock API for development
const useMockAPI = true

export const API = useMockAPI
  ? {
      User: userApi,
      Ticket: MockAPI.Ticket,
      Order: orderApi,
      Product: productApi
    }
  : {
      User: userApi,
      Ticket,
      Order: orderApi,
      Product: productApi
    }
