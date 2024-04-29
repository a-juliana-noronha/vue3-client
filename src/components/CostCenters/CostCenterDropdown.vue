<script setup lang="ts">
import { useFetch } from '@/composables'
import services from '@/services'
import { iCostCenter, iDropdownOption } from '@/types'

type iProps = {
  modelValue?: number | null
}

defineProps<iProps>()

type iEmits = {
  (event: 'update:model-value', value: any)
}

const emit = defineEmits<iEmits>()

const { loading, data } = useFetch<iCostCenter[]>({
  initialValue: [],
  handler: services.costCenters.fetchAll,
  immediate: true,
})

const handleInput = (value: iDropdownOption): void => {
  emit('update:model-value', value)
}

const optionValue = (value: iDropdownOption): number | string => value.id
</script>

<template>
  <Dropdown
    :model-value="modelValue"
    :options="data"
    :loading="loading"
    filter
    option-label="name"
    :option-value="optionValue"
    placeholder="Selecione um centro de custo"
    @update:model-value="handleInput"
  />
</template>
