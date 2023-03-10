import { defineConfig, splitVendorChunkPlugin } from 'vite';
// import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import mkcert from 'vite-plugin-mkcert';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  server: {
    port: 3000,
    https: true,
  },
  build: {
    outDir: 'build',
    chunkSizeWarningLimit: 2700,
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
  plugins: [
    mkcert(),
    react({ plugins: [['@swc/plugin-styled-components', {}]] }),
    splitVendorChunkPlugin(),
    // chunkSplitPlugin({
    //   strategy: 'unbundle',
    // }),
  ],
});