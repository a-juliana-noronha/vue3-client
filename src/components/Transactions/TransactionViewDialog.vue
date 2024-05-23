<script setup lang="ts">
import BaseDialog from '@/components/Base/BaseDialog.vue'
import { iPartial, iTransaction } from '@/types'
import { formatCurrency } from '@/utils/formatCurrency'
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

const transactionType = computed<string>(() =>
  props.transaction.transaction_type === 'expense' ? 'Despesa' : 'Receita'
)

const header = computed<string>(() => `Visualizar ${transactionType.value}`)

const handleCancel = (): void => {
  emit('cancel')
}

const paymentType = computed<string>(() =>
  props.transaction.card_id ? 'Cartão' : 'Conta'
)
const isAccountPaymentType = computed<boolean>(
  () => !!props.transaction.account_id
)
</script>

<template>
  <BaseDialog
    :visible="visible"
    fullscreen
    :header="header"
    content-class="flex flex-column gap-3"
    hide-ok
    cancel-label="Fechar"
    @cancel="handleCancel"
  >
    <FormKit name="payment_type" label="Forma de Pagamento">
      <template #input>
        {{ paymentType }}
      </template>
    </FormKit>

    <FormKit v-if="isAccountPaymentType" name="account_id" label="Conta">
      <template #input>
        {{ transaction.account?.name || 'Sem conta' }}
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
        {{ transaction.card?.name || 'Sem cartão' }}
      </template>
    </FormKit>

    <FormKit name="category_id" label="Categoria">
      <template #input>
        {{ transaction.category?.name || 'Sem categoria' }}
      </template>
    </FormKit>

    <FormKit name="name" label="Descrição" validation="required">
      <template #input>
        {{ transaction.name }}
      </template>
    </FormKit>

    <FormKit name="amount" label="Valor">
      <template #input>
        {{ transaction.amount }}
      </template>
    </FormKit>

    <FormKit v-if="transaction.payment_plan_id" label="Parcelamento">
      <template #input>
        <div class="flex flex-column gap-2">
          <span>
            Parcela {{ transaction.current_installment }} de
            {{ transaction.payment_plan.total_installments }}
          </span>
          <span>
            Valor Total:
            {{ formatCurrency(transaction.payment_plan.total_amount) }}
          </span>
        </div>
      </template>
    </FormKit>

    <FormKit v-else name="date" label="Data de Competência">
      <template #input>
        <Calendar v-model="form.date" show-icon touch-u-i />
      </template>
    </FormKit>
  </BaseDialog>
</template>
