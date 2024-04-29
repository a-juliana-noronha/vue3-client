<script setup lang="ts">
import { iDropdownOption } from '@/types'

type iProps = {
  modelValue?: string | null
}

defineProps<iProps>()

type iEmits = {
  (event: 'update:model-value', value: any)
}

const emit = defineEmits<iEmits>()

const handleInput = (value: iDropdownOption): void => {
  emit('update:model-value', value)
}

const options = [
  {
    id: 'visa',
    name: 'Visa',
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
  },
  {
    id: 'amex',
    name: 'American Express',
  },
  { id: 'elo', name: 'Elo' },
  {
    id: 'hipercard',
    name: 'Hipercard',
  },
  {
    id: 'diners',
    name: 'Diners Club',
  },
  {
    id: 'discover',
    name: 'Discover',
  },
  {
    id: 'banricompras',
    name: 'BanriCompras',
  },
  {
    id: 'sorocred',
    name: 'Sorocred',
  },
  {
    id: 'aura',
    name: 'Aura',
  },
]
const optionValue = (value: iDropdownOption): number | string => value.id
</script>

<template>
  <Dropdown
    :model-value="modelValue"
    :options="options"
    filter
    option-label="name"
    :option-value="optionValue"
    placeholder="Selecione uma bandeira"
    @update:model-value="handleInput"
  />
</template>
