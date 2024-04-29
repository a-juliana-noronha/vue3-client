<script setup lang="ts">
import BaseDialog from '@/components/Base/BaseDialog.vue'
import services from '@/services'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'

type iProps = {
  visible: boolean
  service: string
  item: any
}

const props = defineProps<iProps>()

type iEmits = {
  (event: 'cancel'): void
  (event: 'success'): void
}

const emit = defineEmits<iEmits>()

const toast = useToast()
const loading = ref<boolean>(false)

const handleConfirm = async (): Promise<void> => {
  loading.value = true
  await services[props.service].remove(props.item.id)

  toast.add({
    severity: 'success',
    summary: 'Sucesso',
    detail: 'Registro removido com sucesso',
    life: 3000,
  })

  loading.value = false
  emit('success')
}
</script>

<template>
  <BaseDialog
    :visible="visible"
    class="p-fluid"
    header="Confirmar"
    icon="pi-exclamation-circle"
    cancel-label="Não"
    ok-label="Sim"
    :submitting="loading"
    @cancel="emit('cancel')"
    @confirm="handleConfirm"
  >
    <div class="flex gap-2 align-items-center">
      <i class="pi pi-exclamation-triangle text-2xl" />
      Deseja realmente remover este item?
    </div>
  </BaseDialog>
</template>
