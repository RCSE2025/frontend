'use client'

import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Container } from '@/components/shared/container'
import { ProductDetail } from '@/components/shared/product-detail'
import { IProduct, productApi } from '@/shared/api/product'
import { addProductToCart } from '@/shared/api/cart/methods'
import { toast } from 'sonner'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params
  const [product, setProduct] = useState<IProduct | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const productResponse = await productApi.getProductById(id)

        setProduct(productResponse)

        const recommendedProducts = await productApi.getAllProductsFilter()
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

  const addToCart = async (product: IProduct, quantity: number) => {
    addProductToCart({ product_id: product.id, quantity })
      .then(() => {
        toast.success('Товар добавлен в корзину')
      })
      .catch(() => toast.error('Что-то пошло не так'))
  }

  return (
    <Container>
      <div className="py-6">
        <ProductDetail product={product} relatedProducts={relatedProducts} addToCart={addToCart} />
      </div>
    </Container>
  )
}
