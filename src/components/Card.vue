<template>
    <div class="card">
        <div class="title" v-if="title">{{title}}</div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        title: String
    }
};
</script>

<style lang="less">
.card {
    background: #1d2935;
    border-radius: 5px;
    .title {
        color: #e4f5ef;
        padding: 30px;
    }
    .content {
        padding: 30px;
        color: #fff;
    }
}
</style>