<script setup>
import { ref } from 'vue'
import AppSidebarItem from './AppSidebarItem.vue'

const model = ref([
  {
    label: 'Home',
    items: [
      {
        label: 'Resumo',
        icon: 'pi pi-fw pi-chart-pie',
        to: { name: 'dashboard' },
      },
      {
        label: 'Despesas',
        icon: 'pi pi-fw pi-calculator',
        to: { name: 'expenses' },
      },
      {
        label: 'Lembretes',
        icon: 'pi pi-fw pi-clock',
        to: { name: 'reminders' },
      },
      // { label: 'Metas', icon: 'pi pi-fw pi-list', to: { name: 'goals' } },
      {
        label: 'Configurações',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Categorias',
            icon: 'pi pi-fw pi-tags',
            to: { name: 'categories' },
          },
          {
            label: 'Centros de Custo',
            icon: 'pi pi-fw pi-building',
            to: { name: 'cost-centers' },
          },
          {
            label: 'Contas',
            icon: 'pi pi-fw pi-list',
            to: { name: 'accounts' },
          },
          {
            label: 'Cartões',
            icon: 'pi pi-fw pi-credit-card',
            to: { name: 'cards' },
          },
        ],
      },
    ],
  },
])
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <AppSidebarItem v-if="!item.separator" :item="item" :index="i" />
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
