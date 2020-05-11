<template>
    <div class="page-wrap">
        <slot></slot>
    </div>
</template>

<style lang="less">
.page-wrap {
    padding: 87px 24px 24px 24px;
    overflow-y: scroll;
    height: ~"calc(100vh - 40px)";
}
</style>
