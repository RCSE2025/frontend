import { CategoryGrid } from '@/components/shared/category-grid'
import { Container } from '@/components/shared/container'
import { HeroBanner } from '@/components/shared/hero-banner'
import { ProductSection } from '@/components/shared/product-section'
import { PromoBanner } from '@/components/shared/promo-banner'

// Моковые данные для демонстрации
const featuredProducts = [
  {
    id: '1',
    title: 'Беспроводные наушники с шумоподавлением',
    price: 199.99,
    rating: 4.5,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
    discount: 15
  },
  {
    id: '2',
    title: 'Умные часы с мониторингом здоровья',
    price: 249.99,
    rating: 4.2,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Портативная Bluetooth колонка водонепроницаемая',
    price: 89.99,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop',
    discount: 10
  },
  {
    id: '4',
    title: 'Профессиональная камера 4K с стабилизацией',
    price: 799.99,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop'
  }
]

const newArrivals = [
  {
    id: '5',
    title: 'Ультратонкий ноутбук с сенсорным экраном',
    price: 1299.99,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: '6',
    title: 'Умная лампа с голосовым управлением',
    price: 49.99,
    rating: 4.3,
    image:
      'https://images.unsplash.com/photo-1507643179773-3e975d7ac515?q=80&w=1932&auto=format&fit=crop',
    discount: 20
  },
  {
    id: '7',
    title: 'Беспроводная зарядная станция для нескольких устройств',
    price: 79.99,
    rating: 4.4,
    image:
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '8',
    title: 'Игровая консоль нового поколения',
    price: 499.99,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?q=80&w=2072&auto=format&fit=crop',
    discount: 5
  }
]

const bestSellers = [
  {
    id: '9',
    title: 'Умный термостат с Wi-Fi',
    price: 129.99,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=2080&auto=format&fit=crop'
  },
  {
    id: '10',
    title: 'Робот-пылесос с самоочисткой',
    price: 349.99,
    rating: 4.5,
    image:
      'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2080&auto=format&fit=crop',
    discount: 12
  },
  {
    id: '11',
    title: 'Электрическая зубная щетка с датчиком давления',
    price: 89.99,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1559766025-08fc9f6f8e4e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '12',
    title: 'Кофемашина с автоматическим капучинатором',
    price: 299.99,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?q=80&w=2070&auto=format&fit=crop',
    discount: 8
  }
]

const categories = [
  {
    id: 'cat1',
    title: 'Электроника',
    image:
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2101&auto=format&fit=crop',
    link: '/catalog?categories=ELECTRONICS'
  },
  {
    id: 'cat2',
    title: 'Дом и кухня',
    image:
      'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?q=80&w=2070&auto=format&fit=crop',
    link: '/catalog?categories=HOME'
  },
  {
    id: 'cat3',
    title: 'Мода',
    image:
      'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop',
    link: '/catalog?categories=FASHION'
  },
  {
    id: 'cat4',
    title: 'Спорт и отдых',
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
    link: '/catalog?categories=SPORTS'
  }
]

export default function Home() {
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

      <ProductSection
        title="Рекомендуемые товары"
        viewAllLink="/catalog?sortBy=rating"
        products={featuredProducts}
      />

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
        products={newArrivals}
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

      <ProductSection title="Бестселлеры" viewAllLink="/catalog?onSale=true" products={bestSellers} />
    </Container>
  )
}
