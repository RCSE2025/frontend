'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { TicketStatus, ticketStatusMap } from '@/shared/api/ticket/types'
import { useTickets } from '@/shared/store/useTickets'
import { useUser } from '@/shared/store/useUser'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useEffect, useMemo, useState } from 'react'

export const UserTicketList = () => {
  const { tickets, loading, fetchUserTickets } = useTickets()
  const { user } = useUser()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [page, setPage] = useState(1)
  const limit = 10

  useEffect(() => {
    fetchUserTickets(user.email)
  }, [fetchUserTickets])

  const filteredTickets = useMemo(() => {
    let result = [...tickets]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(query) ||
          ticket.description.toLowerCase().includes(query)
      )
    }

    // Сортировка по дате создания (сначала новые)
    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return dateB - dateA
    })

    return result
  }, [tickets, searchQuery])

  const paginatedTickets = useMemo(() => {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    return filteredTickets.slice(startIndex, endIndex)
  }, [filteredTickets, page, limit])

  const totalPages = Math.ceil(filteredTickets.length / limit)

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

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Поиск по обращениям..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Заголовок</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Создано</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  Загрузка...
                </TableCell>
              </TableRow>
            ) : filteredTickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  Обращения не найдены
                </TableCell>
              </TableRow>
            ) : (
              paginatedTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(ticket.status)}>
                      {ticketStatusMap[ticket.status as TicketStatus]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(ticket.created_at), 'dd MMM yyyy HH:mm', { locale: ru })}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/profile/tickets/${ticket.id}`}>Просмотр</a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (page > 1) setPage(page - 1)
                }}
                className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setPage(pageNum)
                  }}
                  isActive={pageNum === page}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (page < totalPages) setPage(page + 1)
                }}
                className={page >= totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
