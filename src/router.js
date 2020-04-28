import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: '/dashboard'
},{
    path: '/projects',
    name: 'projects',
    component: () => import('@/pages/projects/index')
}, {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/dashboard/index'),
    children: [
        {
            path: 'materials/:materialsName',
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
            path: 'setting',
            name: 'setting',
            component: () => import('@/pages/setting')
        },
        {
            path: 'tasks',
            name: 'tasks',
            component: () => import('@/pages/tasks')
        }
    ]
}];

const router = new VueRouter({
    routes
});

export default router;
