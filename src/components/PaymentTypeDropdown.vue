<script setup lang="ts">
import { useFetch } from '@/composables'
import services from '@/services'
import { iAccount, iCard, iDropdownOption } from '@/types'
import { onMounted } from 'vue'

type iProps = {
  modelValue: iDropdownOption
}

defineProps<iProps>()

type iEmits = {
  (event: 'update:model-value', value: any)
}

const emit = defineEmits<iEmits>()

const {
  loading: loadingAccounts,
  data: accounts,
  fetch: fetchAccounts,
} = useFetch<iAccount>({
  handler: services.accounts.fetchAll,
})

const {
  loading: loadingCards,
  data: cards,
  fetch: fetchCards,
} = useFetch<iAccount>({
  handler: services.cards.fetchAll,
})

onMounted(() => {
  fetchAccounts()
  fetchCards()
})

const paymentTypes = computed<(iAccount | iCard)[]>(() => [...accounts, cards])

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
    placeholder="Selecione uma conta"
    @update:model-value="handleInput"
  />
</template>
