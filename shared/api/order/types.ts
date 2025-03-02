export enum OrderStatus {
  PENDING = 'created',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'delivery',
  DELIVERED = 'closed',
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
  // totalAmount: number
  status: OrderStatus
  created_at: string
  updated_at: string
  shippingAddress: string
  paymentMethod: string
  trackingNumber?: string
  order_items: {
    order_item: {
      quantity: number
    }
    product: {
      price: number
    }
  }[]
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
