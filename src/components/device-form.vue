<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">
      Cadastrar Dispositivo
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <Input
        id="name"
        v-model="formData.name"
        label="Nome do Dispositivo"
        placeholder="Ex: Sensor de Temperatura"
        required
        :error="errors.name"
      />

      <Input
        id="mac"
        v-model="formData.mac"
        label="Endereço MAC"
        placeholder="Ex: AA:BB:CC:DD:EE:FF"
        required
        :error="errors.mac"
      />

      <div class="flex gap-3">
        <Button type="submit" :disabled="isSubmitting" class="flex-1">
          {{ isSubmitting ? "Cadastrando..." : "Cadastrar" }}
        </Button>
        <Button type="button" variant="secondary" @click="resetForm">
          Limpar
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import Button from "@/components/ui/button.vue";
import Input from "@/components/ui/input.vue";
import { useToast } from "@/composables/use-toast";

interface Props {
  onSubmit: (data: { name: string; mac: string }) => Promise<boolean>;
}

const props = defineProps<Props>();

const formData = reactive({
  name: "",
  mac: "",
});

const errors = reactive({
  name: "",
  mac: "",
});

const isSubmitting = ref(false);
const { success, error: showError } = useToast();

const validateForm = (): boolean => {
  let isValid = true;

  // Reset errors
  errors.name = "";
  errors.mac = "";

  // Validate name (3-255 characters)
  if (formData.name.length < 3) {
    errors.name = "Nome deve ter no mínimo 3 caracteres";
    isValid = false;
  } else if (formData.name.length > 255) {
    errors.name = "Nome deve ter no máximo 255 caracteres";
    isValid = false;
  }

  // Validate MAC address (XX:XX:XX:XX:XX:XX format)
  const macRegex = /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/;
  if (!macRegex.test(formData.mac)) {
    errors.mac = "Formato inválido. Use XX:XX:XX:XX:XX:XX";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    const result = await props.onSubmit({
      name: formData.name,
      mac: formData.mac.toUpperCase(),
    });

    if (result) {
      success("Dispositivo cadastrado com sucesso!");
      resetForm();
    } else {
      showError("Erro ao cadastrar dispositivo");
    }
  } catch (err) {
    showError("Erro ao cadastrar dispositivo");
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  formData.name = "";
  formData.mac = "";
  errors.name = "";
  errors.mac = "";
};
</script>
