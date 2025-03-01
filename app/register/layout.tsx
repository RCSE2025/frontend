'use client'

import { Title } from '@/components/shared/title'
import { usePathname } from 'next/navigation'

export default function LoginLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className=" my-20">
      <div className="flex flex-col">
        <Title className="self-center font-bold" size="xl">
          Регистрация представителя
        </Title>
        <Title className="self-center" size="lg">
          личный кабинет
        </Title>
      </div>
      {children}
    </div>
  )
}
