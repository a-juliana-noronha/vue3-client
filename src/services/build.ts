import api from '@/services/api'
import {
  iBaseService,
  iBaseServiceCreate,
  iBaseServiceUpdate,
  iFetchOptions,
  iFetchParams,
} from '@/types'

export const buildUrl = (url, params?: iFetchParams): string => {
  const { include, ...filter } = params || {}
  const searchParams = new URLSearchParams(filter)
    .toString()
    .replace(/(?:&|^)[^&]*?=(?=&|$)/g, '')

  return params?.include
    ? `${url}?include=${include}&${searchParams}`
    : `${url}?${searchParams}`
}

const build = <T>({ baseUrl }): iBaseService<T> => {
  const fetchAll = (options?: iFetchOptions): Promise<T[]> =>
    api.get(buildUrl(baseUrl, options?.params))

  const fetch = (options?: iFetchOptions): Promise<T> =>
    api.get(buildUrl(baseUrl, options?.params))

  const create = (data: iBaseServiceCreate): Promise<void> =>
    api.post(baseUrl, data)

  const update = (data: iBaseServiceUpdate): Promise<void> =>
    api.put(`${baseUrl}/${data.id}`, data)

  const remove = (id: number): Promise<void> => api.delete(`${baseUrl}/${id}`)

  return {
    fetchAll,
    fetch,
    create,
    update,
    remove,
  }
}

export default build
