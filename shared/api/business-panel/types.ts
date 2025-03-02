// export enum ProductStatus {
//   DRAFT = 'DRAFT',
//   PENDING = 'PENDING',
//   APPROVED = 'APPROVED',
//   REJECTED = 'REJECTED'
// }

// export interface ProductCharacteristic {
//   name: string
//   value: string
// }

// export interface Product {
//   id: string
//   name: string
//   description: string
//   price: number
//   category: string
//   images: string[]
//   characteristics: ProductCharacteristic[]
//   status: ProductStatus
//   rejectionReason?: string
//   moderatorComments?: string
//   createdAt: string
//   updatedAt: string
//   sellerId: string
// }

// export interface CreateProductRequest {
//   name: string
//   description: string
//   price: number
//   category: string
//   characteristics: ProductCharacteristic[]
// }

// export interface UpdateProductRequest {
//   id: string
//   name?: string
//   description?: string
//   price?: number
//   category?: string
//   characteristics?: ProductCharacteristic[]
// }

// export interface UploadProductImageRequest {
//   productId: string
//   image: File
// }

// export interface SendToModerationRequest {
//   productId: string
// }

// export interface ProductFilterOptions {
//   status?: ProductStatus
//   category?: string
//   minPrice?: number
//   maxPrice?: number
//   search?: string
// }

// export interface ProductAnalytics {
//   id: string
//   name: string
//   totalSales: number
//   totalRevenue: number
//   averageRating: number
// }

// export interface ProductsAnalyticsRequest {
//   startDate: string
//   endDate: string
//   category?: string
// }

export enum ProductCategory {
  ELECTRONICS = 'ELECTRONICS',
  HOME = 'HOME',
  FASHION = 'FASHION',
  SPORTS = 'SPORTS',
  BEAUTY = 'BEAUTY',
  TOYS = 'TOYS',
  BOOKS = 'BOOKS',
  FOOD = 'FOOD',
  OTHER = 'OTHER'
}

export interface IModelBase {
  created_at: Date
  updated_at: Date
}

export interface IProductSpecifications extends IModelBase {
  id: number
  product_id: number
  name: string
  value: string
}

export interface IReview extends IModelBase {
  comment: string
  date: string
  id: number
  images: string[]
  product_id: number
  rating: number
  user_id: number
  user_name: string
}

export interface IProductMedia extends IModelBase {
  file_uuid: string
  id: number
  is_primary: boolean
  product_id: number
  url: string
}

export interface IProduct extends IModelBase {
  id: number
  business_id: number
  price: number
  title: string
  description: string
  status?: string
  quantity: number
  rating: number
  review_count: number
  discount: number
  category: string
  brand: string
  sku: string
  estimated_delivery: string
  images: IProductMedia[]
  specifications: IProductSpecifications
  reviews?: IReview[]
  related_products?: number[]
}

export interface PriceRange {
  min: number
  max: number
}

export interface IProductFilterOptions {
  search_query?: string
  categories?: ProductCategory[]
  brands?: string[]
  rating?: number
  in_stock?: boolean
  on_sale?: boolean
  sort_by?: 'price-asc' | 'price-desc' | 'rating' | 'newest'
}
