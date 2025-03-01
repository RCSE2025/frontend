'use client'

import { useRouter } from 'next/navigation'
import { RegisterBusinessForm } from '../components/business-form'

export default function RegisterAgent() {
  const router = useRouter()

  // const onSubmit = async (request: RegionalAgentCreateRequest) => {
  //   createAgent(request)
  //     .then(() => {
  //       router.push('/')
  //     })
  //     .catch(() => {
  //       toast.error('Что-то пошло не так')
  //     })
  // }

  return (
    <RegisterBusinessForm
      onSubmit={() => console.log('test')}
      className="w-[40%] p-5 self-center bg-background"
    />
  )
}
