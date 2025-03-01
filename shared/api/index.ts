import { productApi } from './business-panel'
import { MockAPI } from './mock'
import { orderApi } from './order'
import { Ticket } from './ticket'
import { userApi } from './user'

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
