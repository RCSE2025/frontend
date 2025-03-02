import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useCart } from '@/shared/store/useCart'
import { Minus, Plus } from 'lucide-react'

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: {
    id: number | string
    title: string
    price: number
    rating: number
    image: string
    discount?: number
    category?: string
    quantity?: number
  }
  aspectRatio?: 'portrait' | 'square'
  width?: number
  height?: number
}

export function CartProduct({
  product,
  aspectRatio = 'portrait',
  width = 250,
  height = 330,
  className,
  ...props
}: ProductCardProps) {
  const { id, title, price, rating, image, discount } = product

  const { products, updateProductQuantity } = useCart()

  return (
    <Card className={cn('overflow-hidden transition-all duration-300 hover:shadow-lg', className)} {...props}>
      <Link href={`/product/${id}`}>
        <div className="relative group">
          <div className="overflow-hidden rounded-t-lg">
            <div
              className={cn(
                'relative',
                aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
              )}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>
          {!!discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md transform -rotate-2">
              -{discount}%
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-5">
        <Link href={`/product/${id}`} className="block group">
          <h3 className="font-medium text-lg line-clamp-2 h-14 mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-3">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <svg
                key={i}
                className={cn(
                  'h-5 w-5 transition-colors',
                  i < Math.floor(rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-200 fill-gray-200'
                )}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          <span className="text-sm text-muted-foreground ml-2 font-medium">{rating}</span>
        </div>
        <div className="flex items-baseline gap-3 mb-4">
          <span className="font-bold text-2xl text-primary">
            ₽{discount ? (price * (1 - discount / 100)).toFixed(2) : price.toFixed(2)}
          </span>
          {!!discount && (
            <span className="text-base text-muted-foreground line-through">₽{price.toFixed(2)}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 flex items-center justify-between bg-gray-50">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-primary hover:text-white transition-colors"
          onClick={() => {
            if (products[id] === 0) return
            updateProductQuantity(id, products[id] - 1)
          }}
          disabled={products[id] === 0}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="select-none font-medium text-lg">
          {products[id]} {'шт.'}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-primary hover:text-white transition-colors"
          onClick={() => updateProductQuantity(id, products[id] + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
