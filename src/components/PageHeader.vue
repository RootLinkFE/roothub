<template>
    <div class="page-header">
        <span>工作目录：{{workingDirectory || '无'}}</span>
        <div>
            <a href="http://f2e.souche.com/projects/loan/magic-park/docs/" target="_blank">文档</a>
            <a href="https://git.souche-inc.com/loan/magic-park/showbox/issues" target="_blank">反馈</a>
        </div>
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
    },
    computed: {
        workingDirectory: function () {
            return this.$store.state.workingDirectory;
        }
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
    justify-content: space-between;
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
        margin-left: 20px;
    }
}
</style>
