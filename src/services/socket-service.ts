import { io, Socket } from "socket.io-client";
import { Device, DeviceStatusEvent } from "@/types/device";

class SocketService {
  private socket: Socket | null = null;
  private url: string;

  constructor() {
    this.url = import.meta.env.VITE_SOCKET_URL || "http://localhost:8080";
  }

  connect(): void {
    if (this.socket?.connected) {
      return;
    }

    this.socket = io(this.url, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    this.socket.on("connect", () => {
      console.log("✅ WebSocket conectado");
    });

    this.socket.on("disconnect", () => {
      console.log("❌ WebSocket desconectado");
    });

    this.socket.on("connect_error", (error) => {
      console.error("Erro de conexão WebSocket:", error);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  onDeviceCreated(callback: (device: Device) => void): void {
    if (!this.socket) {
      console.warn("Socket não conectado");
      return;
    }
    this.socket.on("device:created", callback);
  }

  onDeviceStatusChanged(callback: (data: DeviceStatusEvent) => void): void {
    if (!this.socket) {
      console.warn("Socket não conectado");
      return;
    }
    this.socket.on("device:status", callback);
  }

  offDeviceCreated(callback: (device: Device) => void): void {
    if (this.socket) {
      this.socket.off("device:created", callback);
    }
  }

  offDeviceStatusChanged(callback: (data: DeviceStatusEvent) => void): void {
    if (this.socket) {
      this.socket.off("device:status", callback);
    }
  }
}

export const socketService = new SocketService();
