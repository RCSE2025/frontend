'use client'

import { Container } from '@/components/shared/container'
import { Title } from '@/components/shared/title'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/login/register', text: 'Регистрация' },
  { href: '/login', text: 'Вход' }
]

export default function LoginLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  return (
    <Container className="w-[90%] self-center bg-background p-5 border-[1px] border-border rounded-lg">
      <div className="flex flex-col">
        <Title className="self-center font-bold" size="lg">
          <Link className="text-blue-200" href={'/login'}>
            Войти
          </Link>{' '}
          или{' '}
          <Link className="text-blue-300" href={'/login/register'}>
            создать профиль
          </Link>
        </Title>
      </div>
      {children}
    </Container>
  )
}
