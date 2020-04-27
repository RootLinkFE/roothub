<template>
    <div id="app">
        <div class="main-layout">
            <sidebar/>
            <div class="right-layout">
                <PageHeader title="项目仪表盘"></PageHeader>
                <div class="page-layout">
                    <router-view class="i-card"></router-view>
                </div>
            </div>
        </div>
        <Log />
        <!-- <my-footer /> -->
    </div>
</template>

<script>
import "normalize.css";
import Sidebar from "@/components/Sidebar";
import PageHeader from '@/components/PageHeader';

// import MyFooter from "@/components/Footer";
import Log from '@/components/Log';

export default {
    name: "app",
    data () {
        return {
        }
    },
    created () {
        this.$store.dispatch('getWorkingDirectory');
    },
    components: {
        // MyFooter,
        Sidebar,
        Log,
        PageHeader
    }
};
</script>

<style lang="less">
@import './style/common.less';

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #f5f7f9;
    color: #515a6e;
    font-size: 14px;
}
.main-layout {
    display: flex;
    height: 100vh;
    .right-layout {
        flex: 1;
        height: 100%;
        position: relative;
        overflow: scroll;
    }
    .page-layout {
        padding-top: 66px;
        margin: 24px;
        .i-card {
            background: #fff;
            box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
            border-radius: 4px;
            padding: 24px 32px;
        }
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
