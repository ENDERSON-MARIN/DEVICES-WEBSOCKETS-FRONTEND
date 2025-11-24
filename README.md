# Vue 3 Frontend - Device Management

Frontend application for IoT device management with real-time updates.

## 🚀 Technologies

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **Socket.IO Client** - Real-time WebSocket communication
- **Axios** - HTTP client

## 📦 Installation

```bash
npm install
```

## 🔧 Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_SOCKET_URL=http://localhost:8080
```

## 🚀 Running

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 📡 Features

- ✅ Create new devices with name and MAC address
- ✅ List all devices in a table
- ✅ Toggle device status (ATIVO/INATIVO)
- ✅ Real-time updates via WebSocket
  - New device creation notifications
  - Status change notifications
- ✅ Form validation
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── button.vue
│   │   ├── input.vue
│   │   ├── badge.vue
│   │   └── toast.vue
│   ├── device-form.vue
│   └── device-table.vue
├── composables/
│   ├── use-devices.ts
│   └── use-toast.ts
├── services/
│   ├── api.ts
│   ├── device-service.ts
│   └── socket-service.ts
├── types/
│   └── device.ts
├── App.vue
├── main.ts
└── style.css
```

## 🔌 API Integration

The frontend connects to the backend API at `http://localhost:8080/api` with the following endpoints:

- `GET /devices` - List all devices
- `POST /devices` - Create new device
- `PATCH /devices/:id/status` - Toggle device status

## 🔄 Real-time Updates

WebSocket events:

- `device:created` - Triggered when a new device is created
- `device:status` - Triggered when a device status changes

## 📝 Notes

- Make sure the backend API is running before starting the frontend
- The backend must have CORS configured to accept requests from `http://localhost:5173`
- WebSocket connection is established automatically on app mount
