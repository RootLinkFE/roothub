import create from './create'

const api = {
  create
}

export default {
  ...api,
  install: Vue => {
    Vue.prototype.$api = api
  }
}