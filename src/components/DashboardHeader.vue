<template>
    <div class="dashboard-header">
        <div class="title" v-if="title">{{title}}</div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DashboardHeader',
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
.dashboard-header {
    background: var(--dashboard-background);
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    width: 100%;
    padding:0 20px;
    height: 63px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // position: fixed;
    top: 0;
    left: 180px;
    z-index: 10;
    box-sizing: border-box;
    .title {
        font-size: 22px;
        color: #1a1a1a;
    }
    a {
        color: inherit;
        margin-left: 20px;
    }
}
</style>
