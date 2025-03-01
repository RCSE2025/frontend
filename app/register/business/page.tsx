'use client'

import { useRouter } from 'next/navigation'
import { RegisterBusinessForm } from '../components/business-form'
import { checkStatus, createBusiness } from '@/shared/api/business/methods'
import { CreateBusiness, CheckSelfEmployed } from '@/shared/api/business/types'
import { toast } from 'sonner'
import { Container } from '@/components/shared/container'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BriefcaseBusiness, User } from 'lucide-react'
import { RegisterSelfEmployedForm } from '../components/self-employed-form'
import Link from 'next/link'
import { UserRole } from '@/shared/api/user/types'
import { useUser } from '@/shared/store/useUser'

export default function RegisterAgent() {
  const router = useRouter()

  const { user, fetchUser, patchUser } = useUser()

  const onSubmit = async (request: CreateBusiness) => {
    createBusiness(request)
      .then(() => {
        if (user.role === UserRole.USER)
          patchUser({
            role: request.ogrn ? UserRole.SELLER : UserRole.SELF_EMPLOYED
          })
        router.push('/')
      })
      .catch(() => {
        toast.error('Что-то пошло не так')
      })
  }

  const onSubmitSelfEmployed = async (request: CheckSelfEmployed) => {
    const onError = () => {
      toast.error(
        <div>
          Вы не самозанятый!{' '}
          <Link
            href="https://www.gosuslugi.ru/help/news/2019_08_30_registraciya_samozanyatyh"
            className="underline"
            target="_blank"
          >
            Стать самозанятым
          </Link>
        </div>
      )
    }

    checkStatus(request.inn)
      .then(async (status) => {
        if (!status.status) {
          onError()
          return
        }

        await onSubmit({
          inn: request.inn
        })
      })
      .catch(() => {
        onError()
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
            onSubmit={onSubmitSelfEmployed}
            className="w-[40%] p-5 self-center bg-background"
          />
        </TabsContent>
      </Tabs>
    </Container>
  )
}
