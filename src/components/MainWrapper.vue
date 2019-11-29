<template>
    <div class="main-wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="less">
.main-wrapper {
    height: ~"calc(100vh - 36px)";
    width: 100%;
    padding: 40px;
    .content {
        border-radius: 8px;
        background: #2c3e50;
        width: 100%;
        height: 100%;
        overflow: scroll;
        padding: 20px;
    }
}
</style>