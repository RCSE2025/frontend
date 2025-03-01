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

export interface IProduct extends IModelBase {
  id: 1
  business_id: 1
  price: 5000
  title: string
  description: string
  quantity: number
  rating: number
  review_count: number
  discount: number
  category: string
  brand: string
  sku: string
  estimated_delivery: string
  images: string[]
  specifications: IProductSpecifications
  reviews?: IReview[]
  related_products?: number[]
}

export interface IProductFilterOptions {
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
}
