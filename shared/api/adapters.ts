import { Product as ApiProduct } from './product'
import { Product as UIProduct, ProductCategory } from '@/shared/types'

export function adaptProductToUI(apiProduct: ApiProduct): UIProduct {
  return {
    id: apiProduct.id,
    title: apiProduct.name,
    description: apiProduct.description,
    price: apiProduct.price,
    rating: apiProduct.rating,
    reviewCount: apiProduct.reviewsCount,
    images: apiProduct.images.map((url, index) => ({
      id: `img-${index}`,
      url,
      alt: `${apiProduct.name} - изображение ${index + 1}`,
      isPrimary: index === 0
    })),
    category: apiProduct.categoryId as ProductCategory, // Предполагаем, что categoryId соответствует ProductCategory
    inStock: true, // TODO: добавить поле в API
    specifications: [], // TODO: добавить поле в API
    reviews: [], // TODO: добавить поле в API
    tags: [], // TODO: добавить поле в API
    brand: '', // TODO: добавить поле в API
    sku: '', // TODO: добавить поле в API
    estimatedDelivery: '1-3 рабочих дня' // TODO: добавить поле в API
  }
}