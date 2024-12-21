import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: '../.env',
  server: {
    host: true,
    port: Number(process.env.CLIENT_PORT),
  },
  preview: {
    port: Number(process.env.CLIENT_PORT),
  },
});
