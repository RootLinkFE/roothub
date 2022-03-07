
<!--
/**
 * @author giscafer
 * @email giscafer@outlook.com
 * @create date 2021-12-06 17:09:54
 * @modify date 2021-12-06 19:57:06
 * @desc 微前端嵌入代码生成器子服务
 */
 -->

<template>
  <div class="genCode">
    <DashboardHeader title="代码生成器"> </DashboardHeader>
    <PageWrap style="position: relative">
      <h3>网页版的CodeGen会存在跨域问题，也就是说如果swagger文档没有允许跨域，就无法请求。</h3>
      <h3>
        推荐使用无CORS的
        <a
          style="color: #4569d4"
          href="https://marketplace.visualstudio.com/items?itemName=giscafer.roothub"
          target="_blank"
          >VSCode RootHub插件</a
        >
      </h3>
      <Spin v-if="loading" class="spin">加载中…</Spin>
      <div ref="microApp"></div>
    </PageWrap>
  </div>
</template>

<script>
import { loadMicroApp } from 'qiankun'
import { genCodeApp } from '../../qiankun/apps'
export default {
  name: 'CodegenPage',
  components: {},
  data() {
    return {
      microApp: null,
      loading: true
    }
  },
  watch: {},
  mounted() {
    this.microApp = loadMicroApp({
      name: genCodeApp.name,
      entry: genCodeApp.entry,
      container: this.$refs.microApp
    })

    this.timer = setInterval(() => {
      const isMounted = this.microApp?.getStatus() === 'MOUNTED'
      this.loading = !isMounted
      if (isMounted) {
        clearInterval(this.timer)
        this.timer = null
      }
    }, 1000)
  },
  destroyed() {
    this.microApp?.unmount()
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
