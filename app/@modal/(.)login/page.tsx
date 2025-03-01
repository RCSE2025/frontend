'use client'

import { useUser } from '@/shared/store/useUser'

import { LoginForm } from '@/components/shared/login-form'
import { LoginRequest } from '@/shared/api/user/types'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { PageModal } from '@/components/shared/modal'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const pathname = usePathname()

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
    pathname === '/login' && (
      <PageModal>
        <LoginForm
          onSubmit={onSubmit}
          onResetPassword={onResetPassword}
          className="self-center bg-background p-5 border-[1px] border-border rounded-lg"
        />
        <div className="mt-2 text-center">
          Нет аккаунта?{' '}
          <Link href="/login/register" className="text-primary hover:underline cursor-pointer">
            Зарегистрироваться
          </Link>
        </div>
      </PageModal>
    )
  )
}
