
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
    <PageWrap><div ref="microApp" id="genCodeContainer"></div></PageWrap>
  </div>
</template>

<script>
import { loadMicroApp } from 'qiankun'
import { genCodeApp } from '../../qiankun'
export default {
  name: 'GenCode',
  components: {},
  data() {
    return {}
  },
  watch: {},
  mounted() {
    this.microApp = loadMicroApp({
      name: genCodeApp.name,
      entry: genCodeApp.entry,
      container: this.$refs.microApp
    })
  },
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
