
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
    <PageWrap class="toolPage">
      <Card v-for="item of list" :key="item.key" class="item">
        <div style="text-align: center">
          <img :src="item.image" class="cover" />
          <h3>
            <a :href="item.url" target="_blank">{{ item.title }}</a>
          </h3>
          <span v-text="item.description"></span>
        </div>
      </Card>
    </PageWrap>
  </div>
</template>

<script>
import { ToolkitData } from './toolkitData'
export default {
  name: 'CodegenPage',
  components: {},
  data() {
    return {
      list: ToolkitData
    }
  },
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.toolPage {
  display: flex;
  flex-wrap: wrap;
  .cover {
    height: 65px;
  }
  .item {
    width: 320px;
    height: 165px;
    margin-left: 20px;
  }
}
</style>
