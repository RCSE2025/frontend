import { userHttp as http } from '../common'
import { AddCartProductRequest, GetCartResponse } from './types'

export const addProductToCart = async (req: AddCartProductRequest) => {
  await http.post(`/cart`, req)
}

export const updateQuantity = async (req: { [key: string]: number }) => {
  await http.put(`/cart`, req)
}

export const getCart = async (): Promise<GetCartResponse[]> => {
  const response = await http.get('/cart')
  return response.data
}
