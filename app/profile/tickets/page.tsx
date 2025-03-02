'use client'

import { Container } from '@/components/shared/container'
import { Title } from '@/components/shared/title'
import { Button } from '@/components/ui/button'
import { UserTicketList } from '@/components/shared/user-ticket-list'
import { useState } from 'react'
import { CreateTicketDialog } from '@/components/shared/create-ticket-dialog'
import { Card, CardContent } from '@/components/ui/card'
import { MessageSquarePlus } from 'lucide-react'

export default function TicketsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  return (
    <Container>
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <Title className="mb-2">Мои обращения</Title>
              <p className="text-muted-foreground">
                Здесь вы можете создавать обращения в службу поддержки и отслеживать их статус.
                Мы постараемся ответить вам как можно скорее.
              </p>
            </div>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              size="lg"
              className="gap-2"
            >
              <MessageSquarePlus className="w-5 h-5" />
              Создать обращение
            </Button>
          </div>
        </CardContent>
      </Card>

      <UserTicketList />
      
      <CreateTicketDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />
    </Container>
  )
}
