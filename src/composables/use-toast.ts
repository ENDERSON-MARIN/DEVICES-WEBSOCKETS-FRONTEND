import { ref } from "vue";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

const toasts = ref<Toast[]>([]);
let toastId = 0;

export function useToast() {
  const show = (
    message: string,
    type: "success" | "error" | "info" = "info",
    duration = 3000
  ) => {
    const id = ++toastId;
    toasts.value.push({ id, message, type });

    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, duration);
  };

  const success = (message: string) => show(message, "success");
  const error = (message: string) => show(message, "error");
  const info = (message: string) => show(message, "info");

  return {
    toasts,
    show,
    success,
    error,
    info,
  };
}
