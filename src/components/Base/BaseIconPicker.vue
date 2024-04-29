<script setup lang="ts">
import { icons } from '@/constants'
import { computed, ref } from 'vue'

type iProps = {
  modelValue?: string | null
  color?: string
}

const props = withDefaults(defineProps<iProps>(), {
  modelValue: '',
  color: '',
})

type iEmits = {
  (event: 'update:model-value', value: string)
}

const emit = defineEmits<iEmits>()

const search = ref<string>('')
const filteredIcons = computed<string[]>(
  () =>
    (search.value &&
      icons.filter((icon) => icon.includes(search.value.toLowerCase()))) ||
    icons
)

const handleSelect = (value: string): void => {
  emit('update:model-value', value)
  toggleIconPicker()
}

const handleClear = (): void => {
  emit('update:model-value', '')
}

const showIconPicker = ref<boolean>(false)
const toggleIconPicker = () => {
  showIconPicker.value = !showIconPicker.value
}

const label = computed<string>(() => (props.modelValue ? '' : 'Selecionar'))

const icon = computed<string>(() =>
  props.modelValue ? `pi pi-fw text-3xl ${props.modelValue}` : ''
)

const iconPt = computed<any>(() => ({
  icon: { style: `color: #${props.color}` },
}))
</script>

<template>
  <span class="flex align-items-center gap-1">
    <Button
      :label="label"
      :text="!!modelValue"
      :icon="icon"
      :outlined="!modelValue"
      :pt="iconPt"
      @click="toggleIconPicker"
    />
    <Button
      v-if="modelValue"
      icon="pi pi-fw pi-times"
      text
      @click="handleClear"
    />
  </span>
  <div
    v-show="showIconPicker"
    class="p-datepicker p-component base-icon-picker absolute"
  >
    <div class="p-datepicker-group-container">
      <div
        class="p-datepicker-group flex flex-wrap gap-3 justify-content-center py-2 px-1"
      >
        <IconField icon-position="left" class="sticky top-0">
          <InputText v-model="search" placeholder="Pesquisar ícones" />
          <InputIcon class="pi pi-search" />
        </IconField>
        <span
          v-for="filteredIcon in filteredIcons"
          :key="filteredIcon"
          class="cursor-pointer lg:p-2 hover:bg-gray-200 base-icon-picker-wrapper"
          @click="handleSelect(filteredIcon)"
        >
          <i :class="['pi pi-fw text-4xl', filteredIcon]" />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-icon-picker {
  max-height: 400px;
  overflow-y: scroll;
  left: 1.5rem;
  right: 1.5rem;
  margin-top: 0.5rem;
  z-index: 1;

  &-wrapper {
    border-radius: 15px;
  }
}
</style>
