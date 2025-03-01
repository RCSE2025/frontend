import { userHttp as http } from '../common'
import { IProduct } from '../product'

export const createProduct = async (request: any): Promise<IProduct> => {
  try {
    const response = await http.post('/products', request)
    return response.data
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

// Обновление существующего товара
export const updateProduct = async (request: any): Promise<IProduct> => {
  try {
    const response = await http.put(`/products/${request.id}`, request)
    return response.data
  } catch (error) {
    console.error(`Error updating product with ID ${request.id}:`, error)
    throw error
  }
}

// Удаление товара
export const deleteProduct = async (productId: number): Promise<void> => {
  try {
    await http.delete(`/products/${productId}`)
  } catch (error) {
    console.error(`Error deleting product with ID ${productId}:`, error)
    throw error
  }
}

// Загрузка изображения товара
export const uploadProductImage = async (request: any): Promise<string> => {
  try {
    const formData = new FormData()
    formData.append('image', request.image)

    const response = await http.post(`/products/${request.productId}/images`, formData, {
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
