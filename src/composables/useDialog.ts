import { ref } from 'vue'

const useDialog = () => {
  const visible = ref<boolean>(false)

  const show = (): void => {
    visible.value = true
  }

  const hide = (): void => {
    visible.value = false
  }

  return {
    visible,
    show,
    hide,
  }
}

export default useDialog
