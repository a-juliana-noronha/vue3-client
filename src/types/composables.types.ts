export type iUseFormNotify = 'none' | 'all' | 'success' | 'error'

export type iUseForm<T> = {
  service: (data?: any) => Promise<T[] | T>
  notify?: iUseFormNotify
  message?: string
  onBeforeSubmit?: (data: T[] | T) => T[] | T
  onSuccess?: (data: T[] | T) => void
  onError?: (error: any) => void
}
