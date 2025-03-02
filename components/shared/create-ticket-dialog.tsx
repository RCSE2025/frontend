'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useTickets } from '@/shared/store/useTickets'
import { useUser } from '@/shared/store/useUser'
import { useState } from 'react'
import { TicketStatus } from '@/shared/api/ticket/types'

interface CreateTicketDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CreateTicketDialog = ({ open, onOpenChange }: CreateTicketDialogProps) => {
  const { createTicket } = useTickets()
  const { user } = useUser()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return

    setIsSubmitting(true)
    try {
      await createTicket({
        title: title.trim(),
        description: description.trim(),
        status: TicketStatus.OPEN,
        username: user.email // Используем email как идентификатор пользователя
      })
      handleClose()
    } catch (error) {
      console.error('Error creating ticket:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setTitle('')
    setDescription('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Создать обращение</DialogTitle>
            <DialogDescription>
              Опишите вашу проблему или вопрос. Мы постараемся ответить как можно скорее.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Заголовок</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Кратко опишите проблему"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Подробно опишите вашу проблему или вопрос"
                required
                rows={5}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Отмена
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Создание...' : 'Создать'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}