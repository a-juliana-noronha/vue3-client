import { iFetchOptions } from '@/types'
import { computed, onMounted, ref } from 'vue'

type iUseFetch<T> = {
  initialValue
  handler: any
  options?: iFetchOptions
  reduce?: (data: any) => any
  // filter: any
  immediate?: boolean
}

export const useFetch = <T>({
  initialValue,
  handler,
  options,
  reduce = (data: T | T[]) => data,
  // reduce: (data: any) => data,
  // filter,
  immediate,
}: iUseFetch<T>) => {
  const data = ref<T | T[]>(initialValue)
  const loading = ref<boolean>(false)

  const error = ref<any>(null)

  const fetch = async (forceOptions = options) => {
    try {
      loading.value = true

      const response = await handler(forceOptions)

      data.value = reduce(response)
    } catch (er: any) {
      console.error(er)
      error.value = er
    } finally {
      loading.value = false
    }
  }

  if (immediate) {
    onMounted(fetch)
  }

  const isEmpty = computed<boolean>(
    () => Object.values(data.value).length === 0
  )

  return {
    loading,
    data,
    isEmpty,
    error,
    fetch,
  }
}
