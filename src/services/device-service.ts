import api from "./api";
import { Device, CreateDeviceDTO } from "@/types/device";

export const deviceService = {
  async getAllDevices(): Promise<Device[]> {
    const response = await api.get<Device[]>("/devices");
    return response.data;
  },

  async createDevice(data: CreateDeviceDTO): Promise<Device> {
    const response = await api.post<Device>("/devices", data);
    return response.data;
  },

  async toggleDeviceStatus(id: string): Promise<Device> {
    const response = await api.patch<Device>(`/devices/${id}/status`);
    return response.data;
  },
};
