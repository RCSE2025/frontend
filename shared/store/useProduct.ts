// import { create } from 'zustand'
// import { API } from '../api'
// import {
//   create,
//   Product,
//   ProductAnalytics,
//   ProductFilterOptions,
//   ProductsAnalyticsRequest,
//   SendToModerationRequest,
//   UpdateProductRequest,
//   UploadProductImageRequest
// } from '../api/business-panel'

// interface IProductStore {
//   // Состояние
//   products: Product[]
//   selectedProduct: Product | null
//   isLoading: boolean
//   error: string | null
//   filters: ProductFilterOptions
//   analytics: ProductAnalytics[]

//   // Методы для работы с товарами
//   fetchProducts: (filters?: ProductFilterOptions) => Promise<void>
//   fetchProductById: (productId: string) => Promise<void>
//   createProduct: (request: CreateProductRequest) => Promise<Product>
//   updateProduct: (request: UpdateProductRequest) => Promise<Product>
//   deleteProduct: (productId: string) => Promise<void>
//   uploadProductImage: (request: UploadProductImageRequest) => Promise<string>
//   deleteProductImage: (productId: string, imageUrl: string) => Promise<void>
//   sendToModeration: (request: SendToModerationRequest) => Promise<Product>

//   // Методы для работы с аналитикой
//   fetchAnalytics: (request: ProductsAnalyticsRequest) => Promise<void>
//   exportAnalyticsToCSV: (request: ProductsAnalyticsRequest) => Promise<Blob>
//   exportAnalyticsToPDF: (request: ProductsAnalyticsRequest) => Promise<Blob>

//   // Вспомогательные методы
//   setFilters: (filters: ProductFilterOptions) => void
//   clearSelectedProduct: () => void
//   clearError: () => void
// }

// export const useProduct = create<IProductStore>((set, get) => ({
//   // Начальное состояние
//   products: [],
//   selectedProduct: null,
//   isLoading: false,
//   error: null,
//   filters: {},
//   analytics: [],

//   // Методы для работы с товарами
//   fetchProducts: async (filters?: ProductFilterOptions) => {
//     try {
//       set({ isLoading: true, error: null })

//       const appliedFilters = filters || get().filters
//       const products = await API.Product.getSellerProducts(appliedFilters)

//       set({ products, isLoading: false })
//     } catch (error: any) {
//       set({
//         error: error.message || 'Ошибка при загрузке товаров',
//         isLoading: false
//       })
//     }
//   },

//   fetchProductById: async (productId: string) => {
//     try {
//       set({ isLoading: true, error: null })

//       const product = await API.Product.getProductById(productId)

//       set({ selectedProduct: product, isLoading: false })
//     } catch (error: any) {
//       set({
//         error: error.message || `Ошибка при загрузке товара с ID ${productId}`,
//         isLoading: false
//       })
//     }
//   },

//   createProduct: async (request: CreateProductRequest) => {
//     try {
//       set({ isLoading: true, error: null })

//       const newProduct = await API.Product.createProduct(request)

//       set((state) => ({
//         products: [...state.products, newProduct],
//         selectedProduct: newProduct,
//         isLoading: false
//       }))

//       return newProduct
//     } catch (error: any) {
//       set({
//         error: error.message || 'Ошибка при создании товара',
//         isLoading: false
//       })
//       throw error
//     }
//   },

//   updateProduct: async (request: UpdateProductRequest) => {
//     try {
//       set({ isLoading: true, error: null })

//       const updatedProduct = await API.Product.updateProduct(request)

//       set((state) => ({
//         products: state.products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
//         selectedProduct: updatedProduct,
//         isLoading: false
//       }))

//       return updatedProduct
//     } catch (error: any) {
//       set({
//         error: error.message || `Ошибка при обновлении товара с ID ${request.id}`,
//         isLoading: false
//       })
//       throw error
//     }
//   },

//   deleteProduct: async (productId: string) => {
//     try {
//       set({ isLoading: true, error: null })

//       await API.Product.deleteProduct(productId)

