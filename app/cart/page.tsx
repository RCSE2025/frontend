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

  const { setProducts, products } = useCart()

  React.useEffect(() => {
    getCart().then(setCartProducts)
  }, [])

  React.useEffect(() => {
    setProducts(
      Object.fromEntries(cartProducts.map((product) => [product.product.id, product.quantity]))
    )
  }, [cartProducts])

  React.useEffect(() => {
    updateQuantity(products)
  }, [products])

  return (
    <Container>
      <Button onClick={() => router.push('/pay')}>Оформить заказ</Button>
      <ProductSection
        products={cartProducts.map((product) => ({
          ...product.product,
          image: product.product.images?.[0]?.url
        }))}
        title="Корзина"
        type="cart"
      />
    </Container>
  )
}
