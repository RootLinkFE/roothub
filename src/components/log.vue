<template>
    <div class="log">
        <div class="top">
            <span>日志</span>
            <i class="iconfont iconshanchu"></i>
        </div>
        <div class="content">
            {{log}}
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';

const LOG = gql`subscription{
    log
}`;

export default {
    name: 'Log',
    data () {
        return {
            log: ''
        }
    },
    apollo: {
        //
    }
};
</script>

<style lang="less">
.log {
    position: fixed;
    bottom: 36px;
    left: 0;
    width: 100%;
    height: 200px;
    overflow: scroll;
    background: #1d2935;
    color: #fff;
    box-shadow: 0 -3px 5px 0 rgba(0, 0, 0, .12);
    .top {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        align-items: center;
    }
    .content {
        padding: 20px;
    }
    .iconshanchu {
        cursor: pointer;
    }
}
</style>