import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: '/home'
}, {
    path: '/home',
    component: () => import('@/pages/home/index')
}, {
    path: '/blocks',
    component: () => import('@/pages/blocks')
}, {
    path: '/material/help',
    component: () => import('@/pages/material/help')
}, {
    path: '/dependence',
    component: () => import('@/pages/dependence')
}, {
    path: '/setting',
    component: () => import('@/pages/setting')
}, {
    path: '/create',
    component: () => import('@/pages/create')
}];

const router = new VueRouter({
    routes
});

export default router;
