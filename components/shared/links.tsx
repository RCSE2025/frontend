'use client'

import { cn } from '@/lib/utils'
import { UserRole } from '@/shared/api/user/types'
import { useUser } from '@/shared/store/useUser'
import { BriefcaseBusiness, FileSliders, ShoppingBag, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Container } from './container'
import { Title } from './title'

const links = [
  { href: '/catalog', text: 'Каталог' },
  { href: '/profile', text: 'Профиль', loggedIn: true },
  { href: '/login', text: 'Вход', loggedIn: false }
]

interface Props {
  className?: string
}

export const Links: React.FC<Props> = ({ className }) => {
  const pathname = usePathname()

  const { loggedIn, fetchUser, updateLoggedIn, user } = useUser()

  React.useEffect(() => {
    fetchUser()
      .then(() => updateLoggedIn(true))
      .catch(() => updateLoggedIn(false))
  }, [fetchUser, updateLoggedIn])

  const isAdminAccessed = user.role === UserRole.ROOT
  const adminLink = user.role === UserRole.ROOT ? '/admin' : '/agent'

  const isSellerAccessed = user.role === UserRole.SELLER || user.role === UserRole.SELF_EMPLOYED

  const isPasportVerified = user.is_pasport_verified

  return (
    <Container
      className={cn(
        'flex items-center justify-between mx-5 xl:mx-[auto] flex-col md:flex-row gap-5 md:gap-[auto]',
        className
      )}
    >
      {links
        .filter((link) => link.loggedIn === undefined || link.loggedIn === loggedIn)
        .map(({ href, text }) => (
          <Link key={href} href={href}>
            <Title
              text={text}
              size="xs"
              className={cn({
                underline: pathname.startsWith(href),
                '': !pathname.startsWith(href)
              })}
            />
          </Link>
        ))}

      {isPasportVerified && (
        <Link href="/register/business">
          <Title
            size="xs"
            className={cn('flex flex-row gap-1 items-center', {
              underline: pathname.startsWith('/register/business'),
              'bg-transparent': !pathname.startsWith('/register/business')
            })}
          >
            <BriefcaseBusiness />
            Продавать на Ryazan Market
          </Title>
        </Link>
      )}

      {isAdminAccessed && (
        <Link href={adminLink}>
          <Title
            size="xs"
            className={cn('flex flex-row gap-1 items-center', {
              underline: pathname.startsWith(adminLink),
              'bg-transparent': !pathname.startsWith(adminLink)
            })}
          >
            <FileSliders />
            Админ-панель
          </Title>
        </Link>
      )}

      {isSellerAccessed && (
        <Link href="/seller-dashboard">
          <Title
            size="xs"
            className={cn('flex flex-row gap-1 items-center', {
              underline: pathname.startsWith('/seller-dashboard'),
              'bg-transparent': !pathname.startsWith('/seller-dashboard')
            })}
          >
            <ShoppingBag />
            Панель продавца
          </Title>
        </Link>
      )}

      <Link href="/cart">
        <Title
          size="xs"
          className={cn('flex flex-row gap-1 items-center', {
            underline: pathname.startsWith('/cart'),
            'bg-transparent': !pathname.startsWith('/cart')
          })}
        >
          <ShoppingCart />
          Корзина
        </Title>
      </Link>
    </Container>
  )
}
