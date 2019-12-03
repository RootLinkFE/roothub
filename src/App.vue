<template>
    <div id="app">
        <div class="main-layout">
            <sidebar />
            <router-view class="page-layout"></router-view>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
import "normalize.css";
import Sidebar from "@/components/Sidebar";
import MyFooter from "@/components/Footer";

export default {
    name: "app",
    components: {
        MyFooter,
        Sidebar
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
a {
    color: inherit;
    text-decoration: none;
    &:active,
    &:visited,
    &:link {
        color: inherit;
    }
}
</style>
