<template>
  <div class="dashboard-layout">
    <Sidebar />
    <div class="right-layout" id="genCodeContainer">
      <router-view></router-view>
    </div>
    <Log />
    <myFooter />
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'

export default {
  name: 'Dashboard',
  components: {
    Sidebar
  }
}
</script>

<style lang="less">
.dashboard-layout {
  display: flex;
  height: 100vh;
  .right-layout {
    flex: 1;
    height: ~'calc(100% - 20px)';
    position: relative;
    overflow: auto;
    transform: scale(1);
  }
  .page-layout {
    // padding-top: 66px;
    // margin: 24px;
    .i-card {
      background: #fff;
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      padding: 24px 32px;
    }
  }
}
</style>
