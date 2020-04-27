<template>
    <div class="block-item">
        <div class="img">
            <img :src="info.screenshot" @click="previewImg">
        </div>
        <div class="name">{{info.name}}</div>
        <div class="desc">{{info.description}}</div>
        <div class="options">
            <a @click="openSource(info.sourceCode)">源码</a>/
            <a :href="info.previewUrl" target="_blank" v-if="info.previewUrl">预览</a>/
            <a @click="download(info)">下载</a>
        </div>
    </div>
</template>

<script>
import Api from '@/api';

export default {
    name: 'BlockItem',
    data () {
        return {
            colors: ['primary', 'success', 'warning', 'error']
        };
    },
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
            const img = this.info.screenshot;
            this.$Modal.info({
                title: '大图预览',
                width: '80%',
                closable: true,
                okText: '',
                render: (h) => {
                    const tags = this.info.tags.map(tag => {
                        return h('Tag', {
                            props: {
                                color: this.colors[Math.floor(Math.random() * 4)]
                            }
                        }, tag)
                    })
                    return h('div',
                        [
                            '标签：',
                            tags,
                            h('div', {
                                'class': 'preview-img'
                            }, [h('img', {
                                attrs: {
                                    src: img
                                }
                            })])
                        ]
                    )
                }
            });
        },
        openSource (url) {
            window.open(url);
        },
        download (item) {
            Api.get(`/blocks/${item.name}`, {
                params: {
                    materialsName: this.materialsName,
                    blockPath: item.downloadPath
                }
            }).then((res) => {
                this.$Notice.success({
                    title: '提示',
                    desc: `下载区块位于${res.downloadPath}`
                });
            });
        }
    }
};
</script>

<style lang="less">
.ivu-tag {
    padding: 0 4px;
    height: 18px;
    line-height: 18px;
}
.ivu-notice-desc {
    text-align: left;
}
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
    height: 240px;
    overflow: hidden;
    margin-bottom: 24px;
    &:hover {
        box-shadow: 0 2px 7px rgba(0,0,0,.15);
    }
    .img {
        width: 100%;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 10px;
        cursor: pointer;
        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
    .name {
        height: 36px;
        line-height: 1;
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
