<script setup lang="ts">
import { useFetch } from '@/composables'
import services from '@/services'
import { iDropdownOption } from '@/types'
import { computed } from 'vue'

type iProps = {
  modelValue: number[] | string[]
  service?: string
  options?: any[]
}

const props = withDefaults(defineProps<iProps>(), {
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

const handleInput = (value: iDropdownOption): void => {
  emit('update:model-value', value)
}

const optionValue = (value: iDropdownOption): number | string => value.id
</script>

<template>
  <MultiSelect
    :model-value="modelValue"
    :options="data"
    :loading="loading"
    :option-value="optionValue"
    option-label="name"
    @update:model-value="handleInput"
  />
</template>
