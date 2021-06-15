<template>
  <footer>
    <div class="flex">
      <!--  <router-link class="item" to="/projects"><i class="iconfont iconqiehuan"></i>切换项目</router-link>
            <span class="item" title="打开文件夹" @click="open"><i class="iconfont iconlocation1"></i>{{workingDirectory}}</span>
            <span class="item" @click="toggleLog"><i class="iconfont iconicon-test"></i>日志</span> -->
    </div>
    <div class="flex">
      <a class="item" :href="DOC_URL" target="_blank"
        ><Icon type="ios-planet" size="20" />文档</a
      >
      <a class="item" :href="ISSUES" target="_blank"
        ><Icon type="ios-create" size="15" />issues</a
      >
      <span class="item"><Icon type="md-pricetags" />{{ version }}</span>
    </div>
  </footer>
</template>


<script>
import Api from '@/api'
import { DOC_URL, ISSUES } from '@/const'
const { version } = require('../../package.json')

export default {
  name: 'MyFooter',
  data() {
    return {
      visible: false,
      version,
      DOC_URL,
      ISSUES,
    }
  },
  computed: {
    logShow() {
      return this.$store.state.logShow
    },
    workingDirectory: function () {
      return this.$store.state.workingDirectory
    },
  },
  methods: {
    toggleLog() {
      this.$store.commit('setLogShow', !this.logShow)
    },
    open() {
      Api.get(`/finder/open?dirPath=${this.workingDirectory}`)
    },
  },
}
</script>

<style lang="less">
footer {
  height: 36px;
  width: 100vw;
  padding: 0 10px;
  position: fixed;
  z-index: 12;
  bottom: 0;
  left: 0;
  background: var(--footer-background);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  line-height: 1;
  box-shadow: 0 -3px 5px 0 rgba(0, 0, 0, 0.12);
  a,
  .item {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-right: 20px;
    i {
      margin-right: 2px;
    }
  }
}
</style>
