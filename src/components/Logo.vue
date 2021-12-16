<template>
  <div class="logo">
    <img :src="logoImg" alt="物料资产平台" />
    <div v-show="sidebarOpen" class="text">
      <div class="t1">ROOTHUB</div>
      <div class="t2">物料资产平台</div>
    </div>
  </div>
</template>

<script>
import logoImg from '../assets/logo.png'
export default {
  name: 'Logo',
  data() {
    return { logoImg }
  },
  computed: {
    sidebarOpen() {
      return this.$store.state.sidebarOpen
    }
  }
}
</script>

<style lang="less">
.logo {
  display: flex;
  align-items: center;
  line-height: 1;
  img {
    width: 40px;
    border-radius: 20px;
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
