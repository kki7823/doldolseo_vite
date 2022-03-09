import {createRouter, createWebHashHistory} from "vue-router";
import routes from "./routes.js";

export const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes,
})

