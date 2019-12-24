<template>
    <div id="app">
        <div class="main-layout">
            <sidebar v-if="path !== '/create'" />
            <router-view class="page-layout"></router-view>
        </div>
        <Log />
        <my-footer></my-footer>
    </div>
</template>

<script>
import "normalize.css";
import Sidebar from "@/components/Sidebar";
import MyFooter from "@/components/Footer";
import Log from '@/components/Log';
import Api from '@/api';

export default {
    name: "app",
    data () {
        return {
            path : ''
        }
    },
    created () {
        this.$store.dispatch('getProject');
    },
    components: {
        MyFooter,
        Sidebar
    },
    watch: {
        $route: {
            handler (val) {
               this.path = val.path
            }
        }
    }
};
</script>

<style lang="less">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #3a5169;
}
.main-layout {
    display: flex;
    height: ~"calc(100vh - 36px)";
    .page-layout {
        flex: 1;
        height: 100%;
        overflow: scroll;
    }
}
* {
    box-sizing: border-box;
}
p {
    margin-top: 0;
    line-height: 1.8;
}
a {
    color: inherit;
    text-decoration: none;
    &:active,
    &:visited,
    &:link {
        color: inherit;
    }
}
pre {
    background: #0f161d;
    border-radius: 4px;
    padding: 15px;
}
</style>
