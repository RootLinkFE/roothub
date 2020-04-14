import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
    path: '/home',
    name: 'home',
    component: () => import('@/pages/home/index')
}, {
    path: '/materials/:materialsName',
    name: 'materials',
    component: () => import('@/pages/materials'),
    children: [{
        path: 'blocks',
        name: 'blocks',
        component: () => import('@/pages/blocks')
    }, {
        path: 'components',
        name: 'components',
        component: () => import('@/pages/components')
    }]
}, {
    path: '/dependence',
    name: 'dependence',
    component: () => import('@/pages/dependence')
}, {
    path: '/setting',
    name: 'setting',
    component: () => import('@/pages/setting')
}, {
    path: '/create',
    component: () => import('@/pages/create')
}];

const router = new VueRouter({
    routes
});

export default router;
