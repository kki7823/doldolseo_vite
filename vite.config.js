import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            // '/doldolseo/area': {
            //     target: 'http://localhost:9000',
            //     changeOrigin: true,
            //     rewrite: (path) => path.replace('^/', '')
            // },
            // '/doldolseo/member': {
            //     target: 'http://localhost:9000',
            //     changeOrigin: true,
            //     rewrite: (path) => path.replace('^/', '')
            // },
            // '/doldolseo/review': {
            //     target: 'http://localhost:9000',
            //     changeOrigin: true,
            //     rewrite: (path) => path.replace('^/', '')
            // },
            '/doldolseo/crew/post': {
                target: 'http://localhost:8091',
                changeOrigin: true,
                rewrite: (path) => path.replace('^/', '')
            },
            '/doldolseo/crew': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace('^/', '')
            },



        },
    }
})
