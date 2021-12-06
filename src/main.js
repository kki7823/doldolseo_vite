import { createApp } from 'vue'
import App from './App.vue'
import {router} from "./module/router/router";

const app = createApp(App)
app.use(router)
app.mount('#app')
