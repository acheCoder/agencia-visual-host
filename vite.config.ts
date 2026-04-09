import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'app-host',
      // Aquí es donde en el futuro listaremos los microfrontales remotos
      remotes: {
        // Ejemplo: remoteClientes: "http://localhost:5001/assets/remoteEntry.js",
      },
      // Compartimos nuestras librerías base para que los remotos no las vuelvan a cargar
      shared: ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});