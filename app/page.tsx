'use client'

import { CategoryGrid } from '@/components/shared/category-grid'
import { Container } from '@/components/shared/container'
import { HeroBanner } from '@/components/shared/hero-banner'
import { ProductSection } from '@/components/shared/product-section'
import { PromoBanner } from '@/components/shared/promo-banner'
import { getAllProductsFilter, getCategories } from '@/shared/api/product/methods'
import { ICategory, IProduct } from '@/shared/api/product/types'
import { useEffect, useState } from 'react'

const convertProducts = (products: IProduct[]) => {
  return products.map((product) => ({ ...product, image: product.images?.[0]?.url }))
}

export default function Home() {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [newest, setNewest] = useState<IProduct[]>([])
  const [bestsellers, setBestsellers] = useState<IProduct[]>([])

  useEffect(() => {
    getCategories().then((categories) => setCategories(categories.slice(0, 5)))
    getAllProductsFilter({
      sort_by: 'newest'
    }).then((products) => setNewest(products.slice(0, 5)))

    getAllProductsFilter({
      on_sale: true
    }).then((products) => {
      setBestsellers(products.slice(0, 5))
    })
  }, [])

  return (
    <Container>
      <HeroBanner
        title="Новая коллекция электроники"
        description="Откройте для себя последние инновации и технологии по специальным ценам"
        buttonText="Перейти в каталог"
        buttonLink="/catalog"
        imageSrc="https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Новая коллекция электроники"
        position="left"
      />

      <CategoryGrid title="Популярные категории" categories={categories} />

      {/* <ProductSection
        title="Рекомендуемые товары"
        viewAllLink="/catalog?sortBy=rating"
        products={featuredProducts}
      /> */}

      <PromoBanner
        title="Специальное предложение"
        description="Скидки до 40% на умные устройства для дома. Предложение ограничено по времени!"
        buttonText="Узнать больше"
        buttonLink="/special-offer"
        imageSrc="https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Умные устройства для дома"
        backgroundColor="bg-secondary"
      />

      <ProductSection
        title="Новые поступления"
        viewAllLink="/catalog?sortBy=newest"
        products={convertProducts(newest)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <PromoBanner
          title="Бесплатная доставка"
          description="На все заказы от 5000 руб."
          buttonText="Подробнее"
          buttonLink="/shipping"
          imageSrc="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
          imageAlt="Бесплатная доставка"
          backgroundColor="bg-secondary"
          direction="row-reverse"
        />
        <PromoBanner
          title="Программа лояльности"
          description="Получайте бонусы за каждую покупку"
          buttonText="Присоединиться"
          buttonLink="/loyalty"
          imageSrc="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
          imageAlt="Программа лояльности"
          backgroundColor="bg-secondary"
        />
      </div>

      <ProductSection
        title="Бестселлеры"
        viewAllLink="/catalog?onSale=true"
        products={convertProducts(bestsellers)}
      />
    </Container>
  )
}
