import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import path from 'path';

export default defineConfig({
    plugins: [react()],
    base: './',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        assetsDir: 'assets',
    },
    rollupOptions: {
        output: {
            manualChunks: undefined,
            inlineDynamicImports: true,
        },
    },
    // resolve: {
    //     alias: {
    //         '@': path.resolve(__dirname, 'src'),
    //     },
    // },
});
