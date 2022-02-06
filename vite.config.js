import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

const URL_DOLDOLSEO_GW = "http://127.0.0.1:51633"

export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/doldolseo/area': {
                target: URL_DOLDOLSEO_GW,
                changeOrigin: true,
                rewrite: (path) => path.replace('^/', '')
            },
            '/doldolseo/member': {
                target: URL_DOLDOLSEO_GW,
                changeOrigin: true,
                rewrite: (path) => path.replace('^/', '')
            },
            '/doldolseo/review': {
                target: URL_DOLDOLSEO_GW,
                changeOrigin: true,
                rewrite: (path) => path.replace('^/', '')
            },
            '/doldolseo/crew/post': {
                target: URL_DOLDOLSEO_GW,
                changeOrigin: true,
                rewrite: (path) => path.replace('^/', '')
            },
            '/doldolseo/crew': {
                target: URL_DOLDOLSEO_GW,
                changeOrigin: true,
                rewrite: (path) => path.replace('^/', '')
            },
        },
    }
})
