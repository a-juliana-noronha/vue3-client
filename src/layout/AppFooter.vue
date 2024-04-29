<script setup lang="ts">
import { computed } from 'vue'

const year = computed<string>(() => new Date().getFullYear())
</script>

<template>
  <div class="layout-footer flex align-items-center gap-1">
    &copy;
    <span class="font-medium">Juliana Noronha</span>
  </div>
  <div class="text-center">
    {{ year }}
  </div>
</template>
