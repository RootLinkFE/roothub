<template>
    <div class="block-item">
        <div class="img">
            <img :src="info.screenshot" @click="previewImg">
        </div>
        <div class="name">{{info.name}}</div>
        <div class="desc">{{info.description}}</div>
        <div class="options">
            <a @click="openSource(info.sourceCode)">源码</a>/
            <a @click="download(info)">下载</a>
        </div>
    </div>
</template>

<script>
import Api from '@/api';

export default {
    name: 'BlockItem',
    props: {
        info: {
            type: Object,
            default: () => ({})
        },
        materialsName: {
            type: String,
            required: true
        }
    },
    methods: {
        previewImg () {
            this.$Modal.info({
                title: '大图预览',
                content: `<div class="preview-img"><img src="${this.info.screenshot}"></div>`,
                width: '80%',
                closable: true,
                okText: ''
            });
        },
        openSource (url) {
            window.open(url);
        },
        download (item) {
            Api.get(`/blocks/${item.name}`, {
                params: {
                    materialsName: this.materialsName
                }
            }).then((res) => {
                this.$Notice.success({
                    title: '提示',
                    desc: `下载区块位于.pandora/blocks/${item.name}`
                });
            });
        }
    }
};
</script>

<style lang="less">
.preview-img {
    width: 100%;
    img {
        max-width: 100%;
        max-height: 100%;
    }
}
.block-item {
    border: 1px solid #f2f2f2;
    border-radius: 4px;
    position: relative;
    padding: 10px 15px;
    text-align: center;
    height: 230px;
    overflow: hidden;
    &:hover {
        box-shadow: 0 2px 7px rgba(0,0,0,.15);
    }
    .img {
        width: 100%;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
    .name {
        height: 36px;
        line-height: 36px;
        font-weight: 600;
        font-size: 16px;
    }
    .desc {
        font-size: 12px;
        color: #888;
        margin-bottom: 5px;
        height: 38px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
    .options {
        height: 34px;
        line-height: 34px;
        font-size: 13px;
        text-align: center;
        display: flex;
        justify-content: space-between;
        a {
            width: 49%;
            cursor: pointer;
            display: block;
        }
    }
}
</style>
