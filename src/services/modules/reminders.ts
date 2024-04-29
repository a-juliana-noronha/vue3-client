import api from '@/services/api'
import build, { buildUrl } from '@/services/build'
import { iFetchOptions, iReminder } from '@/types'

const baseUrl = '/reminders'

const transactionsService = build<iReminder>({ baseUrl })

const summary = (options?: iFetchOptions): Promise<iReminder[]> =>
  api.get(buildUrl(`${baseUrl}/summary`, options?.params))

export default {
  ...transactionsService,
  summary,
}
