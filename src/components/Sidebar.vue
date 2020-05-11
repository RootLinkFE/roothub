<template>
    <div class="sidebar">
        <Logo></Logo>
        <ul class="navs">
            <li>
                <router-link to="/dashboard/overview"><Icon type="md-home" />首页</router-link>
            </li>
            <li>
                <a class="group-title" href="javascript:void(0)" @click="subNavShow = !subNavShow"><span><Icon type="logo-codepen" />物料</span><Icon type="ios-arrow-down" style="margin-right: 0;"></Icon></a>
                <div class="sub-nav" v-if="subNavShow">
                    <router-link v-for="(item, key) in materials" :key="key" :to="`/dashboard/materials/${item.name}/blocks`">
                    {{item.alias}}
                    </router-link>
                </div>
            </li>
            <li>
                <router-link to="/dashboard/tasks"><Icon type="md-list-box" />任务</router-link>
            </li>
            <li>
                <router-link to="/dashboard/dependence"><Icon type="md-cube" />依赖</router-link>
            </li>
            <li>
                <router-link to="/dashboard/setting"><Icon type="md-settings" />配置</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import Api from '@/api';

export default {
    name: "Sidebar",
    data () {
        return {
            openNames: [],
            subNavShow: false
        };
    },
    computed: {
        materials () {
            return this.$store.state.materials;
        }
    },
    mounted () {
        this.$store.dispatch('getMaterials');
    }
};
</script>

<style lang="less">
.sidebar {
    background: var(--sidebar-bg);
    // box-shadow: 2px 0 6px rgba(0,21,41,.35);
    color: var(--sidebar-color);
    z-index: 11;
    width: 140px;
    .logo {
        // border-bottom: 1px solid #151515;
        margin-bottom: 20px;
        padding: 15px 30px;
    }
    .top {
        padding: 20px 0 20px 20px;
        font-size: 16px;
        i {
            margin-right: 20px;
        }
    }
    .navs {
        i {
            margin-right: 10px;
        }
        .group-title {
            padding: 0 30px;
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
            a {
                padding: 0 20px 0 55px;
            }
        }
        a:hover,
        .router-link-active {
            background: var(--sidebar-active);
            border-left: 4px solid @blue;
        }
    }
}
</style>
