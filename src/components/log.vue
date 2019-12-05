<template>
    <div class="log">
        <div class="top">
            <span>日志</span>
            <i class="iconfont iconshanchu" @click="clean"></i>
        </div>
        <div class="content">
            <p v-for="(item, key) in logData" :key="key">
                {{item}}
            </p>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';

const LOG_DATA = gql`subscription{
    logData
}`;

export default {
    name: 'Log',
    data () {
        return {
            logData: []
        }
    },
    apollo: {
        $subscribe: {
            // 当添加一个标签时
            logData: {
                query: LOG_DATA,
                // 结果钩子
                // 不要忘记对 `data` 进行解构
                result({ data }) {
                    this.logData.push(data.logData);
                    console.log(data.logData);
                }
            }
        }
    },
    methods: {
        clean () {
            this.logData = [];
        }
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
        height: 142px;
        overflow: scroll;
        p{
            margin-top: 0;
        }
    }
    .iconshanchu {
        cursor: pointer;
    }
}
</style>