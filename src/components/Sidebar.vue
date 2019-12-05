<template>
    <div class="sidebar">
        <router-link to="/project">
            <i class="iconfont iconproject"></i>项目
        </router-link>
        <router-link to="/material">
            <i class="iconfont iconpintu"></i>物料
        </router-link>
        <router-link to="/dependence">
            <i class="iconfont iconyilaiku"></i>依赖
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Sidebar'
}
</script>

<style lang="less">
.sidebar {
    width: 80px;
    height: ~"calc(100vh - 36px)";
    background: #1d2935;
    color: #fff;
    padding-top: 30px;
    .router-link-active {
        color: @color;
    }
    a {
        display: block;
        position: relative;
        width: 100%;
        padding: 11px 0 8px 0;
        margin-bottom: 10px;
        text-align: center;
        i {
            display: block;
            font-size: 20px;
            margin-bottom: 5px;
        }
    }
}
</style>