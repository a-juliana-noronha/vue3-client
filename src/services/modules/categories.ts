import build from '@/services/build'
import { iCategory } from '@/types'

export default build<iCategory>({
  baseUrl: '/categories',
})
