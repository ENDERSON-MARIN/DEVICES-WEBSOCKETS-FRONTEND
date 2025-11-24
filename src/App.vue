<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center gap-3">
          <Smartphone class="w-8 h-8 text-primary-600" />
          <div>
            <h1 class="text-3xl font-bold text-gray-900">
              Gestão de Dispositivos IoT
            </h1>
            <p class="text-sm text-gray-600 mt-1">
              Sistema de gerenciamento em tempo real
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Error Alert -->
      <div
        v-if="error"
        class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
      >
        <AlertCircle class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 class="text-sm font-medium text-red-800">Erro</h3>
          <p class="text-sm text-red-700 mt-1">{{ error }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Form Section -->
        <div class="lg:col-span-1">
          <DeviceForm :on-submit="createDevice" />
        </div>

        <!-- Table Section -->
        <div class="lg:col-span-2">
          <DeviceTable
            :devices="devices"
            :is-loading="isLoading"
            :on-toggle-status="toggleStatus"
          />
        </div>
      </div>

      <!-- Connection Status -->
      <div
        class="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600"
      >
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span>Conectado ao servidor</span>
        </div>
      </div>
    </main>

    <!-- Toast Notifications -->
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { Smartphone, AlertCircle } from "lucide-vue-next";
import DeviceForm from "@/components/device-form.vue";
import DeviceTable from "@/components/device-table.vue";
import Toast from "@/components/ui/toast.vue";
import { useDevices } from "@/composables/use-devices";

const { devices, isLoading, error, createDevice, toggleStatus } = useDevices();
</script>
