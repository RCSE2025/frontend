'use client'

import { useRouter } from 'next/navigation'
import { RegisterBusinessForm } from '../components/business-form'
import { createBusiness } from '@/shared/api/business/methods'
import { CreateBusiness } from '@/shared/api/business/types'
import { toast } from 'sonner'
import { Container } from '@/components/shared/container'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BriefcaseBusiness, User } from 'lucide-react'
import { RegisterSelfEmployedForm } from '../components/self-employed-form'

export default function RegisterAgent() {
  const router = useRouter()

  const onSubmit = async (request: CreateBusiness) => {
    createBusiness(request)
      .then(() => {
        router.push('/')
      })
      .catch(() => {
        toast.error('Что-то пошло не так')
      })
  }

  return (
    <Container className="p-5">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">
            <BriefcaseBusiness className="h-4 w-4 mr-2" />
            Юридическое лицо
          </TabsTrigger>
          <TabsTrigger value="orders">
            <User className="h-4 w-4 mr-2" />
            Самозанятый
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0">
          <RegisterBusinessForm
            onSubmit={onSubmit}
            className="w-[40%] p-5 self-center bg-background"
          />
        </TabsContent>

        <TabsContent value="orders" className="mt-0">
          <RegisterSelfEmployedForm
            onSubmit={onSubmit}
            className="w-[40%] p-5 self-center bg-background"
          />
        </TabsContent>
      </Tabs>
    </Container>
  )
}
