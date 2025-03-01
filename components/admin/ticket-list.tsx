'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import {
  Ticket,
  TicketFilters,
  TicketPriority,
  TicketStatus,
  ticketPriorityMap,
  ticketStatusMap
} from '@/shared/types'
import { Badge } from '@/components/ui/badge'
import { useTickets } from '@/shared/store/useTickets'
import { useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export const TicketList = () => {
  const {
    tickets,
    totalTickets,
    loading,
    filters,
    page,
    limit,
    setFilters,
    setPage,
    setLimit,
    fetchTickets
  } = useTickets()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all')
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'all'>('all')
  const [sortBy, setSortBy] = useState<TicketFilters['sortBy']>('createdAt-desc')

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets, filters, page, limit])

  const handleSearch = () => {
    const newFilters: TicketFilters = {
      ...filters,
      searchQuery
    }

    if (statusFilter && statusFilter !== 'all') {
      newFilters.status = [statusFilter]
    } else {
      delete newFilters.status
    }

    if (priorityFilter && priorityFilter !== 'all') {
      newFilters.priority = [priorityFilter]
    } else {
      delete newFilters.priority
    }

    if (sortBy) {
      newFilters.sortBy = sortBy
    }

    setFilters(newFilters)
  }

  const resetFilters = () => {
    setSearchQuery('')
    setStatusFilter('all')
    setPriorityFilter('all')
    setSortBy('createdAt-desc')
    setFilters({})
  }

  const totalPages = Math.ceil(totalTickets / limit)

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

  const getPriorityBadgeColor = (priority: TicketPriority) => {
    switch (priority) {
      case TicketPriority.HIGH:
        return 'bg-red-500'
      case TicketPriority.MEDIUM:
        return 'bg-orange-500'
      case TicketPriority.LOW:
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
          value={priorityFilter}
          onValueChange={(value: string) => setPriorityFilter(value as TicketPriority | 'all')}
        >
          <SelectTrigger className="md:w-1/6">
            <SelectValue placeholder="Приоритет" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все приоритеты</SelectItem>
            {Object.entries(ticketPriorityMap).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={sortBy || 'createdAt-desc'}
          onValueChange={(value) => setSortBy(value as TicketFilters['sortBy'])}
        >
          <SelectTrigger className="md:w-1/6">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt-desc">Сначала новые</SelectItem>
            <SelectItem value="createdAt-asc">Сначала старые</SelectItem>
            <SelectItem value="priority-desc">По приоритету (выс-низ)</SelectItem>
            <SelectItem value="priority-asc">По приоритету (низ-выс)</SelectItem>
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
              <TableHead>Приоритет</TableHead>
              <TableHead>Создан</TableHead>
              <TableHead>Пользователь</TableHead>
              <TableHead>Назначен</TableHead>
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
            ) : tickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  Тикеты не найдены
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id.slice(0, 8)}</TableCell>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(ticket.status)}>
                      {ticketStatusMap[ticket.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityBadgeColor(ticket.priority)}>
                      {ticketPriorityMap[ticket.priority]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(ticket.createdAt), 'dd MMM yyyy HH:mm', { locale: ru })}
                  </TableCell>
                  <TableCell>{ticket.userName}</TableCell>
                  <TableCell>{ticket.assignedToName || '—'}</TableCell>
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
