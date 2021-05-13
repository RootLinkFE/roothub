<template>
  <div class="logo">
    <i class="iconfont iconpandora"></i>
    <div v-show="sidebarOpen" class="text">
      <div class="t1">ROOTHUB</div>
      <div class="t2">物料资产平台</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  computed: {
    sidebarOpen() {
      return this.$store.state.sidebarOpen
    },
  },
}
</script>

<style lang="less">
.logo {
  display: flex;
  align-items: center;
  color: #fff;
  line-height: 1;
  i {
    font-size: 30px;
  }
  .text {
    margin-left: 8px;
  }
  .t1 {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 3px;
  }
  .t2 {
    font-size: 12px;
  }
}
</style>
