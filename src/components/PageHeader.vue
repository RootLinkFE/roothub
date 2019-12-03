<template>
    <div class="page-header">
        <div class="title">{{title}}</div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'PageHeader',
    props: {
        title: String
    }
};
</script>

<style lang="less">
.page-header {
    background: #344a5f;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
        font-size: 18px;
        color: #fff;
    }
}
</style>