<script setup lang="ts">
import { iDropdownOption } from '@/types'

type iProps = {
  modelValue?: number | string
}

withDefaults(defineProps<iProps>(), {
  modelValue: '',
})

type iEmits = {
  (event: 'update:model-value', value: any)
}

const emit = defineEmits<iEmits>()

const handleInput = (value: iDropdownOption): void => {
  emit('update:model-value', value)
}

const optionValue = (value: iDropdownOption): number | string => value.id

const options: iDropdownOption[] = [
  {
    id: 'checking',
    name: 'Conta Corrente',
  },
  {
    id: 'saving',
    name: 'Conta Poupança',
  },
]
</script>

<template>
  <Dropdown
    :model-value="modelValue"
    :options="options"
    filter
    option-label="name"
    :option-value="optionValue"
    placeholder="Selecione um tipo de conta"
    @update:model-value="handleInput"
  />
</template>
