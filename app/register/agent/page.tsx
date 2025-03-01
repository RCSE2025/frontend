'use client'

import { useUser } from '@/shared/store/useUser'

import { useRouter } from 'next/navigation'
import { RegionalAgentCreateRequest } from '@/shared/api/agents/types'
import { Container } from '@/components/shared/container'
import { LoginForm } from '@/components/shared/login-form'
import { toast } from 'sonner'
import { RegisterAgentForm } from '../components/agent-form'
import { useAgent } from '@/shared/store/useAgent'

export default function RegisterAgent() {
  const { createAgent } = useAgent()
  const router = useRouter()

  const onSubmit = async (request: RegionalAgentCreateRequest) => {
    createAgent(request)
      .then(() => {
        router.push('/')
      })
      .catch(() => {
        toast.error('Что-то пошло не так')
      })
  }

  return (
    <Container className="flex items-start justify-center py-5 flex-col px-2 gap-5">
      <RegisterAgentForm
        onSubmit={onSubmit}
        className="w-[400px] self-center bg-background p-5 border-[1px] border-border rounded-lg"
      />
    </Container>
  )
}
