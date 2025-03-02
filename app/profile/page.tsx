'use client'

import { Container } from '@/components/shared/container'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Flag, ShoppingBag, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { OrderHistory } from './components/order-history'
import { UserProfile } from './components/user-profile'

export default function Profile() {
  const router = useRouter()

  return (
    <Container className="p-5">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Профиль
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingBag className="h-4 w-4 mr-2" />
            История покупок
          </TabsTrigger>
          <TabsTrigger value="tickets" onClick={() => router.push('/profile/tickets')}>
            <Flag className="h-4 w-4 mr-2" />
            Тикеты с тех. поддержкой
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0">
          <UserProfile />
        </TabsContent>

        <TabsContent value="orders" className="mt-0">
          <OrderHistory />
        </TabsContent>

        <TabsContent value="tickets" className="mt-0"></TabsContent>
      </Tabs>
    </Container>
  )
}
