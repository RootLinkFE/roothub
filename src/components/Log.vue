<template>
    <div class="log" v-show="show">
        <div class="top">
            <span>日志</span>
            <div>
                <i class="iconfont iconshanchu" @click="clean"></i>
                <i class="iconfont iconclose" @click="close"></i>
            </div>
        </div>
        <div class="content" id="log">
            <p v-for="(item, key) in logData" :key="key">
                {{item}}
            </p>
        </div>
    </div>
</template>

<script>
// import socket from '@/api/socket';

export default {
    name: 'Log',
    data () {
        return {
            logData: []
        }
    },
    computed: {
        show: function() {
            return this.$store.state.logShow;
        }
    },
    watch: {
        logData: function (params) {
            this.$nextTick(() => {
                const container = document.querySelector('#log');
                container.scrollTop = container.scrollHeight + 200;
            });
        }
    },
    methods: {
        clean () {
            this.logData = [];
        },
        close () {
            this.$store.commit('setLogShow', false);
        }
    },
    created () {
        // socket.on('log push', (data) => {
        //     this.logData.push(data);
        // });
    }
};
</script>

<style lang="less">
.log {
    position: fixed;
    z-index: 13;
    bottom: 36px;
    left: 0;
    width: 100%;
    height: 300px;
    background: #0b0b0d;
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
        height: 242px;
        overflow-y: scroll;
        p{
            margin-top: 0;
        }
    }
    .iconfont {
        cursor: pointer;
    }
    .iconclose {
        margin-left: 20px;
        font-size: 20px;
        vertical-align: middle;
    }
}
</style>
