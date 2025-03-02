'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { TicketComment, TicketStatus, ticketStatusMap } from '@/shared/api/ticket/types'
import { useTickets } from '@/shared/store/useTickets'
import { useUser } from '@/shared/store/useUser'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useEffect, useState } from 'react'

interface UserTicketDetailProps {
  ticketId: string
}

export const UserTicketDetail = ({ ticketId }: UserTicketDetailProps) => {
  const { currentTicket, loading, fetchTicketById, addComment } = useTickets()
  const { user } = useUser()
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchTicketById(ticketId)
  }, [ticketId, fetchTicketById])

  const handleAddComment = async () => {
    if (!comment.trim() || !currentTicket) return

    setIsSubmitting(true)
    try {
      await addComment({
        ticketId: currentTicket.id,
        text: comment,
        username: user.email
      })
      setComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusBadgeColor = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.OPEN:
        return 'bg-blue-500'
      case TicketStatus.IN_PROGRESS:
        return 'bg-yellow-500'
      case TicketStatus.CLOSED:
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8">Загрузка...</div>
  }

  if (!currentTicket) {
    return <div className="flex justify-center p-8">Тикет не найден</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{currentTicket.title}</h1>
          <p className="text-muted-foreground">ID: {currentTicket.id}</p>
        </div>
        <Button variant="outline" asChild>
          <a href="/profile/tickets">Назад к списку</a>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Информация о тикете</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Статус</p>
              <Badge className={getStatusBadgeColor(currentTicket.status)}>
                {ticketStatusMap[currentTicket.status as TicketStatus]}
              </Badge>
            </div>

            <div>
              <p className="text-sm font-medium">Создан</p>
              <p>
                {format(new Date(currentTicket.created_at), 'dd MMMM yyyy HH:mm', { locale: ru })}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Последнее обновление</p>
              <p>
                {format(new Date(currentTicket.updated_at), 'dd MMMM yyyy HH:mm', { locale: ru })}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Описание</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{currentTicket.description}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Комментарии</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentTicket.comments.length === 0 ? (
            <p className="text-muted-foreground">Нет комментариев</p>
          ) : (
            currentTicket.comments.map((comment: TicketComment) => (
              <div key={comment.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium flex items-center gap-2">
                    {comment.username === user.email ? 'Вы' : 'Поддержка'}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(comment.created_at), 'dd MMM yyyy HH:mm', { locale: ru })}
                  </span>
                </div>
                <p className="whitespace-pre-wrap">{comment.text}</p>
              </div>
            ))
          )}
        </CardContent>
        {currentTicket.status !== TicketStatus.CLOSED && (
          <CardFooter className="flex flex-col space-y-4">
            <Separator />
            <div className="w-full space-y-4">
              <Textarea
                placeholder="Добавить комментарий..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
              <Button 
                onClick={handleAddComment} 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Отправить комментарий'}
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}