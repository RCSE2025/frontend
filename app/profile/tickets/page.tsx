'use client'

import { Container } from '@/components/shared/container'
import { CreateTicketDialog } from '@/components/shared/create-ticket-dialog'
import { Title } from '@/components/shared/title'
import { UserTicketList } from '@/components/shared/user-ticket-list'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function TicketsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <Title>Мои обращения</Title>
        <Button onClick={() => setIsCreateDialogOpen(true)}>Создать обращение</Button>
      </div>

      <UserTicketList />

      <CreateTicketDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
    </Container>
  )
}
