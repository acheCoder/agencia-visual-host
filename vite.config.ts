import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'hubert-hub-host',
      // Aquí es donde en el futuro listaremos los microfrontales remotos
      remotes: {
        portfolio_remote: "http://localhost:5001/assets/remoteEntry.js",
        agencia_remote: "http://localhost:5002/assets/remoteEntry.js",
        fitness_remote: "http://localhost:5003/assets/remoteEntry.js",
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