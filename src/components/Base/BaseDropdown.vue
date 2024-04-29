<script setup lang="ts">
import { useFetch } from '@/composables'
import services from '@/services'
import { iDropdownOption } from '@/types'
import { computed, watch } from 'vue'

type iProps = {
  modelValue?: number | string | null
  service?: string
  options?: any[]
}

const props = withDefaults(defineProps<iProps>(), {
  modelValue: null,
  options: () => [],
  service: '',
})

type iEmits = {
  (event: 'update:model-value', value: any)
}

const emit = defineEmits<iEmits>()

const handler = computed<any>(() =>
  props.service
    ? services[props.service].fetchAll
    : () => new Promise((resolve) => resolve(props.options))
)

const { loading, data } = useFetch<any>({
  initialValue: [],
  handler: handler.value,
  immediate: true,
})

const handleInput = (value: number): void => {
  emit('update:model-value', value)
}

const optionValue = (value: iDropdownOption): number | string => value.id

const defaultValue = computed<number | null>(
  () => data.value.find(({ is_default }) => is_default)?.id || null
)

watch(
  () => defaultValue.value,
  (current) => {
    if (current) {
      handleInput(current)
    }
  }
)
</script>

<template>
  <Dropdown
    :model-value="modelValue"
    :options="data"
    :loading="loading"
    :option-value="optionValue"
    option-label="name"
    @update:model-value="handleInput"
  />
</template>
