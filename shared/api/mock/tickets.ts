import { Ticket, TicketComment, TicketFilters, TicketPriority, TicketStatus } from '@/shared/types'
import {
  AddTicketCommentRequest,
  CreateTicketRequest,
  GetTicketsResponse,
  UpdateTicketRequest
} from '../ticket/types'

// Mock data
const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Проблема с оплатой заказа',
    description:
      'Я попытался оплатить заказ №12345, но получил ошибку "Платеж отклонен". Деньги с карты списались, но заказ остался неоплаченным.',
    status: TicketStatus.OPEN,
    priority: TicketPriority.HIGH,
    createdAt: '2025-02-28T10:30:00Z',
    updatedAt: '2025-02-28T10:30:00Z',
    userId: 'user1',
    userName: 'Иван Петров',
    comments: []
  },
  {
    id: '2',
    title: 'Не пришло письмо с подтверждением',
    description:
      'Зарегистрировался на сайте, но письмо с подтверждением email не пришло. Проверял папку "Спам" - там тоже нет.',
    status: TicketStatus.IN_PROGRESS,
    priority: TicketPriority.MEDIUM,
    createdAt: '2025-02-27T15:45:00Z',
    updatedAt: '2025-02-28T09:15:00Z',
    userId: 'user2',
    userName: 'Анна Сидорова',
    assignedToId: 'admin1',
    assignedToName: 'Администратор Иван',
    comments: [
      {
        id: 'comment1',
        userId: 'user2',
        userName: 'Анна Сидорова',
        content: 'Уже сутки жду письмо, но ничего не приходит.',
        createdAt: '2025-02-27T16:30:00Z',
        isAdminComment: false
      },
      {
        id: 'comment2',
        userId: 'admin1',
        userName: 'Администратор Иван',
        content:
          'Здравствуйте! Проверили систему, обнаружили техническую проблему с отправкой писем. Сейчас исправляем. Пожалуйста, подождите еще немного.',
        createdAt: '2025-02-28T09:15:00Z',
        isAdminComment: true
      }
    ]
  },
  {
    id: '3',
    title: 'Товар пришел с дефектом',
    description:
      'Получил заказ №54321, но товар имеет видимые повреждения. Хочу вернуть деньги или заменить товар.',
    status: TicketStatus.CLOSED,
    priority: TicketPriority.MEDIUM,
    createdAt: '2025-02-25T12:00:00Z',
    updatedAt: '2025-02-27T14:20:00Z',
    userId: 'user3',
    userName: 'Петр Иванов',
    assignedToId: 'admin2',
    assignedToName: 'Администратор Мария',
    comments: [
      {
        id: 'comment3',
        userId: 'user3',
        userName: 'Петр Иванов',
        content: 'Прикрепляю фото дефекта.',
        createdAt: '2025-02-25T12:30:00Z',
        isAdminComment: false
      },
      {
        id: 'comment4',
        userId: 'admin2',
        userName: 'Администратор Мария',
        content:
          'Здравствуйте! Приносим извинения за доставленные неудобства. Пожалуйста, отправьте товар обратно, мы возместим стоимость доставки и заменим товар.',
        createdAt: '2025-02-26T10:15:00Z',
        isAdminComment: true
      },
      {
        id: 'comment5',
        userId: 'user3',
        userName: 'Петр Иванов',
        content: 'Спасибо, отправил товар обратно. Номер отслеживания: 123456789.',
        createdAt: '2025-02-26T16:45:00Z',
        isAdminComment: false
      },
      {
        id: 'comment6',
        userId: 'admin2',
        userName: 'Администратор Мария',
        content: 'Получили ваш товар. Новый отправлен сегодня. Номер отслеживания: 987654321.',
        createdAt: '2025-02-27T14:20:00Z',
        isAdminComment: true
      }
    ]
  },
  {
    id: '4',
    title: 'Вопрос по доставке',
    description: 'Когда будет доставка в Новосибирск? На сайте нет информации.',
    status: TicketStatus.OPEN,
    priority: TicketPriority.LOW,
    createdAt: '2025-03-01T09:00:00Z',
    updatedAt: '2025-03-01T09:00:00Z',
    userId: 'user4',
    userName: 'Елена Смирнова',
    comments: []
  },
  {
    id: '5',
    title: 'Не работает промокод',
    description:
      'Пытаюсь применить промокод SALE25, но система выдает ошибку "Недействительный промокод".',
    status: TicketStatus.IN_PROGRESS,
    priority: TicketPriority.LOW,
    createdAt: '2025-02-28T18:30:00Z',
    updatedAt: '2025-03-01T10:15:00Z',
    userId: 'user5',
    userName: 'Алексей Козлов',
    assignedToId: 'admin1',
    assignedToName: 'Администратор Иван',
    comments: [
      {
        id: 'comment7',
        userId: 'admin1',
        userName: 'Администратор Иван',
        content: 'Здравствуйте! Проверим работу промокода и вернемся к вам с ответом.',
        createdAt: '2025-03-01T10:15:00Z',
        isAdminComment: true
      }
    ]
  }
]

