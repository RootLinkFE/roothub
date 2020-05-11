<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import socket from '@/api/socket';
import "normalize.css";

export default {
    name: "app",
    data () {
        return {
        }
    },
    created () {
        socket.on('news', data => {
            console.log(data);
        });
        this.$store.dispatch('getWorkingDirectory');
    }
};
</script>

<style lang="less">
@import './style/common.less';
@import './style/light.css';
@import './style/dark.css';
#app, body, html {
    height: 100%;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--body-bg);
    color: #515a6e;
    font-size: 14px;
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
ul,li,ol{
    list-style-type: none;
}
</style>
