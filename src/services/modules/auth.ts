import api from '@/services/api'
import { iLoginParams, iLoginResponse } from '@/types'

const RESOURCE_URI = '/auth'

const login = ({ email, password }: iLoginParams): Promise<iLoginResponse> =>
  api.post(`${RESOURCE_URI}/login`, { email, password })

export default {
  login,
}
