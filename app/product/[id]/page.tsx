'use client'

import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Container } from '@/components/shared/container'
import { ProductDetail } from '@/components/shared/product-detail'
import { productApi } from '@/shared/api/product'
import { adaptProductToUI } from '@/shared/api/adapters'
import type { Product } from '@/shared/types'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)

        const productData = await productApi.getProductById(id)

        
        const adaptedProduct = adaptProductToUI(productData)
        setProduct(adaptedProduct)

        // Загрузка связанных товаров
        // TODO: Добавить API для получения рекомендованных товаров
        const recommendedProducts = await productApi.getSellerProducts({
          limit: 4,
          categoryId: productData.categoryId
        })
        const adaptedRecommended = recommendedProducts
          .filter(p => p.id !== id)
          .map(adaptProductToUI)
        setRelatedProducts(adaptedRecommended)

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка при загрузке товара')
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (error) {
    return (
      <Container>
        <div className="py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Ошибка</h1>
            <p className="mb-4">{error}</p>
          </div>
        </div>
      </Container>
    )
  }

  if (loading) {
    return (
      <Container>
        <div className="py-6">
          <div className="text-center">
            <p>Загрузка товара...</p>
          </div>
        </div>
      </Container>
    )
  }

  if (!product) {
    notFound()
  }

  return (
    <Container>
      <div className="py-6">
        <ProductDetail product={product} relatedProducts={relatedProducts} />
      </div>
    </Container>
  )
}
