'use client'

import { PageModal } from '@/components/shared/modal'
import { Title } from '@/components/shared/title'
import { Ton } from '@/components/shared/ton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TON_PRICE } from '@/config'
import { createManualOrder, createYookassaOrder } from '@/shared/api/payments/methods'
import { useCart } from '@/shared/store/useCart'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Pay() {
  const [address, setAddress] = React.useState('')

  const { products, prices } = useCart()

  const [amount, setAmount] = React.useState(0)

  React.useEffect(() => {
    setAmount(
      Object.entries(products).reduce((acc, [id, quantity]) => acc + quantity * prices[id], 0)
    )
  })

  const router = useRouter()

  return (
    <PageModal>
      <div className="flex flex-col gap-4">
        <Title>Оплата ₽{amount}</Title>
        <Title>Введите адрес отправления</Title>
        <Input
          className="w-full"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button
          className="bg-theme w-full"
          onClick={async () => {
            const url = await createYookassaOrder(address)

            window.open(url, '_blank')

            window.location.href = '/'
          }}
        >
          YooKassa
        </Button>
        <Ton
          amount={amount / TON_PRICE}
          onSend={async () => {
            await createManualOrder(address)

            window.location.href = '/'
          }}
          className="w-full"
        />
      </div>
    </PageModal>
  )
}
