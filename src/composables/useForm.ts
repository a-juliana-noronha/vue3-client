import { iUseForm } from '@/types'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'

export const useForm = <T>({
  service,
  notify = 'none',
  message,
  onBeforeSubmit,
  onSuccess,
  onError,
}: iUseForm<T>) => {
  const submitting = ref<boolean>(false)

  const toast = useToast()

  const notifySuccess = ['all', 'success'].includes(notify)
  const notifyError = ['all', 'error'].includes(notify)

  const handleSubmit = async (data): Promise<void> => {
    try {
      submitting.value = true

      const preparedData = onBeforeSubmit ? onBeforeSubmit(data) : data
      const response = await service(preparedData)

      if (onSuccess) {
        onSuccess(response)
      }

      if (notifySuccess) {
        toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: message,
          life: 3000,
        })
      }
    } catch (error: any) {
      console.error(error)

      if (onError) {
        onError(error)
      }

      if (notifyError) {
        toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: error?.response?.data?.error || error,
          life: 3000,
        })
      }
    } finally {
      submitting.value = false
    }
  }

  return {
    submitting,
    handleSubmit,
  }
}
