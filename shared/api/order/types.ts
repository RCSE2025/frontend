export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  userId: number
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  createdAt: string
  updatedAt: string
  shippingAddress: string
  paymentMethod: string
  trackingNumber?: string
}

export interface OrderFilterOptions {
  status?: OrderStatus
  startDate?: string
  endDate?: string
  minAmount?: number
  maxAmount?: number
}

export interface CreateOrderRequest {
  items: {
    productId: string
    quantity: number
  }[]
  shippingAddress: string
  paymentMethod: string
}

export interface UpdateOrderStatusRequest {
  orderId: string
  status: OrderStatus
}