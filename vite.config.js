import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/doldolseo/area': {
                target: 'http://localhost:53990',
                changeOrigin: true,
                rewrite: (path) => path.replace('^/', '')
            },
            '/doldolseo/member': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace('^/', '')
            },
        },
    }
})
