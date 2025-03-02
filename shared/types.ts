

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

export const productCategoryMap: Record<ProductCategory, string> = {
  [ProductCategory.ELECTRONICS]: 'Электроника',
  [ProductCategory.HOME]: 'Дом и кухня',
  [ProductCategory.FASHION]: 'Мода',
  [ProductCategory.SPORTS]: 'Спорт и отдых',
  [ProductCategory.BEAUTY]: 'Красота и здоровье',
  [ProductCategory.TOYS]: 'Игрушки',
  [ProductCategory.BOOKS]: 'Книги',
  [ProductCategory.FOOD]: 'Продукты питания',
  [ProductCategory.OTHER]: 'Другое'
}

export interface ProductReview {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
  images?: string[]
}

export interface ProductSpecification {
  name: string
  value: string
}

export interface ProductImage {
  id: string
  url: string
  isPrimary?: boolean
  alt: string
}

export interface Product {
  id: string
  title: string
  description: string
  tags: string[]
  price: number
  rating: number
  reviewCount: number
  images: ProductImage[]
  discount?: number
  category: ProductCategory
  inStock: boolean
  specifications: ProductSpecification[]
  reviews?: ProductReview[]
  relatedProducts?: string[] // Продукты этого же продавца
  brand?: string
  sku?: string // TODO: to ID
  estimatedDelivery: string
}

export interface CategoryFilter {
  id: string
  title: string
  image: string
  link: string
  category: ProductCategory
}

export interface PriceRange {
  min: number
  max: number
}

export interface ProductFilters {
  searchQuery?: string
  categories?: ProductCategory[]
  priceRange?: PriceRange
  brands?: string[]
  rating?: number
  inStock?: boolean
  onSale?: boolean
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest'
  minPrice?: number
  maxPrice?: number
}