//       set((state) => ({
//         products: state.products.filter((p) => p.id !== productId),
//         selectedProduct: state.selectedProduct?.id === productId ? null : state.selectedProduct,
//         isLoading: false
//       }))
//     } catch (error: any) {
//       set({
//         error: error.message || `Ошибка при удалении товара с ID ${productId}`,
//         isLoading: false
//       })
//       throw error
//     }
//   },

//   uploadProductImage: async (request: UploadProductImageRequest) => {
//     try {
//       set({ isLoading: true, error: null })

//       const imageUrl = await API.Product.uploadProductImage(request)

//       // Обновляем выбранный товар, если это он
//       if (get().selectedProduct?.id === request.productId) {
//         set((state) => {
//           const selectedProduct = state.selectedProduct
//           if (selectedProduct) {
//             return {
//               selectedProduct: {
//                 ...selectedProduct,
//                 images: [...selectedProduct.images, imageUrl]
//               }
//             }
//           }
//           return {}
//         })
//       }

//       set({ isLoading: false })
//       return imageUrl
//     } catch (error: any) {
//       set({
//         error:
//           error.message || `Ошибка при загрузке изображения для товара с ID ${request.productId}`,
//         isLoading: false
//       })
//       throw error
//     }
//   },

//   deleteProductImage: async (productId: string, imageUrl: string) => {
//     try {
//       set({ isLoading: true, error: null })

//       await API.Product.deleteProductImage(productId, imageUrl)

//       // Обновляем выбранный товар, если это он
//       if (get().selectedProduct?.id === productId) {
//         set((state) => {
//           const selectedProduct = state.selectedProduct
//           if (selectedProduct) {
//             return {
//               selectedProduct: {
//                 ...selectedProduct,
//                 images: selectedProduct.images.filter((img) => img !== imageUrl)
//               }
//             }
//           }
//           return {}
//         })
//       }

//       set({ isLoading: false })
//     } catch (error: any) {
//       set({
//         error: error.message || `Ошибка при удалении изображения для товара с ID ${productId}`,
//         isLoading: false
//       })
//       throw error
//     }
//   },

//   sendToModeration: async (request: SendToModerationRequest) => {
//     try {
//       set({ isLoading: true, error: null })

//       const updatedProduct = await API.Product.sendProductToModeration(request)

//       set((state) => ({
//         products: state.products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
//         selectedProduct:
//           state.selectedProduct?.id === updatedProduct.id ? updatedProduct : state.selectedProduct,
//         isLoading: false
//       }))

//       return updatedProduct
//     } catch (error: any) {
//       set({
//         error: error.message || `Ошибка при отправке товара с ID ${request.productId} на модерацию`,
//         isLoading: false
//       })
//       throw error
//     }
//   },

//   // Методы для работы с аналитикой
//   fetchAnalytics: async (request: ProductsAnalyticsRequest) => {
//     try {
//       set({ isLoading: true, error: null })

//       const analytics = await API.Product.getProductsAnalytics(request)

//       set({ analytics, isLoading: false })
//     } catch (error: any) {
//       set({
//         error: error.message || 'Ошибка при загрузке аналитики',
//         isLoading: false
//       })
//     }
//   },

//   exportAnalyticsToCSV: async (request: ProductsAnalyticsRequest) => {
//     try {
//       set({ isLoading: true, error: null })

//       const csvBlob = await API.Product.exportAnalyticsToCSV(request)

//       set({ isLoading: false })
//       return csvBlob
//     } catch (error: any) {
//       set({
//         error: error.message || 'Ошибка при экспорте аналитики в CSV',
//         isLoading: false
//       })
//       throw error
//     }
//   },

//   exportAnalyticsToPDF: async (request: ProductsAnalyticsRequest) => {
//     try {
//       set({ isLoading: true, error: null })

//       const pdfBlob = await API.Product.exportAnalyticsToPDF(request)

//       set({ isLoading: false })
//       return pdfBlob
//     } catch (error: any) {
//       set({
//         error: error.message || 'Ошибка при экспорте аналитики в PDF',
//         isLoading: false
//       })
//       throw error
//     }
//   },

//   // Вспомогательные методы
//   setFilters: (filters: ProductFilterOptions) => {
//     set({ filters })
//   },

//   clearSelectedProduct: () => {
//     set({ selectedProduct: null })
//   },

//   clearError: () => {
//     set({ error: null })
//   }
// }))
