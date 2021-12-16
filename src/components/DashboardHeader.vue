<template>
  <div class="dashboard-header">
    <i
      class="iconfont toggle-icon"
      :class="{ iconmenuoff: sidebarOpen, iconmenuon: !sidebarOpen }"
      @click="toggleSidebar"
    ></i>
    <div class="title" v-if="title">{{ title }}</div>
    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardHeader',
  props: {
    title: String
  },
  data() {
    return {
      value: ''
    }
  },
  computed: {
    sidebarOpen() {
      return this.$store.state.sidebarOpen
    }
  },
  methods: {
    toggleSidebar() {
      this.$store.commit('toggleSidebar')
    }
  }
}
</script>

<style lang="less">
.dashboard-header {
  position: fixed;
  background: var(--dashboard-header-background);
  width: 100%;
  padding: 0 24px;
  height: 63px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 10;
  box-sizing: border-box;
  //   color: var(--dashboard-header--title);
  box-shadow: 0 2px 4px 0 #e8e7e8;
  border-bottom: 1px solid #e8e8e8;
  .toggle-icon {
    width: 20px;
    font-size: 20px;
    margin-right: 20px;
    cursor: pointer;
  }
  .title {
    font-size: 18px;
    line-height: 1;
    color: inherit;
  }
  .right {
    flex: 1;
  }
  a {
    color: inherit;
    margin-left: 20px;
  }
}
</style>
