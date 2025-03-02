'use client'

import { Container } from '@/components/shared/container'
import { ProductSection } from '@/components/shared/product-section'
import { Button } from '@/components/ui/button'
import { getCart, updateQuantity } from '@/shared/api/cart/methods'
import { GetCartResponse } from '@/shared/api/cart/types'
import { useCart } from '@/shared/store/useCart'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Cart() {
  const router = useRouter()

  const [cartProducts, setCartProducts] = React.useState<GetCartResponse[]>([])

  const { setProducts, products, setPrices } = useCart()

  React.useEffect(() => {
    getCart().then(setCartProducts)
  }, [])

  React.useEffect(() => {
    setProducts(
      Object.fromEntries(cartProducts.map((product) => [product.product.id, product.quantity]))
    )
    setPrices(
      Object.fromEntries(cartProducts.map((product) => [product.product.id, product.product.price]))
    )
  }, [cartProducts])

  React.useEffect(() => {
    updateQuantity(products)
  }, [products])

  return (
    <Container>
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Корзина</h1>
        <div className="space-y-8">
          <ProductSection
            products={cartProducts.map((product) => ({
              ...product.product,
              image: product.product.images?.[0]?.url
            }))}
            type="cart"
            title=""
          />
          <div className="flex justify-between items-center border-t">
            <div className="text-lg font-medium">
              Итого: ₽
              {cartProducts
                .reduce((total, item) => {
                  const price = item.product.price
                  const discount = item.product.discount || 0
                  const finalPrice = discount ? price * (1 - discount / 100) : price
                  return total + finalPrice * item.quantity
                }, 0)
                .toFixed(2)}
            </div>
            <Button
              onClick={() => router.push('/pay')}
              className="text-lg font-semibold bg-primary hover:bg-primary/90 transition-colors"
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
