<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "success" | "danger" | "warning" | "info";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "info",
});

const badgeClasses = computed(() => {
  const base =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

  const variants = {
    success: "bg-green-100 text-green-800",
    danger: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
  };

  return `${base} ${variants[props.variant]}`;
});
</script>
