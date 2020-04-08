<template>
    <div class="page-header">
        <!-- <Input v-model="value" placeholder="搜索物料" style="width: 300px">
            <Icon type="ios-search" slot="suffix" />
        </Input> -->
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
    width: 100%;
    padding:0 20px;
    height: 63px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    left: 180px;
    z-index: 10;
    .title {
        font-size: 22px;
        color: #fff;
    }
}
</style>
