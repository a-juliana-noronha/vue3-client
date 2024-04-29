<script setup lang="ts">
import { FilterMatchMode } from 'primevue/api'
import { onBeforeMount, ref } from 'vue'

const filters = ref<any>(null)

onBeforeMount(() => {
  filters.value = {
    global: {
      value: '',
      matchMode: FilterMatchMode.CONTAINS,
    },
  }
})
</script>

<template>
  <DataTable
    paginator
    :rows="10"
    data-key="id"
    row-hover
    scrollable
    :filters="filters"
    show-gridlines
  >
    <template #header>
      <div class="flex justify-content-between flex-column sm:flex-row">
        <IconField icon-position="left">
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="filters.global.value"
            placeholder="Digite para pesquisar..."
            class="w-full"
          />
        </IconField>
      </div>
    </template>
    <template #empty>
      <slot name="empty"> Nenhum registro encontrado. </slot>
    </template>
    <template #loading>
      <slot name="loading"> Carregando dados. Aguarde! </slot>
    </template>
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :index="index" :name="name" v-bind="data"></slot>
    </template>
  </DataTable>
</template>

<style lang="scss" scoped>
:deep(.p-paginator) {
  border: none;
}
</style>
