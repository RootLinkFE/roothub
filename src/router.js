import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: '/home'
},{
    path: '/home',
    name: 'home',
    component: () => import('@/pages/home/Index')
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
    path: '/setting',
    name: 'setting',
    component: () => import('@/pages/setting')
}];

const router = new VueRouter({
    routes
});

export default router;
