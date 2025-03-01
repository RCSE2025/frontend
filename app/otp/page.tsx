'use client'

import { Container } from '@/components/shared/container'
import { Title } from '@/components/shared/title'
import { VerifyEmailForm } from '@/components/shared/verify-email-form'
import { useUser } from '@/shared/store/useUser'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function OTP() {
  const { verifyEmail } = useUser()
  const router = useRouter()

  const onSubmit = async ({ code }: { code: string }) => {
    verifyEmail(code)
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
        <Title className="self-center font-bold" size="xs">
          Подтверждение
        </Title>
        <Title className="self-center" size="xs">
          E-mail
        </Title>
      </div>
      <Container className="flex items-start justify-center py-5 flex-col px-2 gap-5">
        <VerifyEmailForm
          onSubmit={onSubmit}
          className="w-[400px] self-center bg-background p-5 border-[1px] border-border rounded-lg"
        />
      </Container>
    </div>
  )
}
