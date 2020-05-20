<template>
    <span class="framework-icons" :style="{fontSize: size + 'px'}">
        <i class="iconfont iconvuejs-fill" style="color: #39b582;" v-if="type === 'Vue'"></i>
        <i class="iconfont iconreact" style="color: #61dafb;" v-else-if="type === 'React'"></i>
        <i class="iconfont iconangularjs-fill" style="color: #d9534f;" v-else-if="type === 'Angular'"></i>
        <i class="iconfont iconbxl-bootstrap" style="color: #563d7c;" v-else-if="type === 'Bootstrap'"></i>
    </span>
</template>

<script>
export default {
    props: {
        type: String,
        size: {
            type: Number,
            default: 24
        }
    }
};
</script>

<style lang="less">
.framework-icons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 100%;
    background: #fff;
    text-align: center;
    margin-right: 10px;
    .iconfont {
        font-size: inherit;
    }
}
</style>
