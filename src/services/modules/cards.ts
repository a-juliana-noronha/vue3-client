import build from '@/services/build'
import { iCard } from '@/types'

export default build<iCard>({
  baseUrl: '/cards',
})
