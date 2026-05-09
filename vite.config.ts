import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

const appPort = Number(process.env.PORT || 8080)

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackStart(),
    react(),
  ],
  server: {
    host: '0.0.0.0',
    port: appPort,
  },
  preview: {
    host: '0.0.0.0',
    port: appPort,
  },
})