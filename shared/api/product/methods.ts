import { userHttp as http } from '../common'
import {
  CreateProductRequest,
  Product,
  ProductFilterOptions,
  ProductsAnalyticsRequest,
  ProductAnalytics,
  SendToModerationRequest,
  UpdateProductRequest,
  UploadProductImageRequest
} from './types'

// Получение списка товаров продавца с возможностью фильтрации
export const getSellerProducts = async (filters?: ProductFilterOptions): Promise<Product[]> => {
  try {
    const response = await http.get('/products/seller', { params: filters })
    return response.data
  } catch (error) {
    console.error('Error fetching seller products:', error)
    throw error
  }
}

// Получение товара по ID
export const getProductById = async (productId: string): Promise<Product> => {
  try {
    const response = await http.get(`/products/${productId}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error)
    throw error
  }
}

// Создание нового товара
export const createProduct = async (request: CreateProductRequest): Promise<Product> => {
  try {
    const response = await http.post('/products', request)
    return response.data
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

// Обновление существующего товара
export const updateProduct = async (request: UpdateProductRequest): Promise<Product> => {
  try {
    const response = await http.put(`/products/${request.id}`, request)
    return response.data
  } catch (error) {
    console.error(`Error updating product with ID ${request.id}:`, error)
    throw error
  }
}

// Удаление товара
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await http.delete(`/products/${productId}`)
  } catch (error) {
    console.error(`Error deleting product with ID ${productId}:`, error)
    throw error
  }
}

// Загрузка изображения товара
export const uploadProductImage = async (request: UploadProductImageRequest): Promise<string> => {
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

// Удаление изображения товара
export const deleteProductImage = async (productId: string, imageUrl: string): Promise<void> => {
  try {
    await http.delete(`/products/${productId}/images`, {
      data: { imageUrl }
    })
  } catch (error) {
    console.error(`Error deleting image for product with ID ${productId}:`, error)
    throw error
  }
}

// Отправка товара на модерацию
export const sendProductToModeration = async (request: SendToModerationRequest): Promise<Product> => {
  try {
    const response = await http.post(`/products/${request.productId}/moderation`)
    return response.data
  } catch (error) {
    console.error(`Error sending product with ID ${request.productId} to moderation:`, error)
    throw error
  }
}

// Получение аналитики по товарам
export const getProductsAnalytics = async (request: ProductsAnalyticsRequest): Promise<ProductAnalytics[]> => {
  try {
    const response = await http.get('/products/analytics', { params: request })
    return response.data
  } catch (error) {
    console.error('Error fetching products analytics:', error)
    throw error
  }
}

// Экспорт аналитики в CSV
export const exportAnalyticsToCSV = async (request: ProductsAnalyticsRequest): Promise<Blob> => {
  try {
    const response = await http.get('/products/analytics/export/csv', { 
      params: request,
      responseType: 'blob'
    })
    return response.data
  } catch (error) {
    console.error('Error exporting analytics to CSV:', error)
    throw error
  }
}

// Экспорт аналитики в PDF
export const exportAnalyticsToPDF = async (request: ProductsAnalyticsRequest): Promise<Blob> => {
  try {
    const response = await http.get('/products/analytics/export/pdf', { 
      params: request,
      responseType: 'blob'
    })
    return response.data
  } catch (error) {
    console.error('Error exporting analytics to PDF:', error)
    throw error
  }
}