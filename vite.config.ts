import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [
      react(),
      federation({
        name: 'hubert_host',
        remotes: {
          // Conexión dinámica: Nube en Producción, Localhost en Desarrollo
          portfolio_remote: isProd 
            ? 'https://hubert-portfolio-remote.vercel.app/assets/remoteEntry.js'
            : 'http://localhost:5001/assets/remoteEntry.js',
        },
        shared: ['react', 'react-dom', 'react-router-dom', '@reduxjs/toolkit', 'react-redux']
      })
    ],
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false
    }
  };
});