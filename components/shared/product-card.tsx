import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: {
    id: number | string
    title: string
    price: number
    rating: number
    image: string
    discount?: number
    category?: string
  }
  aspectRatio?: 'portrait' | 'square'
  width?: number
  height?: number
}

export function ProductCard({
  product,
  aspectRatio = 'portrait',
  width = 250,
  height = 330,
  className,
  ...props
}: ProductCardProps) {
  const { id, title, price, rating, image, discount } = product

  return (
    <Card className={cn('overflow-hidden', className)} {...props}>
      <Link href={`/product/${id}`}>
        <div className="relative">
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
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
          </div>
          {discount && (
            <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded">
              -{discount}%
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/product/${id}`} className="hover:underline">
          <h3 className="font-medium line-clamp-2 h-12 mb-1">{title}</h3>
        </Link>
        <div className="flex items-center gap-1 mb-1">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <svg
                key={i}
                className={cn(
                  'h-4 w-4',
                  i < Math.floor(rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300 fill-gray-300'
                )}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          <span className="text-xs text-muted-foreground ml-1">{rating}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-lg">
            ₽{discount ? (price * (1 - discount / 100)).toFixed(2) : price.toFixed(2)}
          </span>
          {discount && (
            <span className="text-sm text-muted-foreground line-through">₽{price.toFixed(2)}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">В корзину</Button>
      </CardFooter>
    </Card>
  )
}
