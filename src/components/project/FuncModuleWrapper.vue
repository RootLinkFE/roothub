<template>
    <div class="func-module-wrapper">
        <div class="top">
            <slot name="top"></slot>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FuncModuleWrapper'
}
</script>

<style lang="less">
.func-module-wrapper {
    overflow: hidden;
    border-radius: 4px;
    .top {
        height: 40px;
        background: #7f929c;
        font-weight: bolder;
        color: #fff;
        padding: 10px 15px;
    }
    .content {
        //background: #1d2935;
        border: 1px solid #409eff;
        height: 300px;
        overflow: scroll;
        padding: 15px;
    }
}
</style>