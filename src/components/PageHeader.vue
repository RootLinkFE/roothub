<template>
    <div class="page-header">
        <!-- <Input v-model="value" placeholder="搜索物料" style="width: 300px">
            <Icon type="ios-search" slot="suffix" />
        </Input> -->
        <a href="">文档</a>
    </div>
</template>

<script>
export default {
    name: 'PageHeader',
    props: {
        title: String
    },
    data () {
        return {
            value: ''
        };
    }
};
</script>

<style lang="less">
.page-header {
    background: linear-gradient(90deg,#1d1e23,#3f4045);
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    width: ~"calc(100% - 180px)";
    padding:0 20px;
    height: 63px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 180px;
    z-index: 10;
    color: @color;
    box-sizing: border-box;
    .title {
        font-size: 22px;
        color: #fff;
    }
    a {
        color: inherit;
    }
}
</style>
