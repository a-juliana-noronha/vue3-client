<script setup lang="ts">
import BaseDialog from '@/components/Base/BaseDialog.vue'
import BaseDropdown from '@/components/Base/BaseDropdown.vue'
import { useForm } from '@/composables'
import services from '@/services'
import { iPartial, iTransaction } from '@/types'
import { computed, ref } from 'vue'

type iProps = {
  visible: boolean
  transaction: iPartial<iTransaction>
}

const props = defineProps<iProps>()

type iEmits = {
  (event: 'cancel'): void
  (event: 'success'): void
}

const emit = defineEmits<iEmits>()

const form = ref<iPartial<iTransaction>>(props.transaction)

const service = computed<any>(() =>
  form.value.id ? services.transactions.update : services.transactions.create
)

const transactionType = computed<string>(() =>
  props.transaction.transaction_type === 'expense' ? 'Despesa' : 'Receita'
)

const header = computed<string>(() => {
  const action = form.value.id ? 'Editar' : 'Nova'

  return `${action} ${transactionType.value}`
})

const { submitting, handleSubmit } = useForm<iTransaction>({
  service: service.value,
  notify: 'all',
  message: `${transactionType.value} salva com sucesso`,
  onSuccess: (): void => {
    emit('success')
  },
})

const handleCancel = (): void => {
  emit('cancel')
}

const paymentType = ref<'account' | 'card'>(
  props.transaction.card_id ? 'card' : 'account'
)
const isAccountPaymentType = computed<boolean>(
  () => paymentType.value === 'account'
)

const handleCardUpdate = (): void => {
  form.value.account_id = null
}

const handleAccountUpdate = (): void => {
  form.value.card_id = null
}

const hasPaymentPlan = ref<boolean>(false)

const isPaymentPlanAllowed = computed<boolean>(
  () => !isAccountPaymentType.value && !form.value.id
)

const handleTogglePaymentPlan = (value: boolean): void => {
  if (value) {
    form.value.total_installments = 2
    form.value.date = ''
  } else {
    form.value.total_installments = 1
  }
}
</script>

<template>
  <FormKit
    id="transaction-form-dialog"
    v-model="form"
    type="form"
    :incomplete-message="false"
    :actions="false"
    @submit="handleSubmit"
  >
    <BaseDialog
      :visible="visible"
      fullscreen
      :header="header"
      :submitting="submitting"
      append-to="#transaction-form-dialog"
      content-class="flex flex-column gap-3"
      @cancel="handleCancel"
    >
      <FormKit name="payment_type" label="">
        <template #input>
          <div class="flex align-items-center gap-3">
            <div class="field-radiobutton mb-0">
              <RadioButton
                id="account"
                v-model="paymentType"
                name="payment_type"
                value="account"
              />
              <label for="account">Dinheiro</label>
            </div>
            <div class="field-radiobutton mb-0">
              <RadioButton
                id="card"
                v-model="paymentType"
                name="payment_type"
                value="card"
              />
              <label for="account">Cartão</label>
            </div>
          </div>
        </template>
      </FormKit>

      <FormKit v-if="isAccountPaymentType" name="account_id" label="Conta">
        <template #input>
          <BaseDropdown
            v-model="form.account_id!"
            service="accounts"
            filter
            show-clear
            placeholder="Selecione uma conta"
            @update:model-value="handleAccountUpdate"
          />
        </template>
      </FormKit>

      <FormKit
        v-else
        name="card_id"
        label="Cartão"
        validation="required"
        :validation-messages="{ required: 'Cartão é obrigatório' }"
      >
        <template #input>
          <BaseDropdown
            v-model="form.card_id!"
            service="cards"
            filter
            show-clear
            placeholder="Selecione um cartão"
            @update:model-value="handleCardUpdate"
          />
        </template>
      </FormKit>

      <FormKit name="category_id" label="Categoria">
        <template #input>
          <BaseDropdown
            v-model="form.category_id!"
            service="categories"
            filter
            placeholder="Selecione uma categoria"
          />
        </template>
      </FormKit>

      <FormKit name="name" label="Descrição" validation="required">
        <template #input>
          <InputText v-model="form.name" />
        </template>
      </FormKit>

      <FormKit name="amount" label="Valor">
        <template #input>
          <InputNumber
            v-model="form.amount"
            locale="pt-BR"
            mode="currency"
            currency="BRL"
            :min-fraction-digits="2"
          />
        </template>
      </FormKit>

      <!-- <FormKit v-if="!form.recurrent" name="date" label="Data de Lançamento">
        <template #input>
          <Calendar v-model="form.date" show-icon show-button-bar />
        </template>
      </FormKit> -->

      <FormKit v-if="isPaymentPlanAllowed">
        <template #input>
          <span class="flex align-items-center gap-3">
            <label class="formkit-label block text-900 text-xl font-medium"
              >Despesa parcelada?</label
            >
            <InputSwitch
              v-model="hasPaymentPlan"
              @update:model-value="handleTogglePaymentPlan"
            />
          </span>
        </template>
      </FormKit>

      <FormKit
        v-if="hasPaymentPlan"
        name="total_installments"
        label="Número de Parcelas"
        type="number"
        validation="required|min:2"
      >
        <template #input>
          <InputNumber v-model="form.total_installments" />
        </template>
      </FormKit>

      <FormKit v-else name="date" label="Data de Competência">
        <template #input>
          <Calendar v-model="form.date" show-icon touch-u-i />
        </template>
      </FormKit>
    </BaseDialog>
  </FormKit>
</template>
