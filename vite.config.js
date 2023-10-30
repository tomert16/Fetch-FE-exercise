import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      port: 8080,
      proxy: {
        '/api1': {
          target: env.VITE_API_ENDPOINT,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api1/, ''),
          headers: {
            Connection: 'keep-alive',
            'Access-Control-Allow-Origin': '*',
          },
        },
      },
    },
  };
});