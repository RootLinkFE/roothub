<template>
  <div class="sidebar">
    <Logo></Logo>
    <ul class="navs">
      <li>
        <router-link to="/dashboard/overview"
          ><Icon type="md-home" />
          <span v-show="sidebarOpen">首页</span>
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/materials">
          <Icon type="logo-codepen" /><span v-show="sidebarOpen">物料</span>
          <!-- <Icon type="ios-arrow-down" v-show="sidebarOpen" style="margin-right: 0;"></Icon> -->
        </router-link>
        <!-- <div class="sub-nav" v-show="subNavShow">
                    <router-link v-for="(item, key) in materials" :key="key" :to="`/dashboard/materials/${item.name}/blocks`">
                    {{item.alias}}
                    </router-link>
                </div> -->
      </li>
      <!--   <li>
                <router-link to="/dashboard/tasks"><Icon type="md-list-box" />
                    <span v-show="sidebarOpen">任务</span>
                </router-link>
            </li>
            <li>
                <router-link to="/dashboard/dependence"><Icon type="md-cube" />
                    <span v-show="sidebarOpen">依赖</span>
                </router-link>
            </li>
            <li>
                <router-link to="/dashboard/setting"><Icon type="md-settings" />
                    <span v-show="sidebarOpen">设置</span>
                </router-link>
            </li> -->
    </ul>
  </div>
</template>

<script>
import Api from '@/api'

export default {
  name: 'Sidebar',
  data() {
    return {
      openNames: [],
      subNavShow: false,
    }
  },
  computed: {
    materials() {
      return this.$store.state.materials
    },
    sidebarOpen() {
      return this.$store.state.sidebarOpen
    },
  },
  mounted() {},
}
</script>

<style lang="less">
.sidebar {
  background: var(--sidebar-bg);
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  color: var(--sidebar-color);
  z-index: 11;
  .logo {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #151515;
    margin-bottom: 20px;
    padding: 15px 15px;
  }
  .navs {
    li {
      position: relative;
    }
    i {
      margin-right: 10px;
    }
    .group-title {
      padding: 0 30px;
      line-height: 45px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-left: 4px solid transparent;
      cursor: pointer;
    }
    a {
      display: block;
      line-height: 45px;
      padding: 0 30px;
      border-left: 4px solid transparent;
    }
    .sub-nav {
      position: absolute;
      right: -138px;
      top: 0;
      background: var(--sidebar-bg);
      a {
        padding: 0 20px 0 55px;
      }
    }
    a:hover,
    .router-link-active {
      background: var(--sidebar-active);
      border-left: 4px solid @primary-color;
    }
  }
}
</style>
