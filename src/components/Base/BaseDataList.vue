<script setup lang="ts">
import BaseLoading from '@/components/Base/BaseLoading.vue'
import { computed, ref } from 'vue'

type iProps = {
  data: any[]
  loading?: boolean
  readonly?: (item: any) => boolean
}

const props = withDefaults(defineProps<iProps>(), {
  data: () => [],
  loading: false,
  readonly: () => false,
})

type iEmits = {
  (event: 'edit', value: any)
  (event: 'view', value: any)
  (event: 'delete', value: any)
}

const emit = defineEmits<iEmits>()

const hasData = computed<boolean>(() => props.data?.length > 0)

const refs = ref([])
const getPopupMenuItems = (item: any) => [
  props.readonly(item)
    ? {
        label: 'Visualizar',
        icon: 'pi pi-fw pi-eye',
        command: () => {
          emit('view', item)
        },
      }
    : {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => {
          emit('edit', item)
        },
      },
  {
    label: 'Remover',
    icon: 'pi pi-fw pi-trash',
    class: 'base-data-list__delete',
    command: () => {
      emit('delete', item)
    },
  },
]
const handleToggle = (event: any, item: any, index: number) => {
  // @ts-ignore
  refs.value[index].toggle(event)
}
</script>

<template>
  <div class="flex flex-column gap-3">
    <BaseLoading v-if="loading" />

    <template v-else>
      <template v-if="hasData">
        <!-- <ul class="surface-section list-none p-0 m-0 hidden lg:block">
          <li
            class="flex justify-content-between align-items-center p-3 w-full"
          >
            <div class="text-900 w-full font-bold">Nome</div>
          </li>
        </ul> -->
        <ul class="list-none p-0 m-0">
          <li
            v-for="(item, index) in data"
            :key="item.id"
            class="surface-section flex justify-content-between align-items-center p-3 w-full mb-2"
          >
            <slot name="item" :item="item">
              <div class="text-900 w-full flex flex-column font-bold">
                {{ item.name }}
              </div>
            </slot>

            <Button
              type="button"
              icon="pi pi-bars"
              text
              @click="handleToggle($event, item, index)"
            />
            <Menu ref="refs" :model="getPopupMenuItems(item)" popup />
          </li>
        </ul>
      </template>
      <div v-else>Nenhum registro encontrado</div>
    </template>
  </div>
</template>

<style lang="scss">
.base-data-list__delete {
  .p-menuitem-text,
  .p-menuitem-icon {
    color: var(--primary-color) !important;
  }
}
</style>
