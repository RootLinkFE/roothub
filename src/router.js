import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

const originalReplace = VueRouter.prototype.replace

VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  /*  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/pages/projects/index'),
  }, */
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/dashboard/index'),
    /*  beforeEnter: (to, from, next) => {
      store.dispatch('getWorkingDirectory').then((res) => {
        if (res) next();
        else next('/projects');
      });
    }, */
    redirect: '/dashboard/overview',
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: () => import('@/pages/home/home')
      },
      {
        path: 'materials',
        name: 'materials',
        component: () => import('@/pages/materials'),
        children: [
          {
            path: 'blocks',
            name: 'blocks',
            component: () => import('@/pages/blocks')
          },
          {
            path: 'components',
            name: 'components',
            component: () => import('@/pages/components')
          }
        ]
      },
      {
        path: 'blocks',
        name: 'blocks',
        component: () => import('@/pages/blocks')
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/pages/setting')
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: () => import('@/pages/tasks')
      },
      {
        path: 'dependence',
        name: 'dependence',
        component: () => import('@/pages/dependence')
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/pages/resource')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
