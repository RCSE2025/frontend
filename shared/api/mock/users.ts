import {
  LoginRequest,
  ResetPassword,
  SignupRequest,
  UpdateUserRequest,
  User,
  UserRole
} from '../user/types'

// Mock user data
const mockUsers: User[] = [
  {
    id: 1,
    name: 'Иван',
    surname: 'Иванов',
    email: 'ivan@example.com',
    patronymic: 'Иванович',
    date_of_birth: new Date('1990-01-15'),
    role: UserRole.USER,
    is_pasport_verified: true
  },
  {
    id: 2,
    name: 'Анна',
    surname: 'Петрова',
    email: 'anna@example.com',
    patronymic: 'Сергеевна',
    date_of_birth: new Date('1985-05-20'),
    role: UserRole.SUPPORT,
    is_pasport_verified: true
  },
  {
    id: 3,
    name: 'Алексей',
    surname: 'Смирнов',
    email: 'alexey@example.com',
    patronymic: 'Дмитриевич',
    date_of_birth: new Date('1988-11-10'),
    role: UserRole.USER,
    is_pasport_verified: true
  },
  {
    id: 4,
    name: 'Мария',
    surname: 'Козлова',
    email: 'maria@example.com',
    patronymic: 'Александровна',
    date_of_birth: new Date('1992-07-25'),
    role: UserRole.SUPPORT,
    is_pasport_verified: true
  },
  {
    id: 5,
    name: 'Дмитрий',
    surname: 'Новиков',
    email: 'dmitry@example.com',
    patronymic: 'Андреевич',
    date_of_birth: new Date('1980-03-05'),
    role: UserRole.ROOT,
    is_pasport_verified: true
  },
  {
    id: 6,
    name: 'Елена',
    surname: 'Соколова',
    email: 'elena@example.com',
    patronymic: 'Игоревна',
    date_of_birth: new Date('1991-09-15'),
    role: UserRole.SELLER,
    is_pasport_verified: true
  }
]

// Current user state for mock session
let currentUser: User | null = null
let accessToken: string | null = null
let refreshToken: string | null = null

// Helper function to extract user ID from token
const extractUserIdFromToken = (token: string): number | null => {
  const match = token.match(/^mock-(access|refresh)-token-(\d+)-\d+$/)
  return match ? parseInt(match[2], 10) : null
}

// Mock API functions
export const mockSignUp = async (request: SignupRequest): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        id: mockUsers.length + 1,
        name: request.name,
        surname: request.surname,
        patronymic: request.patronymic,
        email: request.email,
        date_of_birth: request.date_of_birth,
        is_pasport_verified: true,
        role: UserRole.USER // Default role for new users
      }

      mockUsers.push(newUser)
      currentUser = newUser
      accessToken = `mock-access-token-${newUser.id}-${Date.now()}`
      refreshToken = `mock-refresh-token-${newUser.id}-${Date.now()}`

      // Simulate storing tokens in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('refresh_token', refreshToken)
      }

      resolve(newUser)
    }, 500) // Simulate network delay
  })
}

export const mockLogIn = async (request: LoginRequest): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // In a real mock, we would check the password, but for simplicity we'll just check the username/email
      const user = mockUsers.find((u) => u.email === request.username)

      if (user) {
        currentUser = user
        accessToken = `mock-access-token-${user.id}-${Date.now()}`
        refreshToken = `mock-refresh-token-${user.id}-${Date.now()}`

        // Simulate storing tokens in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', accessToken)
          localStorage.setItem('refresh_token', refreshToken)
        }

        resolve(user)
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 500)
  })
}

export const mockGetUser = async (): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (currentUser) {
        resolve({ ...currentUser })
      } else {
        // Check if we have a token in localStorage and try to use it
        const storedToken =
          typeof window !== 'undefined' ? localStorage.getItem('access_token') : null

        if (storedToken) {
          // Extract user ID from the token
          const userId = extractUserIdFromToken(storedToken)

          if (userId) {
            // Find the user with the matching ID
            const user = mockUsers.find((u) => u.id === userId)

            if (user) {
              currentUser = user
              resolve({ ...currentUser })
            } else {
              reject(new Error('User not found'))
            }
          } else {
            reject(new Error('Invalid token format'))
          }
        } else {
          reject(new Error('Not authenticated'))
        }
      }
    }, 500)
  })
}

export const mockDeleteUser = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (currentUser) {
        const index = mockUsers.findIndex((u) => u.id === currentUser?.id)
        if (index !== -1) {
          mockUsers.splice(index, 1)
        }
        currentUser = null
        accessToken = null
        refreshToken = null

        // Clear localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
        }

        resolve()
      } else {
        reject(new Error('Not authenticated'))
      }
    }, 500)
  })
}

export const mockRefreshToken = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (refreshToken) {
        // Extract user ID from the current refresh token
        const userId = extractUserIdFromToken(refreshToken)

        if (userId) {
          accessToken = `mock-access-token-${userId}-${Date.now()}`
          refreshToken = `mock-refresh-token-${userId}-${Date.now()}`

          // Update localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', accessToken)
            localStorage.setItem('refresh_token', refreshToken)
          }

          resolve()
        } else {
          reject(new Error('Invalid refresh token format'))
        }
      } else {
        reject(new Error('No refresh token available'))
      }
    }, 500)
  })
}

export const mockLogOut = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      currentUser = null
      accessToken = null
      refreshToken = null

      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
      }

      resolve()
    }, 500)
  })
}

export const mockSendEmail = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real implementation, this would send an email
      resolve()
    }, 500)
  })
}

export const mockVerifyEmail = async (code: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // For mock purposes, accept any code that's 6 digits
      if (/^\d{6}$/.test(code)) {
        resolve()
      } else {
        reject(new Error('Invalid verification code'))
      }
    }, 500)
  })
}

export const mockUpdateUser = async (user: UpdateUserRequest): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (currentUser) {
        const index = mockUsers.findIndex((u) => u.id === currentUser?.id)
        if (index !== -1) {
          mockUsers[index] = {
            ...mockUsers[index],
            ...user
          }
          currentUser = mockUsers[index]
        }
        resolve()
      } else {
        reject(new Error('Not authenticated'))
      }
    }, 500)
  })
}

export const mockResetPassword = async (request: ResetPassword): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // For mock purposes, accept any token that's not empty
      if (request.token && request.password) {
        resolve()
      } else {
        reject(new Error('Invalid token or password'))
      }
    }, 500)
  })
}

export const mockSendResetPasswordEmail = async (email: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if the email exists in our mock users
      const user = mockUsers.find((u) => u.email === email)
      if (user) {
        // In a real implementation, this would send an email with a reset link
        resolve()
      } else {
        // For security reasons, don't reveal that the email doesn't exist
        resolve()
      }
    }, 500)
  })
}

// Function to get all users (for admin purposes)
export const mockGetAllUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockUsers])
    }, 500)
  })
}
