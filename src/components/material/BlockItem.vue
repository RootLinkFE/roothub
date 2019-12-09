<template>
    <div class="item block-item">
        <div class="img">
            <img :src="info.screenShoot" :alt="info.alias">
        </div>
        <div class="name">{{info.alias}}</div>
        <div class="options">
            <span @click="download">下载</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BlockItem',
    props: {
        info: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        download () {
            
        }
    }
};
</script>

<style lang="less">
.block-item {
    background: #344a5e;
    border-radius: 4px;
    color: #fff;
    position: relative;
    &:hover {
        .options {
            display: block;
        }
    }
    .img {
        width: 100%;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
    .name {
        height: 36px;
        line-height: 36px;
        text-align: center;
        border-top: .5px solid #456382;
    }
    .options {
        position: absolute;
        display: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 200px;
        line-height: 40px;
        font-size: 13px;
        background: rgba(0, 0, 0, .8);
        text-align: center;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        span {
            margin-top: 80px;
            width: 40px;
            height: 40px;
            border-radius: 100%;
            background: @color;
            color: #fff;
            display: inline-block;
            text-align: center;
            cursor: pointer;
        }
    }
}
</style>