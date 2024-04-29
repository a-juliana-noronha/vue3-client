<script setup lang="ts">
import BaseDialog from '@/components/Base/BaseDialog.vue'
import BaseDropdown from '@/components/Base/BaseDropdown.vue'
import { useForm } from '@/composables'
import services from '@/services'
import { iPartial, iUser } from '@/types'
import { computed, ref } from 'vue'

type iProps = {
  visible: boolean
  user: iPartial<iUser>
}

const props = defineProps<iProps>()

type iEmits = {
  (event: 'cancel'): void
  (event: 'success'): void
}

const emit = defineEmits<iEmits>()

const form = ref<iPartial<iUser>>(props.user)

const service = computed<any>(() =>
  form.value.id ? services.users.update : services.users.create
)

const header = computed<string>(() =>
  form.value.id ? 'Editar Usuário' : 'Nova Usuário'
)

const { submitting, handleSubmit } = useForm<iUser>({
  service: service.value,
  notify: 'all',
  message: 'Usuário salvo com sucesso',
  onSuccess: (): void => {
    emit('success')
  },
})

const handleCancel = (): void => {
  emit('cancel')
}

const roles = [
  {
    id: 'admin',
    name: 'Administrador',
  },
  {
    id: 'user',
    name: 'Usuário',
  },
]
</script>

<template>
  <FormKit
    id="user-form-dialog"
    v-model="form"
    type="form"
    :incomplete-message="false"
    :actions="false"
    @submit="handleSubmit"
  >
    <BaseDialog
      :visible="visible"
      :header="header"
      :submitting="submitting"
      content-class="flex flex-column gap-3"
      append-to="#user-form-dialog"
      fullscreen
      @cancel="handleCancel"
    >
      <FormKit
        name="name"
        label="Nome*"
        validation="required"
        :validation-messages="{
          required: 'Nome é obrigatório',
        }"
      >
        <template #input>
          <InputText v-model="form.name" type="text" />
        </template>
      </FormKit>

      <FormKit
        name="email"
        label="Email*"
        validation="required|email"
        novalidation
        :validation-messages="{
          required: 'Email é obrigatório',
          email: 'Informe um e-mail válido',
        }"
      >
        <template #input>
          <InputText v-model="form.email" type="text" />
        </template>
      </FormKit>

      <FormKit name="phone" label="Telefone">
        <template #input>
          <InputMask
            id="phone"
            v-model="form.phone!"
            mask="(99) 99999-9999"
            placeholder="(xx) xxxxx-xxxx"
          />
        </template>
      </FormKit>

      <FormKit name="role" label="Permissão">
        <template #input>
          <BaseDropdown
            v-model="form.role!"
            :options="roles"
            placeholder="Selecione uma permissão"
          />
        </template>
      </FormKit>
    </BaseDialog>
  </FormKit>
</template>
