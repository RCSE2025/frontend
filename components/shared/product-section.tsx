import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/shared/product-card'
import { CartProduct } from './cart-product'

interface ProductSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  viewAllLink?: string
  type?: 'cart' | 'catalog'
  products: Array<{
    id: string | number
    title: string
    price: number
    rating: number
    image: string
    discount?: number
    category?: string
    quantity?: number
  }>
  layout?: 'grid' | 'carousel'
  columns?: 2 | 3 | 4 | 5 | 6
}

export function ProductSection({
  title,
  viewAllLink,
  products,
  layout = 'grid',
  type = 'catalog',
  columns = 4,
  className,
  ...props
}: ProductSectionProps) {
  return (
    <section className={cn('mb-12', className)} {...props}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {viewAllLink && (
          <Link href={viewAllLink}>
            <Button variant="link" className="text-main-accent">
              Смотреть все
            </Button>
          </Link>
        )}
      </div>

      <div
        className={cn(
          'grid gap-4',
          columns === 2 && 'grid-cols-1 sm:grid-cols-2',
          columns === 3 && 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
          columns === 4 && 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
          columns === 5 &&
            'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
          columns === 6 && 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
        )}
      >
        {products.map((product) =>
          type === 'cart' ? (
            <CartProduct key={product.id} product={product} />
          ) : (
            <ProductCard key={product.id} product={product} />
          )
        )}
      </div>
    </section>
  )
}
