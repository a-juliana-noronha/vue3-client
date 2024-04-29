<script setup lang="ts">
import BaseDataTable from '@/components/BaseDataTable.vue'
import StatusTag from '@/components/StatusTag.vue'
import { useFetch } from '@/composables'
import services, { iGroup } from '@/services'

const { loading, data } = useFetch<iGroup>({
  handler: services.groups.fetchAll,
  options: {
    params: {
      include: 'user,teams,players',
    },
  },
  immediate: true,
})
</script>

<template>
  <div class="card">
    <h5>Grupos</h5>
    <BaseDataTable :value="data" :loading="loading">
      <Column field="name" header="Nome" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.name }}
        </template>
      </Column>
      <Column field="user.name" header="Usuário" style="min-width: 12rem" />
      <Column field="teams" header="Times" style="min-width: 12rem">
        <template #body="{ data }">
          <span class="flex align-items-center gap-2">
            {{ data.teams.length }}
            <router-link
              v-if="data.teams.length"
              :to="{ name: 'teams', params: { group_id: data.id } }"
            >
              <i class="pi pi-external-link pi-fw" />
            </router-link>
          </span>
        </template>
      </Column>
      <Column field="players" header="Jogadores" style="min-width: 12rem">
        <template #body="{ data }">
          <span class="flex align-items-center gap-2">
            {{ data.players.length }}
            <router-link
              v-if="data.players.length"
              :to="{ name: 'players', params: { group_id: data.id } }"
            >
              <i class="pi pi-external-link pi-fw" />
            </router-link>
          </span>
        </template>
      </Column>
      <Column field="status" header="Status" style="min-width: 12rem">
        <template #body="{ data }">
          <StatusTag :status="data.status" />
        </template>
      </Column>
    </BaseDataTable>
  </div>
</template>
