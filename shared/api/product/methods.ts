import { userHttp as http } from '../common'
import { ICategory, IProduct, IProductFilterOptions } from './types'

export const getAllProductsFilter = async (
  filters?: IProductFilterOptions
): Promise<IProduct[]> => {
  try {
    const response = await http.get('/product/filter', { params: filters })
    return response.data
  } catch (error) {
    console.error('Error fetching seller products:', error)
    throw error
  }
}

export const getProductById = async (productId: string): Promise<IProduct> => {
  try {
    const response = await http.get(`/product/${productId}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error)
    throw error
  }
}

export const getCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await http.get('/product/categories')
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}
