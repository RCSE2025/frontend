import { create } from 'zustand'
import { API } from '../api'
import {
  CreateOrderRequest,
  Order,
  OrderFilterOptions,
  OrderStatus,
  UpdateOrderStatusRequest
} from '../api/order/types'

interface IOrderStore {
  orders: Order[]
  currentOrder: Order | null
  loading: boolean
  error: string | null

  // Методы для получения заказов
  fetchOrders: (filters?: OrderFilterOptions) => Promise<void>
  fetchOrderById: (orderId: string) => Promise<void>

  // Методы для создания и обновления заказов
  createOrder: (request: CreateOrderRequest) => Promise<Order>
  updateOrderStatus: (request: UpdateOrderStatusRequest) => Promise<void>
  cancelOrder: (orderId: string) => Promise<void>

  // Методы для фильтрации и сортировки
  // sortOrdersByDate: (ascending: boolean) => void
  // sortOrdersByAmount: (ascending: boolean) => void
  filterOrdersByStatus: (status: OrderStatus | null) => void
  filterOrdersByDateRange: (startDate: string | null, endDate: string | null) => void
  filterOrdersByAmountRange: (minAmount: number | null, maxAmount: number | null) => void
  resetFilters: () => void
}

export const useOrder = create<IOrderStore>((set, get) => ({
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,

  fetchOrders: async (filters?: OrderFilterOptions) => {
    try {
      set({ loading: true, error: null })
      const orders = await API.Order.getOrders(filters)
      set({ orders, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  fetchOrderById: async (orderId: string) => {
    try {
      set({ loading: true, error: null })
      const order = await API.Order.getOrderById(orderId)
      set({ currentOrder: order, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  createOrder: async (request: CreateOrderRequest) => {
    try {
      set({ loading: true, error: null })
      const order = await API.Order.createOrder(request)
      set((state) => ({
        orders: [...state.orders, order],
        loading: false
      }))
      return order
    } catch (error: any) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  updateOrderStatus: async (request: UpdateOrderStatusRequest) => {
    try {
      set({ loading: true, error: null })
      const updatedOrder = await API.Order.updateOrderStatus(request)
      set((state) => ({
        orders: state.orders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)),
        currentOrder:
          state.currentOrder?.id === updatedOrder.id ? updatedOrder : state.currentOrder,
        loading: false
      }))
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  cancelOrder: async (orderId: string) => {
    try {
      set({ loading: true, error: null })
      const cancelledOrder = await API.Order.cancelOrder(orderId)
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === cancelledOrder.id ? cancelledOrder : order
        ),
        currentOrder:
          state.currentOrder?.id === cancelledOrder.id ? cancelledOrder : state.currentOrder,
        loading: false
      }))
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  // sortOrdersByDate: (ascending: boolean) => {
  //   set((state) => ({
  //     orders: [...state.orders].sort((a, b) => {
  //       const dateA = new Date(a.createdAt).getTime()
  //       const dateB = new Date(b.createdAt).getTime()
  //       return ascending ? dateA - dateB : dateB - dateA
  //     })
  //   }))
  // },

  // sortOrdersByAmount: (ascending: boolean) => {
  //   set((state) => ({
  //     orders: [...state.orders].sort((a, b) => {
  //       return ascending
  //         ? a.totalAmount - b.totalAmount
  //         : b.totalAmount - a.totalAmount
  //     })
  //   }))
  // },

  filterOrdersByStatus: (status: OrderStatus | null) => {
    if (!status) {
      get().fetchOrders()
      return
    }

    get().fetchOrders({ status })
  },

  filterOrdersByDateRange: (startDate: string | null, endDate: string | null) => {
    if (!startDate && !endDate) {
      get().fetchOrders()
      return
    }

    get().fetchOrders({
      startDate: startDate || undefined,
      endDate: endDate || undefined
    })
  },

  filterOrdersByAmountRange: (minAmount: number | null, maxAmount: number | null) => {
    if (minAmount === null && maxAmount === null) {
      get().fetchOrders()
      return
    }

    get().fetchOrders({
      minAmount: minAmount || undefined,
      maxAmount: maxAmount || undefined
    })
  },

  resetFilters: () => {
    get().fetchOrders()
  }
}))
