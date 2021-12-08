import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import routes from "./routes";

export const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes,
})

