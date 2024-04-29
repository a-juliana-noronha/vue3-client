<script setup lang="ts">
import { iStatus } from '@/services'

type iProps = {
  status: iStatus
}

const props = defineProps<iProps>()

const severity = {
  success: 'active',
  danger: 'inactive'
}
</script>

<template>
  <Tag v-if="status" :severity="severity[props.status]">{{ status?.toUpperCase() }}</Tag>
</template>