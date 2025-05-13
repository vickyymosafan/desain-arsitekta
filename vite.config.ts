import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
            // Add this to ensure all page components are processed
            buildDirectory: 'build',
        }),
        react(),
        tailwindcss(),
    ],
    build: {
        // Ensure chunks are properly named and preserved
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // Put page components in their own chunk
                    if (id.includes('/pages/')) {
                        return id.toString().split('/pages/')[1].split('.')[0].replace(/\//g, '_');
                    }
                }
            }
        }
    },
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
            '@': resolve(__dirname, 'resources/js'),
        },
    },
});
