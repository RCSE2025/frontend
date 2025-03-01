'use client'

import { PageModal } from '@/components/shared/modal'
import { PasportForm } from './components/verify_form'
import { Container } from '@/components/shared/container'

export default function Pasport() {
  return (
    <Container className="w-[400px] self-center bg-background p-5 border-[1px] border-border rounded-lg mt-10">
      <PasportForm
        onSubmit={console.log}
        className="w-auto justify-center bg-background p-5 border-[1px] border-border rounded-lg"
      />
    </Container>
  )
}
