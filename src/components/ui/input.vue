<template>
  <div class="flex flex-col">
    <label
      v-if="label"
      :for="id"
      class="mb-1 text-sm font-medium text-gray-700"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :class="inputClasses"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <span v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  id?: string;
  label?: string;
  type?: string;
  modelValue?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  required: false,
  disabled: false,
});

defineEmits<{
  "update:modelValue": [value: string];
}>();

const inputClasses = computed(() => {
  const base =
    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200";
  const error = props.error
    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500";
  const disabled = props.disabled
    ? "bg-gray-100 cursor-not-allowed"
    : "bg-white";

  return `${base} ${error} ${disabled}`;
});
</script>
