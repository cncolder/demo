import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  clearScreen: false,

  plugins: [
    ...VitePluginNode({
      adapter: 'koa',
      appPath: './src/app.ts',
      exportName: 'app',
    }),
  ],
});
