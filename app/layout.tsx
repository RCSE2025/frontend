import { Header } from '@/components/shared/header'
import { Links } from '@/components/shared/links'
import { ThemeToggle } from '@/components/shared/theme-toggle'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'
import './globals.css'
import { TonProvider } from '@/components/shared/ton'
import { Bot } from 'lucide-react'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Ryazan market',
  description: 'Generated by create next app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-secondary-background')}>
        <Sonner />
        <Header className="bg-background">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="FSPHub Logo"
              width={32}
              height={32}
              priority
              className="dark:hidden"
            />
            <Image
              src="/logo.svg"
              alt="FSPHub Logo"
              width={32}
              height={32}
              priority
              className="hidden dark:block"
            />
          </Link>
          <div className="flex items-center justify-between gap-5 flex-col md:flex-row">
            <Links />
          </div>
        </Header>

        <TonProvider>
          <Suspense>
            <main className="min-h-[calc(100vh-78px)]">{children}</main> {modal}
          </Suspense>
        </TonProvider>

        <button className="position fixed bottom-5 right-5">
          <Link href="/support">
            <Bot className="w-10 h-10 cursor-pointer bg-white p-2 rounded-full" />
          </Link>
        </button>
      </body>
    </html>
  )
}
