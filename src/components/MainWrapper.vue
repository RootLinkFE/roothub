<template>
    <div class="main-wrapper">
        <slot></slot>
    </div>
</template>

<style lang="less">
.main-wrapper {
    height: ~"calc(100vh - 36px)";
    width: 100%;
    padding: 20px;
    overflow: scroll;
}
</style>