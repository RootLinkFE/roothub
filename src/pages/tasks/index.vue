<template>
    <div class="pg-tasks">
        <DashboardHeader title="任务"></DashboardHeader>
        <div class="content">
            <div class="left">
                <div class="item" v-for="(item, key) in scripts" :key="key"
                @click="clickHandler(item)">
                    <img src="https://gw.alipayobjects.com/zos/basement_prod/fb3b6fab-253e-41fc-981a-8bfc5dc4fede.svg"/>
                    <div class="info">
                        <div class="name">{{key}}</div>
                        <div class="detail">{{item}}</div>
                    </div>
                </div>
            </div>
            <div class="right" v-show="currentScript">
                <Button type="primary">执行</Button>
                <p class="">{{currentScript}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '@/api';

export default {
    name: 'Tasks',
    data () {
        return {
            scripts: {},
            currentScript: null
        }
    },
    methods: {
        clickHandler(item) {
            this.currentScript = item;
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
.content {
    display: flex;
    border-top: 1px solid #000;
    .left {
        width: 240px;
        height: ~"calc(100vh - 100px)";
        overflow-y: scroll;
        border-right: 1px solid #000;
        .item {
            padding: 15px 20px;
            color: #fff;
            cursor: pointer;
            overflow: hidden;
            display: flex;
            align-items: center;
            line-height: 1;
            img {
                margin-right: 20px;
                width: 32px;
            }
            .info {
                width: 145px;
            }
            .name {
                margin-bottom: 10px;
                font-size: 16px;
            }
            .detail {
                .text-overflow();
                width: 100%;
                height: 17px;
            }
            &:hover {
                background: #2c2d36;
            }
        }
    }
    .right {
        flex: 1;
        padding: 24px;
        color: #fff;
    }
}
</style>
