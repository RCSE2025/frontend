'use client'

import { Container } from '@/components/shared/container'
import { ResetPasswordForm } from '@/components/shared/reset-password-form'
import { Title } from '@/components/shared/title'
import { useUser } from '@/shared/store/useUser'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export default function ResetPassword() {
  const { resetPassword } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()

  const onSubmit = async ({ password }: { password: string }) => {
    resetPassword({
      password,
      token: searchParams.get('token')!
    })
      .then(() => {
        router.push('/')
      })
      .catch(() => {
        toast.error('Что-то пошло не так')
      })
  }

  return (
    <div className="my-20">
      <div className="flex flex-col">
        <Title className="self-center font-bold" size="xl">
          Восстановление пароля
        </Title>
        <Title className="self-center" size="lg">
          личный кабинет
        </Title>
      </div>
      <Container className="flex items-start justify-center py-5 flex-col px-2 gap-5">
        <ResetPasswordForm
          onSubmit={onSubmit}
          className="w-[400px] self-center bg-background p-5 border-[1px] border-border rounded-lg"
        />
      </Container>
    </div>
  )
}
