<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">
      Lista de Dispositivos
    </h2>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-8">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"
      ></div>
      <p class="mt-2 text-gray-600">Carregando dispositivos...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="devices.length === 0" class="text-center py-8">
      <Smartphone class="w-16 h-16 mx-auto text-gray-400 mb-3" />
      <p class="text-gray-600">Nenhum dispositivo cadastrado</p>
      <p class="text-sm text-gray-500 mt-1">
        Cadastre seu primeiro dispositivo acima
      </p>
    </div>

    <!-- Table -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Nome
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              MAC Address
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="device in devices"
            :key="device.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono"
            >
              {{ device.id.substring(0, 8) }}...
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ device.name }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono"
            >
              {{ device.mac }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <Badge
                :variant="device.status === 'ATIVO' ? 'success' : 'danger'"
              >
                {{ device.status }}
              </Badge>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <Button
                size="sm"
                :variant="device.status === 'ATIVO' ? 'danger' : 'primary'"
                @click="handleToggleStatus(device.id)"
                :disabled="togglingId === device.id"
              >
                <Power class="w-4 h-4 mr-1" />
                {{
                  togglingId === device.id
                    ? "Alterando..."
                    : device.status === "ATIVO"
                    ? "Desativar"
                    : "Ativar"
                }}
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Smartphone, Power } from "lucide-vue-next";
import Badge from "@/components/ui/badge.vue";
import Button from "@/components/ui/button.vue";
import { Device } from "@/types/device";
import { useToast } from "@/composables/use-toast";

interface Props {
  devices: Device[];
  isLoading: boolean;
  onToggleStatus: (id: string) => Promise<boolean>;
}

const props = defineProps<Props>();

const togglingId = ref<string | null>(null);
const { success, error: showError } = useToast();

const handleToggleStatus = async (id: string) => {
  togglingId.value = id;

  try {
    const result = await props.onToggleStatus(id);

    if (result) {
      success("Status alterado com sucesso!");
    } else {
      showError("Erro ao alterar status");
    }
  } catch (err) {
    showError("Erro ao alterar status");
  } finally {
    togglingId.value = null;
  }
};
</script>
