'use client'

import { useUser } from '@/shared/store/useUser'

import { LoginForm } from '@/components/shared/login-form'
import { LoginRequest } from '@/shared/api/user/types'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function Login() {
  const { logIn, updateLoggedIn, sendResetPasswordEmail } = useUser()
  const router = useRouter()

  const onSubmit = async (request: LoginRequest) => {
    logIn(request)
      .then(() => {
        updateLoggedIn(true)

        router.push('/')
      })
      .catch(() => {
        toast.error('Неправильный логин или пароль')
      })
  }

  const onResetPassword = async (email: string) => {
    sendResetPasswordEmail(email)
      .then(() => {
        toast.success('Письмо отправлено')
      })
      .catch(() => {
        toast.error('Что-то пошло не так')
      })
  }

  return (
    <LoginForm
      onSubmit={onSubmit}
      onResetPassword={onResetPassword}
      className="self-center bg-background p-5 border-[1px] border-border rounded-lg"
    />
  )
}
