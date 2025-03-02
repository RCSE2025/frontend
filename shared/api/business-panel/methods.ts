import { userHttp as http } from '../common'
import { IProduct } from '../product'

export const getAllProductsWithStatuses = async (): Promise<IProduct[]> => {
  try {
    const response = await http.get('/product')
    return response.data
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

export const createProduct = async (request: any): Promise<IProduct> => {
  try {
    const response = await http.post('/product', request)
    return response.data
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

// Обновление существующего товара
export const updateProduct = async (request: any): Promise<IProduct> => {
  try {
    const response = await http.put(`/product/${request.id}`, request)
    return response.data
  } catch (error) {
    console.error(`Error updating product with ID ${request.id}:`, error)
    throw error
  }
}

// Удаление товара
export const deleteProduct = async (productId: number): Promise<void> => {
  try {
    await http.delete(`/product/${productId}`)
  } catch (error) {
    console.error(`Error deleting product with ID ${productId}:`, error)
    throw error
  }
}

// Загрузка файлов товара
export const uploadProductFiles = async (request: {
  files: File[]
  productId: number
}): Promise<string> => {
  try {
    const formData = new FormData()
    request.files.forEach((file) => formData.append('upload', file))

    const response = await http.post(`/product/images/upload`, formData, {
      params: {
        product_id: request.productId
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data.imageUrl
  } catch (error) {
    console.error(`Error uploading image for product with ID ${request.productId}:`, error)
    throw error
  }
}
