<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="toastClasses(toast.type)"
        >
          <div class="flex items-center gap-2">
            <CheckCircle v-if="toast.type === 'success'" class="w-5 h-5" />
            <XCircle v-if="toast.type === 'error'" class="w-5 h-5" />
            <Info v-if="toast.type === 'info'" class="w-5 h-5" />
            <span>{{ toast.message }}</span>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { CheckCircle, XCircle, Info } from "lucide-vue-next";
import { useToast } from "@/composables/use-toast";

const { toasts } = useToast();

const toastClasses = (type: "success" | "error" | "info") => {
  const base =
    "px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 min-w-[300px]";

  const variants = {
    success: "bg-green-50 text-green-800 border border-green-200",
    error: "bg-red-50 text-red-800 border border-red-200",
    info: "bg-blue-50 text-blue-800 border border-blue-200",
  };

  return `${base} ${variants[type]}`;
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
