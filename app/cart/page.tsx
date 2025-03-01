'use client'

import { Container } from '@/components/shared/container'
import { ProductSection } from '@/components/shared/product-section'
import { Button } from '@/components/ui/button'
import { useCart } from '@/shared/store/useCart'
import React from 'react'

export default function Cart() {
  const testProducts = [
    {
      id: '5',
      title: 'Ультратонкий ноутбук с сенсорным экраном',
      price: 1299.99,
      rating: 4.6,
      quantity: 10,
      image:
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop'
    }
  ]

  const { setProducts, products } = useCart()

  React.useEffect(() => {
    setProducts(Object.fromEntries(testProducts.map((product) => [product.id, product.quantity])))
  }, [])

  React.useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <Container>
      <Button>Оформить заказ</Button>
      <ProductSection products={testProducts} title="Корзина" type="cart" />
    </Container>
  )
}
