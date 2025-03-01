'use client'

import { ShopItem } from '@/components/shared/item'
import { PageModal } from '@/components/shared/modal'
import { useParams } from 'next/navigation'

const mockItem = {
  name: 'Test Item',
  description: 'This is a test item',
  id: 1,
  price: 10.99,
  quantity: 5,
  images: ['https://basket-14.wbbasket.ru/vol2148/part214887/214887827/images/big/1.webp'],
  reviews: 5,
  rating: 4.5
}

export default function Item() {
  const params = useParams<{ id: string }>()

  const id = parseInt(params.id)

  return (
    <PageModal>
      <ShopItem {...mockItem} />
    </PageModal>
  )
}
