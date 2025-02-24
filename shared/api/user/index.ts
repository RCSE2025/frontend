import {
  deleteUser,
  getUser,
  logIn,
  logOut,
  refreshToken,
  resetPassword,
  sendEmail,
  sendResetPasswordEmail,
  signUp,
  updateUser,
  verifyEmail
} from './methods'

export const userApi = {
  getUser,
  logIn,
  signUp,
  deleteUser,
  logOut,
  refreshToken,
  sendEmail,
  verifyEmail,
  updateUser,
  resetPassword,
  sendResetPasswordEmail
}
