import { ref, onMounted, onUnmounted } from "vue";
import { deviceService } from "@/services/device-service";
import { socketService } from "@/services/socket-service";
import {
  Device,
  CreateDeviceDTO,
  DeviceStatusEvent,
  DeviceStatus,
} from "@/types/device";

export function useDevices() {
  const devices = ref<Device[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Fetch all devices
  const fetchDevices = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      devices.value = await deviceService.getAllDevices();
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Erro ao carregar dispositivos";
      console.error("Erro ao buscar dispositivos:", err);
    } finally {
      isLoading.value = false;
    }
  };

  // Create new device
  const createDevice = async (data: CreateDeviceDTO): Promise<boolean> => {
    error.value = null;
    try {
      const newDevice = await deviceService.createDevice(data);
      // Immediately add to UI (optimistic update)
      devices.value.unshift(newDevice);
      return true;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Erro ao criar dispositivo";
      console.error("Erro ao criar dispositivo:", err);
      return false;
    }
  };

  // Toggle device status
  const toggleStatus = async (id: string): Promise<boolean> => {
    error.value = null;

    // Find the device and store old status for rollback
    const device = devices.value.find((d) => d.id === id);
    if (!device) return false;

    const oldStatus = device.status;

    // Optimistic update - change status immediately
    device.status =
      device.status === DeviceStatus.ATIVO
        ? DeviceStatus.INATIVO
        : DeviceStatus.ATIVO;
    device.updatedAt = new Date().toISOString();

    try {
      const updatedDevice = await deviceService.toggleDeviceStatus(id);
      // Update with server response
      device.status = updatedDevice.status;
      device.updatedAt = updatedDevice.updatedAt;
      return true;
    } catch (err: any) {
      // Rollback on error
      device.status = oldStatus;
      error.value = err.response?.data?.message || "Erro ao alterar status";
      console.error("Erro ao alterar status:", err);
      return false;
    }
  };

  // WebSocket event handlers
  const handleDeviceCreated = (device: Device) => {
    console.log("📱 Novo dispositivo criado via WebSocket:", device);
    // Check if device already exists (from optimistic update)
    const exists = devices.value.find((d) => d.id === device.id);
    if (!exists) {
      // Add to the beginning of the list (newest first)
      devices.value.unshift(device);
    }
  };

  const handleDeviceStatusChanged = (data: DeviceStatusEvent) => {
    console.log("🔄 Status alterado via WebSocket:", data);
    const device = devices.value.find((d) => d.id === data.id);
    if (device) {
      device.status = data.status;
      device.updatedAt = new Date().toISOString();
    }
  };

  // Setup WebSocket listeners
  onMounted(() => {
    fetchDevices();
    socketService.connect();
    socketService.onDeviceCreated(handleDeviceCreated);
    socketService.onDeviceStatusChanged(handleDeviceStatusChanged);
  });

  // Cleanup WebSocket listeners
  onUnmounted(() => {
    socketService.offDeviceCreated(handleDeviceCreated);
    socketService.offDeviceStatusChanged(handleDeviceStatusChanged);
    socketService.disconnect();
  });

  return {
    devices,
    isLoading,
    error,
    fetchDevices,
    createDevice,
    toggleStatus,
  };
}
