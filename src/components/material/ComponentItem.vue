<template>
    <div class="item component-item">
        <div class="name">{{info.name}}</div>
        <p class="desc">{{info.description}}</p>
        <div class="options">
            <span>文档</span>
            <span @click="install">安装</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ComponentItem',
    props: {
        info: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        install () {
            console.log(this.info.npm);
        }
    }
}
</script>

<style lang="less">
.component-item {
    background: #344a5e;
    border-radius: 4px;
    color: #fff;
    margin-top: 20px;
    padding: 20px;
    position: relative;
    height: 125px;
    .desc {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 20px;
    }
    .options {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: @color;
        span {
            width: 50%;
            display: inline-block;
            text-align: center;
            cursor: pointer;
        }
    }
}
</style>