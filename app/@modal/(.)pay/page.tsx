'use client'

import { PageModal } from '@/components/shared/modal'
import { Title } from '@/components/shared/title'
import { Ton } from '@/components/shared/ton'
import { Button } from '@/components/ui/button'
import { TON_PRICE } from '@/config'

export default function Pay() {
  const amount = 1000

  return (
    <PageModal>
      <div className="flex flex-col gap-4">
        <Title>Оплата ₽{amount}</Title>
        <Button className="bg-theme w-full">UKassa</Button>
        <Ton amount={amount / TON_PRICE} onSend={console.log} className="w-[200px]" />
      </div>
    </PageModal>
  )
}
