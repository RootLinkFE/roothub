<template>
    <footer>
        <span><i class="iconfont iconfolder"></i></span>
    </footer>
</template>

<script>
export default {
    name: 'MyFooter'
}
</script>

<style lang="less" scoped>
footer {
    height: 36px;
    width: 100vw;
    padding: 0 10px;
    position: fixed;
    bottom: 0;
    left: 0;
    background: @color;
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 13px;
    box-shadow: 0 -3px 5px 0 rgba(0, 0, 0, .12);
    .iconhome {
        margin-right: 15px;
    }
}
</style>