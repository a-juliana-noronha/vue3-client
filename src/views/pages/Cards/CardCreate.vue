<script setup lang="ts">
import BaseBreadcrumbs from '@/components/Base/BaseBreadcrumbs.vue'
import CardForm from '@/components/Cards/CardForm.vue'
import { iBreadcrumbItem } from '@/types'
import { ref } from 'vue'

const breadcrumbItems = ref<iBreadcrumbItem[]>([
  { label: 'Cartões', route: { name: 'cards' } },
  { label: 'Novo Cartão' },
])
</script>

<template>
  <BaseBreadcrumbs :items="breadcrumbItems" />
  <h1>Novo Cartão</h1>
  <div class="p-fluid">
    <CardForm />
  </div>
</template>
