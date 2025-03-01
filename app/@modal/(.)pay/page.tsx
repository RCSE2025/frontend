'use client'

import { PageModal } from '@/components/shared/modal'
import { Title } from '@/components/shared/title'
import { Ton } from '@/components/shared/ton'
import { Button } from '@/components/ui/button'

export default function Pay() {
  return (
    <PageModal>
      <div className="flex flex-col gap-4">
        <Title>Оплата 52 руб</Title>
        <Button className="bg-theme w-full">UKassa</Button>
        <Ton amount={0.01} onSend={console.log} className="w-[200px]" />
      </div>
    </PageModal>
  )
}
