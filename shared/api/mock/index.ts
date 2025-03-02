import {
  mockDeleteUser,
  mockGetAllUsers,
  mockGetUser,
  mockLogIn,
  mockLogOut,
  mockRefreshToken,
  mockResetPassword,
  mockSendEmail,
  mockSendResetPasswordEmail,
  mockSignUp,
  mockUpdateUser,
  mockVerifyEmail
} from './users'

export const MockAPI = {
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
