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
import gql from 'graphql-tag';
import Sidebar from "@/components/Sidebar";
import MyFooter from "@/components/Footer";

export default {
    name: "app",
    apollo: {
        project: {
            query: gql`query {
                project {
                    version
                    cwd
                    type
                }
            }`,
            result(result) {
                this.$store.commit('setProject', result.data.project);
            }
        }
    },
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
p {
    margin-top: 0;
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
