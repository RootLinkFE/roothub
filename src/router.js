import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

const originalReplace = VueRouter.prototype.replace

VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

const routes = [
  /*  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/pages/projects/index'),
  }, */
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/pages/dashboard/index'),
    /*  beforeEnter: (to, from, next) => {
      store.dispatch('getWorkingDirectory').then((res) => {
        if (res) next();
        else next('/projects');
      });
    }, */
    redirect: '/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: () => import('@/pages/home/home')
      },
      {
        path: 'materials',
        name: 'Materials',
        component: () => import('@/pages/materials'),
        children: [
          {
            path: 'blocks',
            name: 'blocks',
            component: () => import('@/pages/blocks')
          }
          /* {
            path: 'components',
            name: 'components',
            component: () => import('@/pages/components')
          } */
        ]
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('@/pages/setting')
      },
      {
        path: 'tasks',
        name: 'Tasks',
        component: () => import('@/pages/tasks')
      },
      {
        path: 'dependence',
        name: 'Dependence',
        component: () => import('@/pages/dependence')
      },
      {
        path: 'resource',
        name: 'Resource',
        component: () => import('@/pages/resource')
      },
      /*  {
        path: 'codegen',
        name: 'Codegen',
        component: () => import('@/pages/codegen')
      }, */
      {
        path: 'toolkit',
        name: 'ToolKit',
        component: () => import('@/pages/toolkit')
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
