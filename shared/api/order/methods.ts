import { orderHttp as http } from '../common'
import { CreateOrderRequest, Order, OrderFilterOptions, UpdateOrderStatusRequest } from './types'

export const getOrders = async (filters?: OrderFilterOptions): Promise<Order[]> => {
  try {
    const response = await http.get('/order', { params: filters })
    return response.data
  } catch (e: any) {
    throw e
  }
}

export const getOrderById = async (orderId: string): Promise<Order> => {
  try {
    const response = await http.get(`/orders/${orderId}`)
    return response.data
  } catch (e: any) {
    throw e
  }
}

export const createOrder = async (request: CreateOrderRequest): Promise<Order> => {
  try {
    const response = await http.post('/orders', request)
    return response.data
  } catch (e: any) {
    throw e
  }
}

export const updateOrderStatus = async (request: UpdateOrderStatusRequest): Promise<Order> => {
  try {
    const response = await http.patch(`/orders/${request.orderId}/status`, {
      status: request.status
    })
    return response.data
  } catch (e: any) {
    throw e
  }
}

export const cancelOrder = async (orderId: string): Promise<Order> => {
  try {
    const response = await http.post(`/orders/${orderId}/cancel`)
    return response.data
  } catch (e: any) {
    throw e
  }
}
