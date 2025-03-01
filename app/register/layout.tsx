'use client'

import { Container } from '@/components/shared/container'
import { Title } from '@/components/shared/title'

export default function RegisterLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Container className="w-[90%] self-center bg-background p-5 border-[1px] border-border rounded-lg">
      <div className="flex flex-col p-5">
        <Title className="font-bold" size="lg">
          Регистрация продавца. Заполнение анкеты
        </Title>
      </div>
      {children}
    </Container>
  )
}
