<script setup lang="ts">
import BaseLoading from '@/components/Base/BaseLoading.vue'
import { computed } from 'vue'

type iProps = {
  visible: boolean
  icon?: string
  loading?: boolean
  fullscreen?: boolean
  submitting?: boolean
  cancelLabel?: string
  okLabel?: string
  hideOk?: boolean
}

const props = withDefaults(defineProps<iProps>(), {
  loading: false,
  icon: '',
  fullscreen: false,
  submitting: false,
  cancelLabel: 'Cancelar',
  okLabel: 'Salvar',
})

type iEmits = {
  (event: 'update:visible', data: boolean): void
  (event: 'cancel'): void
  (event: 'confirm'): void
}

const emit = defineEmits<iEmits>()

const className = computed<string>(() => {
  const baseClass = 'p-fluid'
  const fullscreenClass = props.fullscreen ? 'p-fluid p-dialog-maximized' : ''

  return `${baseClass} ${fullscreenClass}`
})

const handleConfirm = (): void => {
  emit('confirm')
}

const handleCancel = (): void => {
  emit('cancel')
}

const handleUpdateVisible = (value: boolean): void => {
  if (!value) {
    handleCancel()
  }
}
</script>

<template>
  <Dialog
    :visible="visible"
    modal
    :class="className"
    @hide="handleCancel"
    @update:visible="handleUpdateVisible"
  >
    <BaseLoading v-if="loading" />

    <slot v-else />

    <template #footer>
      <slot name="footer">
        <Button
          v-if="!submitting"
          :label="cancelLabel"
          icon="pi pi-times"
          text
          @click="handleCancel"
        />
        <Button
          v-if="!hideOk"
          type="submit"
          :label="okLabel"
          icon="pi pi-check"
          :loading="submitting"
          @click="handleConfirm"
        />
      </slot>
    </template>
  </Dialog>
</template>
