<script setup lang="ts">
import { iBreadcrumbItem } from '@/types'

type iProps = {
  items: iBreadcrumbItem[]
}

defineProps<iProps>()

const home = { icon: 'pi pi-home', route: { name: 'dashboard' } }
</script>

<template>
  <Breadcrumb :home="home" :model="items">
    <template #item="{ item, props }">
      <router-link
        v-if="item.route"
        v-slot="{ href, navigate }"
        :to="item.route"
        custom
      >
        <a :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span class="text-gray-600">{{ item.label }}</span>
        </a>
      </router-link>
      <span v-else class="text-gray-400">{{ item.label }}</span>
    </template>
  </Breadcrumb>
</template>
