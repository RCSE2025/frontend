export interface AddCartProductRequest {
  product_id: number
  quantity: number
}

export interface Product {
  id: number | string
  title: string
  price: number
  rating: number
  images: {
    url: string
  }[]
  discount?: number
  category?: string
}

export interface GetCartResponse {
  quantity: number
  product: Product
}