const mockAdmins = [
  { id: 'admin1', name: 'Администратор Иван' },
  { id: 'admin2', name: 'Администратор Мария' },
  { id: 'admin3', name: 'Администратор Алексей' }
]

// Helper functions
const filterTickets = (tickets: Ticket[], filters?: TicketFilters): Ticket[] => {
  if (!filters) return [...tickets]

  return tickets.filter((ticket) => {
    // Filter by status
    if (filters.status?.length && !filters.status.includes(ticket.status)) {
      return false
    }

    // Filter by priority
    if (filters.priority?.length && !filters.priority.includes(ticket.priority)) {
      return false
    }

    // Filter by assigned admin
    if (filters.assignedToId && ticket.assignedToId !== filters.assignedToId) {
      return false
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      return (
        ticket.title.toLowerCase().includes(query) ||
        ticket.description.toLowerCase().includes(query) ||
        ticket.userName.toLowerCase().includes(query)
      )
    }

    return true
  })
}

const sortTickets = (tickets: Ticket[], sortBy?: string): Ticket[] => {
  const sortedTickets = [...tickets]

  if (!sortBy) return sortedTickets

  switch (sortBy) {
    case 'createdAt-asc':
      return sortedTickets.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    case 'createdAt-desc':
      return sortedTickets.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    case 'priority-asc':
      return sortedTickets.sort((a, b) => {
        const priorityOrder = {
          [TicketPriority.LOW]: 1,
          [TicketPriority.MEDIUM]: 2,
          [TicketPriority.HIGH]: 3
        }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      })
    case 'priority-desc':
      return sortedTickets.sort((a, b) => {
        const priorityOrder = {
          [TicketPriority.LOW]: 1,
          [TicketPriority.MEDIUM]: 2,
          [TicketPriority.HIGH]: 3
        }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      })
    default:
      return sortedTickets
  }
}

// Mock API functions
export const mockGetTickets = (
  filters?: TicketFilters,
  page: number = 1,
  limit: number = 10
): Promise<GetTicketsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredTickets = filterTickets(mockTickets, filters)
      filteredTickets = sortTickets(filteredTickets, filters?.sortBy)

      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedTickets = filteredTickets.slice(startIndex, endIndex)

      resolve({
        tickets: paginatedTickets,
        total: filteredTickets.length
      })
    }, 500) // Simulate network delay
  })
}

export const mockGetTicketById = (id: string): Promise<Ticket> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ticket = mockTickets.find((t) => t.id === id)

      if (ticket) {
        resolve({ ...ticket })
      } else {
        reject(new Error('Ticket not found'))
      }
    }, 500)
  })
}

export const mockCreateTicket = (request: CreateTicketRequest): Promise<Ticket> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTicket: Ticket = {
        id: `${mockTickets.length + 1}`,
        title: request.title,
        description: request.description,
        status: TicketStatus.OPEN,
        priority: request.priority,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'user1', // Mock user ID
        userName: 'Текущий пользователь',
        comments: []
      }

      mockTickets.push(newTicket)
      resolve(newTicket)
    }, 500)
  })
}

export const mockUpdateTicket = (request: UpdateTicketRequest): Promise<Ticket> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockTickets.findIndex((t) => t.id === request.id)

      if (index !== -1) {
        const ticket = { ...mockTickets[index] }

        if (request.status) {
          ticket.status = request.status
        }

        if (request.priority) {
          ticket.priority = request.priority
        }

        if (request.assignedToId !== undefined) {
          ticket.assignedToId = request.assignedToId
          ticket.assignedToName = request.assignedToId
            ? mockAdmins.find((a) => a.id === request.assignedToId)?.name ||
              'Неизвестный администратор'
            : undefined
        }

        ticket.updatedAt = new Date().toISOString()

        mockTickets[index] = ticket
        resolve(ticket)
      } else {
        reject(new Error('Ticket not found'))
      }
    }, 500)
  })
}

export const mockDeleteTicket = (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockTickets.findIndex((t) => t.id === id)

      if (index !== -1) {
        mockTickets.splice(index, 1)
        resolve()
      } else {
        reject(new Error('Ticket not found'))
      }
    }, 500)
  })
}

export const mockAddTicketComment = (request: AddTicketCommentRequest): Promise<Ticket> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockTickets.findIndex((t) => t.id === request.ticketId)

      if (index !== -1) {
        const ticket = { ...mockTickets[index] }

        const newComment: TicketComment = {
          id: `comment${Date.now()}`,
          userId: 'admin1', // Mock admin ID
          userName: 'Администратор Иван', // Mock admin name
          content: request.content,
          createdAt: new Date().toISOString(),
          isAdminComment: true
        }

        ticket.comments = [...ticket.comments, newComment]
        ticket.updatedAt = new Date().toISOString()

        mockTickets[index] = ticket
        resolve(ticket)
      } else {
        reject(new Error('Ticket not found'))
      }
    }, 500)
  })
}

export const mockGetAdmins = (): Promise<{ id: string; name: string }[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockAdmins])
    }, 500)
  })
}
