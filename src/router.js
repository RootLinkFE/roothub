import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: '/project'
}, {
    path: '/project',
    component: () => import('@/pages/project')
}, {
    path: '/material',
    component: () => import('@/pages/material')
}, {
    path: '/material/help',
    component: () => import('@/pages/material/help')
}, {
    path: '/dependence',
    component: () => import('@/pages/dependence')
}, {
    path: '/setting',
    component: () => import('@/pages/setting')
}];

const router = new VueRouter({
    routes
});

export default router;