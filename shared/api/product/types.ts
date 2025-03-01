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
  q?: string
  categories?: string
  brands?: string[]
  rating?: number
  in_stock?: boolean
  on_sale?: boolean
  sort_by?: 'price-asc' | 'price-desc' | 'rating' | 'newest'
  min_price?: number
  max_price?: number
}
