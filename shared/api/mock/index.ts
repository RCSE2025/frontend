import {
  mockGetTickets,
  mockGetTicketById,
  mockCreateTicket,
  mockUpdateTicket,
  mockDeleteTicket,
  mockAddTicketComment,
  mockGetAdmins
} from './tickets'

import {
  mockSignUp,
  mockLogIn,
  mockGetUser,
  mockDeleteUser,
  mockRefreshToken,
  mockLogOut,
  mockSendEmail,
  mockVerifyEmail,
  mockUpdateUser,
  mockResetPassword,
  mockSendResetPasswordEmail,
  mockGetAllUsers
} from './users'

export const MockAPI = {
  Ticket: {
    getTickets: mockGetTickets,
    getTicketById: mockGetTicketById,
    createTicket: mockCreateTicket,
    updateTicket: mockUpdateTicket,
    deleteTicket: mockDeleteTicket,
    addTicketComment: mockAddTicketComment,
    getAdmins: mockGetAdmins
  },
  User: {
    signUp: mockSignUp,
    logIn: mockLogIn,
    getUser: mockGetUser,
    deleteUser: mockDeleteUser,
    refreshToken: mockRefreshToken,
    logOut: mockLogOut,
    sendEmail: mockSendEmail,
    verifyEmail: mockVerifyEmail,
    updateUser: mockUpdateUser,
    resetPassword: mockResetPassword,
    sendResetPasswordEmail: mockSendResetPasswordEmail,
    getAllUsers: mockGetAllUsers
  }
}
