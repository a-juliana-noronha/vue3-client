<script setup lang="ts">
const handleInputSelect = async (e): Promise<void> => {
  e.preventDefault()
  e.target.select()
}
</script>

<template>
  <InputNumber
    locale="pt-BR"
    mode="currency"
    currency="BRL"
    :min-fraction-digits="2"
    @mousedown="handleInputSelect"
    @touchstart="handleInputSelect"
  />
</template>
