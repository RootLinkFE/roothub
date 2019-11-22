import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    component: () => import('@/components/home/Index')
}];

const router = new VueRouter({
    routes
});

export default router;