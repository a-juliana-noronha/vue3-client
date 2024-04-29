export type iBaseServiceCreate = Record<string, any>
export type iBaseServiceUpdate = iBaseServiceCreate & { id: number }

export type iFetchParams = {
  include?: string
} & Record<string, any>

export type iFetchOptions = {
  params?: iFetchParams
}

export type iBaseService<T> = {
  fetchAll: (options?: iFetchOptions) => Promise<T[]>
  fetch: (options?: iFetchOptions) => Promise<T>
  create: (data: iBaseServiceCreate) => Promise<void>
  update: (data: iBaseServiceUpdate) => Promise<void>
  remove: (id: number) => Promise<void>
}
