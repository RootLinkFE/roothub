<template>
    <div class="pg-tasks">
        <DashboardHeader title="任务"></DashboardHeader>
        <PageWrap>
            <div class="item" v-for="(item, key) in scripts" :key="key"
                :class="{active: key === activeName}"
                @click="execHandler(key)">
                <img src="https://gw.alipayobjects.com/zos/basement_prod/fb3b6fab-253e-41fc-981a-8bfc5dc4fede.svg"/>
                <div class="info">
                    <div class="name">{{key}}</div>
                    <div class="detail">{{item}}</div>
                </div>
            </div>
        </PageWrap>
    </div>
</template>

<script>
import Api from '@/api';
import socket from '@/api/socket';

export default {
    name: 'Tasks',
    data () {
        return {
            scripts: {},
            activeName: '',
            currentScript: null
        }
    },
    methods: {
        execHandler (cmd) {
            this.$store.commit('setLogShow', true);
            setTimeout(() => {
                socket.emit('exec task', cmd);
            }, 1000);
        }
    },
    mounted () {
        Api.get('/pkg/scripts').then(res => {
            this.scripts = res;
        })
    }
}
</script>

<style lang="less" scoped>
.item {
    padding: 15px 20px;
    color: var(--text-color);
    cursor: pointer;
    overflow: hidden;
    display: flex;
    align-items: center;
    line-height: 1;
    img {
        margin-right: 20px;
        width: 32px;
    }
    .name {
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 500;
    }
    .detail {
        color: #666;
    }
    &:hover,
    &.active {
        background: #2c2d36;
    }
}
</style>
