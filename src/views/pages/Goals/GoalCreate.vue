<script setup lang="ts">
import BaseBreadcrumbs from '@/components/Base/BaseBreadcrumbs.vue'
import GoalForm from '@/components/Goals/GoalForm.vue'
import { iBreadcrumbItem } from '@/types'
import { ref } from 'vue'

const breadcrumbItems = ref<iBreadcrumbItem[]>([
  { label: 'Metas', route: { name: 'goals' } },
  { label: 'Nova Meta' },
])
</script>

<template>
  <BaseBreadcrumbs :items="breadcrumbItems" />
  <h1>Nova Meta</h1>
  <div class="p-fluid">
    <GoalForm />
  </div>
</template>
