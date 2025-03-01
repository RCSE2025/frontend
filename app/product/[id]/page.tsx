'use client'

import { notFound } from 'next/navigation'

import { Container } from '@/components/shared/container'
import { ProductDetail } from '@/components/shared/product-detail'
import { ProductCategory, type Product } from '@/shared/types'

interface ProductPageProps {
  params: {
    id: string
  }
}

// Моковые данные для демонстрации
const products: Product[] = [
  {
    id: '1',
    title: 'Беспроводные наушники с шумоподавлением',
    description:
      'Погрузитесь в мир звука с нашими беспроводными наушниками премиум-класса. Оснащенные передовой технологией активного шумоподавления, эти наушники блокируют внешние шумы, позволяя вам наслаждаться кристально чистым звуком. Эргономичный дизайн обеспечивает комфорт при длительном использовании, а 30-часовой срок службы батареи гарантирует, что музыка не остановится в самый неподходящий момент. Быстрая зарядка за 15 минут обеспечивает 5 часов воспроизведения, а встроенные микрофоны с технологией шумоподавления обеспечивают четкие звонки даже в шумной обстановке.',
    price: 199.99,
    rating: 4.5,
    reviewCount: 128,
    images: [
      {
        id: 'img1',
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
        alt: 'Беспроводные наушники с шумоподавлением - вид спереди',
        isPrimary: true
      },
      {
        id: 'img2',
        url: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?q=80&w=2070&auto=format&fit=crop',
        alt: 'Беспроводные наушники с шумоподавлением - вид сбоку'
      },
      {
        id: 'img3',
        url: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=2070&auto=format&fit=crop',
        alt: 'Беспроводные наушники с шумоподавлением - в чехле'
      }
    ],
    discount: 15,
    category: ProductCategory.ELECTRONICS,
    inStock: true,
    specifications: [
      { name: 'Тип', value: 'Накладные' },
      { name: 'Подключение', value: 'Bluetooth 5.0' },
      { name: 'Время работы', value: 'До 30 часов' },
      { name: 'Шумоподавление', value: 'Активное' },
      { name: 'Быстрая зарядка', value: '15 минут = 5 часов работы' },
      { name: 'Вес', value: '250 г' },
      { name: 'Микрофон', value: 'Встроенный с шумоподавлением' },
      { name: 'Управление', value: 'Сенсорное' },
      { name: 'Водонепроницаемость', value: 'IPX4' }
    ],
    reviews: [
      {
        id: 'rev1',
        userId: 'user1',
        userName: 'Алексей К.',
        rating: 5,
        comment:
          'Отличные наушники! Шумоподавление работает превосходно, звук чистый и насыщенный. Батарея держится даже дольше заявленного времени. Очень доволен покупкой!',
        date: '2025-02-15'
      },
      {
        id: 'rev2',
        userId: 'user2',
        userName: 'Марина С.',
        rating: 4,
        comment:
          'Хорошее качество звука и шумоподавления. Комфортно сидят на ушах даже при длительном ношении. Единственный минус - немного тяжеловаты.',
        date: '2025-02-10',
        images: [
          'https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?q=80&w=1974&auto=format&fit=crop'
        ]
      },
      {
        id: 'rev3',
        userId: 'user3',
        userName: 'Дмитрий П.',
        rating: 3,
        comment:
          'Звук хороший, но шумоподавление среднее. В метро всё равно слышно окружающих. Батарея держится хорошо.',
        date: '2025-01-28'
      }
    ],
    relatedProducts: ['2', '3', '7'],
    tags: ['наушники', 'bluetooth', 'шумоподавление', 'аудио'],
    brand: 'SoundMaster',
    sku: 'SM-HP-100',
    estimatedDelivery: '1-3 рабочих дня'
  },
  {
    id: '2',
    title: 'Умные часы с мониторингом здоровья',
    description:
      'Следите за своим здоровьем и оставайтесь на связи с нашими передовыми умными часами. Они отслеживают частоту сердечных сокращений, уровень кислорода в крови, качество сна и многое другое. Водонепроницаемый корпус позволяет использовать часы во время плавания, а встроенный GPS отслеживает ваши маршруты без необходимости брать с собой телефон. Получайте уведомления о звонках, сообщениях и приложениях прямо на запястье. Батарея работает до 7 дней на одной зарядке, а яркий AMOLED-дисплей обеспечивает отличную видимость даже при ярком солнечном свете.',
    price: 249.99,
    rating: 4.2,
    reviewCount: 95,
    images: [
      {
        id: 'img1',
        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop',
        alt: 'Умные часы с мониторингом здоровья - вид спереди',
        isPrimary: true
      },
      {
        id: 'img2',
        url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2070&auto=format&fit=crop',
        alt: 'Умные часы с мониторингом здоровья - на руке'
      }
    ],
    category: ProductCategory.ELECTRONICS,
    inStock: true,
    specifications: [
      { name: 'Дисплей', value: '1.4" AMOLED' },
      { name: 'Водонепроницаемость', value: '5 ATM' },
      { name: 'Время работы', value: 'До 7 дней' },
      { name: 'GPS', value: 'Встроенный' },
      { name: 'Датчики', value: 'Пульсометр, SpO2, акселерометр, гироскоп' },
      { name: 'Совместимость', value: 'Android 6.0+, iOS 10.0+' },
      { name: 'Материал корпуса', value: 'Алюминий' },
      { name: 'Вес', value: '32 г' }
    ],
    reviews: [
      {
        id: 'rev1',
        userId: 'user4',
        userName: 'Ирина М.',
        rating: 5,
        comment:
          'Отличные часы! Точно отслеживают пульс и сон, уведомления работают без задержек. Батарея держится около недели при активном использовании.',
        date: '2025-02-20'
      },
      {
        id: 'rev2',
        userId: 'user5',
        userName: 'Сергей В.',
        rating: 3,
        comment:
          'Часы неплохие, но GPS иногда теряет сигнал. Функции мониторинга здоровья работают хорошо.',
        date: '2025-02-05'
      }
    ],
    relatedProducts: ['1', '14'],
    tags: ['часы', 'фитнес', 'здоровье', 'гаджеты'],
    brand: 'TechWear',
    sku: 'TW-SW-200',
    estimatedDelivery: '1-3 рабочих дня'
  },
  {
    id: '3',
    title: 'Портативная Bluetooth колонка водонепроницаемая',
    description:
      'Возьмите музыку с собой куда угодно с нашей прочной водонепроницаемой Bluetooth-колонкой. Разработанная для приключений, эта колонка имеет рейтинг IPX7, что означает, что она может быть погружена в воду на глубину до 1 метра на 30 минут без повреждений. Мощные двойные динамики и пассивные излучатели обеспечивают глубокие басы и кристально чистый звук. Встроенный аккумулятор обеспечивает до 12 часов воспроизведения на одной зарядке, а прочный корпус защищает от ударов и падений. Встроенный микрофон позволяет использовать колонку как громкую связь для звонков.',
    price: 89.99,
    rating: 4.7,
    reviewCount: 156,
    images: [
      {
        id: 'img1',
        url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop',
        alt: 'Портативная Bluetooth колонка - вид спереди',
        isPrimary: true
      },
      {
        id: 'img2',
        url: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1964&auto=format&fit=crop',
        alt: 'Портативная Bluetooth колонка - вид сбоку'
      },
      {
        id: 'img3',
        url: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1974&auto=format&fit=crop',
        alt: 'Портативная Bluetooth колонка - у бассейна'
      }
    ],
    discount: 10,
    category: ProductCategory.ELECTRONICS,
    inStock: true,
    specifications: [
      { name: 'Мощность', value: '20 Вт' },
      { name: 'Подключение', value: 'Bluetooth 5.0, AUX' },
      { name: 'Время работы', value: 'До 12 часов' },
      { name: 'Водонепроницаемость', value: 'IPX7' },
      { name: 'Частотный диапазон', value: '80 Гц - 20 кГц' },
      { name: 'Микрофон', value: 'Встроенный' },
      { name: 'Вес', value: '540 г' },
      { name: 'Зарядка', value: 'USB Type-C' }
    ],
    reviews: [
      {
        id: 'rev1',
        userId: 'user6',
        userName: 'Андрей Л.',
        rating: 5,
        comment:
          'Отличная колонка! Звук мощный и чистый, басы хорошие. Брал с собой на пляж - работает отлично, даже после попадания воды.',
        date: '2025-02-18',
        images: [
          'https://images.unsplash.com/photo-1533576162942-4189c7b8c814?q=80&w=1970&auto=format&fit=crop'
        ]
      },
      {
        id: 'rev2',
        userId: 'user7',
        userName: 'Екатерина Н.',
        rating: 4,
        comment:
          'Хорошая колонка за свои деньги. Звук качественный, батарея держится долго. Единственный минус - немного тяжеловата для переноски.',
        date: '2025-02-10'
      }
    ],
    relatedProducts: ['1', '7'],
    tags: ['колонка', 'bluetooth', 'аудио', 'водонепроницаемая'],
    brand: 'SoundMaster',
    sku: 'SM-SP-300',
    estimatedDelivery: '1-3 рабочих дня'
  },
  {
    id: '7',
    title: 'Беспроводная зарядная станция для нескольких устройств',
    description:
      'Зарядите все свои устройства одновременно с нашей многофункциональной беспроводной зарядной станцией. Разработанная для современного пользователя с несколькими устройствами, эта станция может одновременно заряжать смартфон, наушники и умные часы без путаницы с кабелями. Технология быстрой зарядки обеспечивает эффективную подачу энергии, а интеллектуальная защита от перегрева гарантирует безопасность ваших устройств. Элегантный минималистичный дизайн дополнит любой интерьер, а нескользящая поверхность надежно удерживает устройства во время зарядки.',
    price: 79.99,
    rating: 4.4,
    reviewCount: 87,
    images: [
      {
        id: 'img1',
        url: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=2070&auto=format&fit=crop',
        alt: 'Беспроводная зарядная станция - общий вид',
        isPrimary: true
      },
      {
        id: 'img2',
        url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=1974&auto=format&fit=crop',
        alt: 'Беспроводная зарядная станция с устройствами'
      }
    ],
    category: ProductCategory.ELECTRONICS,
    inStock: true,
    specifications: [
      { name: 'Входная мощность', value: 'QC 3.0 / PD 18W' },
      { name: 'Выходная мощность', value: '15W (смартфон), 5W (часы/наушники)' },
      { name: 'Совместимость', value: 'Qi-совместимые устройства' },
      { name: 'Количество устройств', value: 'До 3 одновременно' },
      { name: 'Защита', value: 'От перегрева, перенапряжения, короткого замыкания' },
      { name: 'Материал', value: 'ABS + силикон' },
      { name: 'Вес', value: '320 г' },
      { name: 'Размеры', value: '18 x 12 x 1.5 см' }
    ],
    reviews: [
      {
        id: 'rev1',
        userId: 'user8',
        userName: 'Максим Д.',
        rating: 5,
        comment:
          'Отличная зарядная станция! Заряжает быстро и без проблем. Очень удобно заряжать несколько устройств одновременно.',
        date: '2025-02-12'
      },
      {
        id: 'rev2',
        userId: 'user9',
        userName: 'Ольга К.',
        rating: 4,
        comment:
          'Хорошая станция, но иногда нужно точно позиционировать устройства для начала зарядки. В целом довольна покупкой.',
        date: '2025-02-05'
      }
    ],
    relatedProducts: ['1', '2', '3'],
    tags: ['зарядка', 'беспроводная', 'электроника', 'аксессуары'],
    brand: 'PowerTech',
    sku: 'PT-WC-400',
    estimatedDelivery: '1-3 рабочих дня'
  }
]

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  // Получение связанных товаров
  const relatedProducts = product.relatedProducts
    ? (product.relatedProducts
        .map((relId) => products.find((p) => p.id === relId))
        .filter(Boolean) as Product[])
    : []

  return (
    <Container>
      <div className="py-6">
        <ProductDetail product={product} relatedProducts={relatedProducts} />
      </div>
    </Container>
  )
}
