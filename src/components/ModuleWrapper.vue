<template>
    <div class="module-wrapper">
        <div class="header">{{title}}</div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ModuleWrapper',
    props: {
        title: String
    }
};
</script>

<style lang="less">
.module-wrapper {
    background: #1d2935;
    border-radius: 5px;
    .header {
        color: #e4f5ef;
        padding: 16px;
    }
}
</style>