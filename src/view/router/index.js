import Vue from 'vue'
import VueRouter from 'vue-router'
import WallpaperIndex from '../pages/wallpaper/Index'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: WallpaperIndex,
    },
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior: function () {
        return { x: 0, y: 0 }
    },
});

export default router
