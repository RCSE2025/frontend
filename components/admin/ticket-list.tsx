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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
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
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useEffect, useMemo, useState } from 'react'

export const TicketList = () => {
  const { tickets, loading, fetchTickets } = useTickets()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all')
  const [sortBy, setSortBy] = useState<'created_at-desc' | 'created_at-asc'>('created_at-desc')
  const [page, setPage] = useState(1)
  const limit = 10

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  const filteredTickets = useMemo(() => {
    let result = [...tickets]

    // Фильтрация по поиску
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(query) ||
          ticket.description.toLowerCase().includes(query) ||
          ticket.username.toLowerCase().includes(query)
      )
    }

    // Фильтрация по статусу
    if (statusFilter !== 'all') {
      result = result.filter((ticket) => ticket.status === statusFilter)
    }

    // Сортировка
    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortBy === 'created_at-desc' ? dateB - dateA : dateA - dateB
    })

    return result
  }, [tickets, searchQuery, statusFilter, sortBy])

  const paginatedTickets = useMemo(() => {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    return filteredTickets.slice(startIndex, endIndex)
  }, [filteredTickets, page, limit])

  const totalPages = Math.ceil(filteredTickets.length / limit)

  const handleSearch = () => {
    setPage(1) // Сброс страницы при поиске
  }

  const resetFilters = () => {
    setSearchQuery('')
    setStatusFilter('all')
    setSortBy('created_at-desc')
    setPage(1)
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Поиск по тикетам..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:w-1/3"
        />

        <Select
          value={statusFilter}
          onValueChange={(value: string) => setStatusFilter(value as TicketStatus | 'all')}
        >
          <SelectTrigger className="md:w-1/6">
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            {Object.entries(ticketStatusMap).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={sortBy || 'created_at-desc'}
          onValueChange={(value) => setSortBy(value as 'created_at-desc' | 'created_at-asc')}
        >
          <SelectTrigger className="md:w-1/6">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at-desc">Сначала новые</SelectItem>
            <SelectItem value="created_at-asc">Сначала старые</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button onClick={handleSearch}>Применить</Button>
          <Button variant="outline" onClick={resetFilters}>
            Сбросить
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Заголовок</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Создан</TableHead>
              <TableHead>Пользователь</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  Загрузка...
                </TableCell>
              </TableRow>
            ) : filteredTickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  Тикеты не найдены
                </TableCell>
              </TableRow>
            ) : (
              paginatedTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.title}</TableCell>

                  <TableCell>
                    <Badge className={getStatusBadgeColor(ticket.status)}>
                      {ticketStatusMap[ticket.status as TicketStatus]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(ticket.created_at), 'dd MMM yyyy HH:mm', { locale: ru })}
                  </TableCell>
                  <TableCell>{ticket.username}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/admin/tickets/${ticket.id}`}>Просмотр</a>
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
