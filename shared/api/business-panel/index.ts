import * as methods from './methods'
import * as types from './types'

export const productApi = {
  ...methods
}

export type {
  Product,
  ProductStatus,
  ProductCharacteristic,
  CreateProductRequest,
  UpdateProductRequest,
  UploadProductImageRequest,
  SendToModerationRequest,
  ProductFilterOptions,
  ProductAnalytics,
  ProductsAnalyticsRequest
} from './types'