import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      watch: false,
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest-setup.js',
      include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      reporters: ['default'],
      coverage: {
        provider: 'v8',
      },
    },
  }),
);
