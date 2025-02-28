import { API } from '../api'
import {
  User,
  LoginRequest,
  SignupRequest,
  UpdateUserRequest,
  ResetPassword
} from '../api/user/types'
import { create } from 'zustand'

interface IUserStore {
  user: User
  loggedIn: boolean
  updateLoggedIn: (loggedIn: boolean) => void
  updateUser: (user: User) => void
  fetchUser: () => Promise<void>
  logIn: (request: LoginRequest) => Promise<void>
  signUp: (request: SignupRequest) => Promise<void>
  deleteUser: () => Promise<void>
  logOut: () => Promise<void>
  refreshToken: () => Promise<void>
  sendEmail: () => Promise<void>
  verifyEmail: (code: string) => Promise<void>
  patchUser: (user: UpdateUserRequest) => Promise<void>
  resetPassword: (request: ResetPassword) => Promise<void>
  sendResetPasswordEmail: (email: string) => Promise<void>
}

export const useUser = create<IUserStore>((set, get) => ({
  user: {} as User,
  loggedIn: false,
  updateLoggedIn: (loggedIn: boolean) => set({ loggedIn }),
  updateUser: (user: User) => set({ user }),
  fetchUser: async () => {
    const { updateUser } = get()

    const user = await API.User.getUser()

    updateUser(user)
  },
  logIn: async (request: LoginRequest) => {
    const { fetchUser } = get()

    await API.User.logIn(request)

    await fetchUser()
  },
  signUp: async (request: SignupRequest) => {
    const { fetchUser } = get()

    await API.User.signUp(request)

    await fetchUser()
  },
  deleteUser: async () => {
    set({ user: {} as User, loggedIn: false })

    await API.User.deleteUser()
  },
  logOut: async () => {
    set({ user: {} as User, loggedIn: false })

    await API.User.logOut()
  },
  refreshToken: async () => {
    API.User.refreshToken()
  },
  sendEmail: async () => {
    await API.User.sendEmail()
  },
  verifyEmail: async (code: string) => {
    await API.User.verifyEmail(code)
  },
  patchUser: async (user: UpdateUserRequest) => {
    await API.User.updateUser(user)

    set((prev) => ({
      user: { ...prev.user, ...user }
    }))
  },
  resetPassword: async (request: ResetPassword) => {
    await API.User.resetPassword(request)
  },
  sendResetPasswordEmail: async (email: string) => {
    await API.User.sendResetPasswordEmail(email)
  }
}))
