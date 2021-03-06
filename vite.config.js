import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const URL_DOLDOLSEO_GW = "http://34.64.123.102:9999"

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
            '/@': path.resolve(__dirname, './src'),
            '/@components': path.resolve(__dirname, './src/components'),
            // '/@router': path.resolve(__dirname, './src/router'),
        },
        extensions: [".js"],
    },

    // server: {
    //     proxy: {
    //         '/doldolseo/area': {
    //             target: URL_DOLDOLSEO_GW,
    //             changeOrigin: true,
    //             rewrite: (path) => path.replace('^/', '')
    //         },
    //         '/doldolseo/member': {
    //             target: URL_DOLDOLSEO_GW,
    //             changeOrigin: true,
    //             rewrite: (path) => path.replace('^/', '')
    //         },
    //         '/doldolseo/review': {
    //             target: URL_DOLDOLSEO_GW,
    //             changeOrigin: true,
    //             rewrite: (path) => path.replace('^/', '')
    //         },
    //         '/doldolseo/crew/post': {
    //             target: URL_DOLDOLSEO_GW,
    //             changeOrigin: true,
    //             rewrite: (path) => path.replace('^/', '')
    //         },
    //         '/doldolseo/crew': {
    //             target: URL_DOLDOLSEO_GW,
    //             changeOrigin: true,
    //             rewrite: (path) => path.replace('^/', '')
    //         },
    //     },
    // },

})
