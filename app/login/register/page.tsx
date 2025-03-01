'use client'

import { useUser } from '@/shared/store/useUser'

import { SignUpForm } from '@/components/shared/signup-form'
import { SignupRequest } from '@/shared/api/user/types'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function SignUp() {
  const { signUp, updateLoggedIn } = useUser()
  const router = useRouter()

  const onSubmit = async (request: SignupRequest) => {
    signUp(request)
      .then(() => {
        updateLoggedIn(true)

        router.push('/otp')
      })
      .catch(() => {
        toast.error('Что-то пошло не так')
      })
  }

  return (
    <SignUpForm
      onSubmit={onSubmit}
      className="w-auto justify-center bg-background p-5 border-[1px] border-border rounded-lg"
    />
  )
}
