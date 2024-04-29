<script setup lang="ts">
import { useLayout } from '@/layout/composables/layout'
import { usePrimeVue } from 'primevue/config'
import DynamicDialog from 'primevue/dynamicdialog'
import { onBeforeMount } from 'vue'

const $primevue = usePrimeVue()
const { layoutConfig } = useLayout()

// const config = computed(() =>
//   window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
//     ? {
//         theme: 'lara-dark-amber',
//         darkTheme: true
//       }
//     : {
//         theme: 'lara-light-amber',
//         darkTheme: false
//       }
// );

onBeforeMount(() => {
  $primevue.changeTheme(layoutConfig.theme.value, 'dark', 'theme-css', () => {
    layoutConfig.ripple.value = false
    layoutConfig.theme.value = 'lara-light-amber'
    layoutConfig.darkTheme.value = false
  })
})
</script>

<template>
  <RouterView />
  <DynamicDialog />
</template>
