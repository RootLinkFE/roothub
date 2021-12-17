import apps, { genCodeApp } from './apps'
// 一个进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
  registerMicroApps,
  addGlobalUncaughtErrorHandler,
  // runAfterFirstMounted,
  initGlobalState,
  prefetchApps
} from 'qiankun'

/**
 * 注册微应用
 * 第一个参数 - 微应用的注册信息
 * 第二个参数 - 全局生命周期钩子
 */
registerMicroApps(process.env.VUE_APP_MICRO_TYPE === 'load' ? [] : apps, {
  // qiankun 生命周期钩子 - 微应用加载前
  beforeLoad: app => {
    console.log('微应用加载前')
    // 加载微应用前，加载进度条
    NProgress.start()
    console.log('before load', app.name)
    return Promise.resolve()
  },
  // qiankun 生命周期钩子 - 微应用挂载后
  afterMount: app => {
    console.log('微应用加载后')
    // 加载微应用前，进度条加载完成
    NProgress.done()
    console.log('after mount', app.name)
    return Promise.resolve()
  }
})

/**
 * 添加全局的未捕获异常处理器
 */
addGlobalUncaughtErrorHandler(event => {
  console.error('qiankun报错', event)
  const { message: msg } = event
  // 加载失败时提示
  if (msg && msg.includes('died in status LOADING_SOURCE_CODE')) {
    this.$Message.error('微应用加载失败，请检查应用是否可运行')
  }
  return Promise.resolve()
})

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun'
})

onGlobalStateChange((value, prev) => {
  console.log('[onGlobalStateChange - master]:', value, prev)
})

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master'
  }
})

// 预加载codegen 子应用代码
prefetchApps([{ name: genCodeApp.name, entry: genCodeApp.entry }])
