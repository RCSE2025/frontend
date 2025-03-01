export enum ProductStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface ProductCharacteristic {
  name: string
  value: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  characteristics: ProductCharacteristic[]
  status: ProductStatus
  rejectionReason?: string
  moderatorComments?: string
  createdAt: string
  updatedAt: string
  sellerId: string
}

export interface CreateProductRequest {
  name: string
  description: string
  price: number
  category: string
  characteristics: ProductCharacteristic[]
}

export interface UpdateProductRequest {
  id: string
  name?: string
  description?: string
  price?: number
  category?: string
  characteristics?: ProductCharacteristic[]
}

export interface UploadProductImageRequest {
  productId: string
  image: File
}

export interface SendToModerationRequest {
  productId: string
}

export interface ProductFilterOptions {
  status?: ProductStatus
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
}

export interface ProductAnalytics {
  id: string
  name: string
  totalSales: number
  totalRevenue: number
  averageRating: number
}

export interface ProductsAnalyticsRequest {
  startDate: string
  endDate: string
  category?: string
}