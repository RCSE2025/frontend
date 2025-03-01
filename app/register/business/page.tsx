'use client'

import { useRouter } from 'next/navigation'
import { RegisterBusinessForm } from '../components/business-form'
import { createBusiness } from '@/shared/api/business/methods'
import { CreateBusiness } from '@/shared/api/business/types'
import { toast } from 'sonner'

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
    <RegisterBusinessForm onSubmit={onSubmit} className="w-[40%] p-5 self-center bg-background" />
  )
}
