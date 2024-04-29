import api from '@/services/api'
import build from '@/services/build'
import { iUser } from '@/types'

const baseUrl = '/users'

const me = () => api.get(`${baseUrl}/me`)

// const refreshToken = ({ accessToken, refreshToken }) =>
//   api.post(`${RESOURCE_URI}/refreshToken`, { accessToken, refreshToken })

// const signUp = ({ name, email, password, passwordConfirmation }) =>
//   api.post(`${RESOURCE_URI}/signUp`, {
//     name,
//     email,
//     password,
//     passwordConfirmation
//   })

// const recoverPassword = ({ email }) =>
//   api.post(`${RESOURCE_URI}/recoverPassword`, { email })

// const activateAccount = (token) => api.post(`${RESOURCE_URI}/activate/${token}`)

// const resendActivation = ({ email }) =>
//   api.post(`${RESOURCE_URI}/resendActivation`, { email })

// const resetPassword = ({ token, password, passwordConfirmation }) =>
//   api.put(`${RESOURCE_URI}/resetPassword`, {
//     token,
//     password,
//     passwordConfirmation
//   })

// const validateToken = (token) =>
//   api.get(`${RESOURCE_URI}/validateToken/${token}`)

// const updatePassword = ({ currentPassword, newPassword }) =>
//   api.post(`${RESOURCE_URI}/updatePassword`, { currentPassword, newPassword })

export default {
  ...build<iUser>({
    baseUrl,
  }),
  me,
  // refreshToken,
  // fetchLoggedUser,
  // signUp,
  // recoverPassword,
  // activateAccount,
  // resetPassword,
  // validateToken,
  // updatePassword,
  // resendActivation
}
