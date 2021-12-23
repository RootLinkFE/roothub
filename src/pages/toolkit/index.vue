

<template>
  <div>
    <DashboardHeader title="工具箱"> </DashboardHeader>
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
  name: 'ToolboxPage',
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
  align-content: flex-start;
  .cover {
    height: 65px;
  }
  .item {
    width: 285px;
    height: 165px;
    margin-left: 20px;
    margin-bottom: 20px;
  }
}
</style>
