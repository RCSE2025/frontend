import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import { ProductCard } from '@/components/shared/product-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { IProduct } from '@/shared/api/product'
import { ProductCategory, productCategoryMap } from '@/shared/types'

interface ProductDetailProps {
  product: IProduct
  relatedProducts?: IProduct[]
  className?: string
  addToCart: (product: IProduct, quantity: number) => void
}

export function ProductDetail({
  product,
  relatedProducts = [],
  className,
  addToCart
}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = React.useState(
    product.images.find((img) => img) || product.images[0]
  )
  const [quantity, setQuantity] = React.useState(1)
  const [currentImageIndex, setCurrentImageIndex] = React.useState(
    product.images.findIndex((img) => img.id === selectedImage.id)
  )

  const handlePrevImage = () => {
    const newIndex = (currentImageIndex - 1 + product.images.length) % product.images.length
    setCurrentImageIndex(newIndex)
    setSelectedImage(product.images[newIndex])
  }

  const handleNextImage = () => {
    const newIndex = (currentImageIndex + 1) % product.images.length
    setCurrentImageIndex(newIndex)
    setSelectedImage(product.images[newIndex])
  }

  const handleThumbnailClick = (image: (typeof product.images)[0], index: number) => {
    setSelectedImage(image)
    setCurrentImageIndex(index)
  }

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value))
  }

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price

  return (
    <div className={cn('space-y-8', className)}>
      {/* Хлебные крошки */}
      <div className="flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Главная
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/category/${product.category.toLowerCase()}`}
          className="hover:text-foreground"
        >
          {productCategoryMap[product.category as ProductCategory]}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.title}</span>
      </div>

      {/* Основная информация о товаре */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Галерея изображений */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={selectedImage.url}
              alt={selectedImage.id.toString()}
              fill
              className="object-cover"
            />
            {product.images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Предыдущее изображение</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Следующее изображение</span>
                </Button>
              </>
            )}
            {product.discount && (
              <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded">
                -{product.discount}%
              </div>
            )}
          </div>

          {/* Миниатюры */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-1">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  className={cn(
                    'relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border',
                    selectedImage.id === image.id && 'ring-2 ring-primary'
                  )}
                  onClick={() => handleThumbnailClick(image, index)}
                >
                  <Image src={image.url} alt={product.title} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Информация о товаре */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-5 w-5',
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-300 text-gray-300'
                      )}
                    />
                  ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.rating} ({product.review_count} отзывов)
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{discountedPrice.toFixed(2)} ₽</span>
              {product.discount && (
                <span className="text-xl text-muted-foreground line-through">
                  {product.price.toFixed(2)} ₽
                </span>
              )}
            </div>
            {product.quantity > 0 ? (
              <p className="text-sm text-green-600">В наличии</p>
            ) : (
              <p className="text-sm text-destructive">Нет в наличии</p>
            )}
          </div>

          {product.brand && (
            <div>
              <span className="text-sm text-muted-foreground">Бренд: </span>
              <span className="text-sm font-medium">{product.brand}</span>
            </div>
          )}

          {product.sku && (
            <div>
              <span className="text-sm text-muted-foreground">Артикул: </span>
              <span className="text-sm font-medium">{product.sku}</span>
            </div>
          )}

          <Separator />

          {/* Добавление в корзину */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                  <span className="sr-only">Уменьшить количество</span>
                </Button>
                <div className="flex h-8 w-12 items-center justify-center border-y text-sm">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Увеличить количество</span>
                </Button>
              </div>
              <Button
                className="flex-1"
                disabled={product.quantity === 0}
                onClick={() => addToCart(product, quantity)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />В корзину
              </Button>
            </div>

            <div className="space-y-1 text-sm">
              <p className="text-green-600">Бесплатная доставка</p>
              <p>Ожидаемая доставка: {product.estimated_delivery}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Вкладки с информацией */}
      <Tabs defaultValue="description" className="mt-8">
        <TabsList className="w-full justify-start border-b">
          <TabsTrigger value="description">Описание</TabsTrigger>
          <TabsTrigger value="specifications">Характеристики</TabsTrigger>
          <TabsTrigger value="reviews">Отзывы ({product.reviews?.length || 0})</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-4">
          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="mt-4">
          <div className="space-y-4">
            {product.specifications.map((spec, index) => (
              <div
                key={index}
                className={cn(
                  'grid grid-cols-2 gap-4 px-4 py-3',
                  index % 2 === 0 ? 'bg-muted/50' : 'bg-transparent'
                )}
              >
                <div className="text-sm font-medium">{spec.name}</div>
                <div className="text-sm">{spec.value}</div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <div className="space-y-6">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{review.user_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'h-4 w-4',
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'fill-gray-300 text-gray-300'
                              )}
                            />
                          ))}
                      </div>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                    {review.images && review.images.length > 0 && (
                      <div className="mt-2 flex space-x-2">
                        {review.images.map((image, index) => (
                          <div
                            key={index}
                            className="relative h-16 w-16 overflow-hidden rounded-md"
                          >
                            <Image
                              src={image}
                              alt={`Изображение отзыва ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                Пока нет отзывов. Будьте первым, кто оставит отзыв!
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Похожие товары */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Похожие товары</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  rating: product.rating,
                  image: product.images[0].url,
                  discount: product.discount,
                  category: product.category
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
