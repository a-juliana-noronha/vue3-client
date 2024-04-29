import build from '@/services/build'
import { iAccount } from '@/types'

export default build<iAccount>({
  baseUrl: '/accounts',
})
