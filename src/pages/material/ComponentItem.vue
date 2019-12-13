<template>
    <div class="item component-item">
        <div class="name">{{info.name}}</div>
        <p class="desc">{{info.description}}</p>
        <div class="options">
            <div class="wrap">
                <span style="marginRight: 20px;">文档</span>
                <span @click="install">安装</span>
            </div>
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
    &:hover {
        .options {
            display: block;
        }
    }
    .name {
        margin-bottom: 15px;
    }
    .desc {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 20px;
        font-size: 12px;
        color: #b3b3b3;
    }
    .options {
        position: absolute;
        display: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        line-height: 40px;
        font-size: 13px;
        background: rgba(0, 0, 0, .8);
        text-align: center;
        border-radius: 4px;
        .wrap {
            display: flex;
            justify-content: center;
        }
        span {
            width: 40px;
            height: 40px;
            border-radius: 100%;
            background: @color;
            color: #fff;
            display: inline-block;
            text-align: center;
            cursor: pointer;
            margin-top: 32px;
        }
    }
}
</style>