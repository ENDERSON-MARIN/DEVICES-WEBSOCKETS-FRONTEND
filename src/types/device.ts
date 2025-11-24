export enum DeviceStatus {
  ATIVO = "ATIVO",
  INATIVO = "INATIVO",
}

export interface Device {
  id: string;
  name: string;
  mac: string;
  status: DeviceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDeviceDTO {
  name: string;
  mac: string;
}

export interface DeviceStatusEvent {
  id: string;
  status: DeviceStatus;
}
