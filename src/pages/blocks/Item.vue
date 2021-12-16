<template>
  <div class="block-item">
    <div class="img">
      <img v-lazy="info.screenshot" @click="previewImg" title="查看大图" />
    </div>
    <div class="name common-ellipsis-1" :title="info.name">{{ info.name }}</div>
    <div class="block-bottom">
      <div class="desc common-ellipsis-1" :title="info.description">{{ info.description }}</div>
      <div class="options">
        <a title="预览" :href="info.previewUrl" target="_blank" v-if="info.previewUrl">
          <i class="iconfont iconeye1"></i>
        </a>
        <a title="查看代码" @click="openSource(info.sourceCode)">
          <i class="iconfont iconcode"></i>
        </a>
        <a title="下载代码" @click="download(info)"> <i class="iconfont iconxiazai"></i> </a>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api'

export default {
  name: 'BlockItem',
  data() {
    return {
      colors: ['primary', 'success', 'warning', 'error']
    }
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
    previewImg() {
      const img = this.info.screenshot
      this.$Modal.info({
        title: '大图预览',
        width: '1000px',
        closable: true,
        okText: '',
        render: h => {
          let tags = this.info.tags || []
          const dependencies = this.info.dependencies || []
          const tagsDom = tags.map(tag => {
            return h(
              'Tag',
              {
                props: {
                  color: this.colors[Math.floor(Math.random() * 4)]
                }
              },
              tag
            )
          })
          const depTags = dependencies.map(dep => {
            return h(
              'Tag',
              {
                props: {
                  color: 'gray'
                }
              },
              dep
            )
          })
          const codeLink = h(
            'a',
            {
              class: 'grn ml40 inlineBlock',
              attrs: {
                href: this.info.sourceCode,
                target: '_blank'
              }
            },
            '源码查看'
          )
          const dependencyDom = h(
            'div',
            {
              class: 'dependencies'
            },
            ['依赖：', depTags.length > 0 ? [depTags, codeLink] : ['无', codeLink]]
          )
          const demoLink = h(
            'a',
            {
              class: 'grn ml40',
              attrs: {
                href: this.info.previewUrl,
                target: '_blank'
              }
            },
            '在线demo'
          )

          const imgDom = h(
            'div',
            {
              class: 'preview-img'
            },
            [
              h('img', {
                attrs: {
                  src: img
                }
              })
            ]
          )
          return h('div', { class: 'preview-content' }, ['标签：', tagsDom, demoLink, dependencyDom, imgDom])
        }
      })
    },
    openSource(url) {
      window.open(url)
    },
    download(item) {
      this.$emit('copy', item)
      // Api.get(`/blocks/${item.name}`, {
      //   params: {
      //     materialsName: this.materialsName,
      //     blockPath: item.downloadPath
      //   }
      // }).then(res => {
      //   this.$Notice.success({
      //     title: '提示',
      //     desc: `下载区块位于${res.downloadPath}，可在配置中修改下载路径`
      //   })
      // })
    }
  }
}
</script>

<style lang="less">
.common-ellipsis-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-all;
  overflow-wrap: anywhere; //数字、字母-计算最小内容尺寸的时候会考虑软换行， 作用于谷歌、火狐
}

.ivu-notice-desc {
  text-align: left;
}
.preview-content {
  width: 900px;
  max-height: 700px;
  overflow: hidden;
  .ivu-tag {
    padding: 0 4px;
    height: 18px;
    line-height: 18px;
  }
}
.preview-img {
  width: 100%;
  margin-top: 20px;
  img {
    zoom: auto;
    max-width: 100%;
    max-height: 100%;
  }
}
.inlineBlock {
  display: inline-block;
  line-height: 20px;
}
.dependencies {
  min-width: 300px;
}
.block-item {
  background: var(--block-item-bg);
  border: var(--block-item-border);
  border-radius: 4px;
  position: relative;
  padding: 12px;
  height: 245px;
  overflow: hidden;
  margin-bottom: 20px;
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
    line-height: 30px;
    font-weight: 600;
    color: var(--block-item-name);
    font-size: 16px;
  }
  .block-bottom {
    display: flex;
    justify-content: space-between;
  }
  .desc {
    font-size: 12px;
    color: var(--block-item-desc);
    flex: 1;
    line-height: 30px;
  }
  .options {
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: flex;
    color: #86909c;
    justify-content: flex-end;
    a {
      font-size: 20px;
      cursor: pointer;
      margin-left: 10px;
      display: block;
      .iconfont {
        font-size: inherit;
      }
    }
  }
}
</style>
