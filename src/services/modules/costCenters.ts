import build from '@/services/build'
import { iCostCenter } from '@/types'

export default build<iCostCenter>({
  baseUrl: '/cost_centers',
})
