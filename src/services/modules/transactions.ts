import api from '@/services/api'
import build, { buildUrl } from '@/services/build'
import { iFetchOptions, iTransaction } from '@/types'

const baseUrl = '/transactions'

const transactionsService = build<iTransaction>({ baseUrl })

const recurrent = (options?: iFetchOptions): Promise<iTransaction[]> =>
  api.get(buildUrl(`${baseUrl}/recurrent`, options?.params))

export default {
  ...transactionsService,
  recurrent,
}
