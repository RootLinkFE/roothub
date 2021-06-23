<template>
  <div class="block-item">
    <div class="img">
      <img v-lazy="info.screenshot" @click="previewImg" title="查看大图" />
    </div>
    <div class="name">{{ info.name }}</div>
    <div class="desc">{{ info.description }}</div>
    <div class="options">
      <a :href="info.previewUrl" target="_blank" v-if="info.previewUrl"
        ><i class="iconfont iconeye1"></i
      ></a>
      <a @click="openSource(info.sourceCode)"
        ><i class="iconfont iconcode"></i
      ></a>
      <a @click="download(info)"><i class="iconfont iconxiazai"></i></a>
    </div>
  </div>
</template>

<script>
import Api from '@/api'

export default {
  name: 'BlockItem',
  data() {
    return {
      colors: ['primary', 'success', 'warning', 'error'],
    }
  },
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
    materialsName: {
      type: String,
      required: true,
    },
  },
  methods: {
    previewImg() {
      const img = this.info.screenshot
      this.$Modal.info({
        title: '大图预览',
        width: '80%',
        closable: true,
        okText: '',
        render: (h) => {
          let tags = this.info.tags || []
          const tagsDom = tags.map((tag) => {
            return h(
              'Tag',
              {
                props: {
                  color: this.colors[Math.floor(Math.random() * 4)],
                },
              },
              tag
            )
          })
          return h('div', [
            '标签：',
            tagsDom,
            h(
              'div',
              {
                class: 'preview-img',
              },
              [
                h('img', {
                  attrs: {
                    src: img,
                  },
                }),
              ]
            ),
          ])
        },
      })
    },
    openSource(url) {
      window.open(url)
    },
    download(item) {
      Api.get(`/blocks/${item.name}`, {
        params: {
          materialsName: this.materialsName,
          blockPath: item.downloadPath,
        },
      }).then((res) => {
        this.$Notice.success({
          title: '提示',
          desc: `下载区块位于${res.downloadPath}，可在配置中修改下载路径`,
        })
      })
    },
  },
}
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
  margin-top: 10px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.block-item {
  background: var(--block-item-bg);
  border: var(--block-item-border);
  border-radius: 2px;
  position: relative;
  padding: 8px 10px;
  text-align: center;
  height: 240px;
  overflow: hidden;
  margin-bottom: 24px;
  &:hover {
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);
  }
  .img {
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 15px;
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
    color: var(--block-item-name);
    font-size: 16px;
  }
  .desc {
    font-size: 12px;
    color: var(--block-item-desc);
    margin-bottom: 5px;
    height: 38px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .options {
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: flex;
    color: #b7b7b7;
    justify-content: flex-end;
    position: absolute;
    bottom: 10px;
    right: 5px;
    a {
      font-size: 20px;
      cursor: pointer;
      margin-left: 15px;
      display: block;
      .iconfont {
        font-size: inherit;
      }
    }
  }
}
</style>
