<!--
* @Author: suxiaoxia
* @Date: 2021年07月05日
* @Description: 
 -->

<template>
  <div class="resource">
    <DashboardHeader title="资源"> </DashboardHeader>
    <PageWrap>
      <Row :gutter="24">
        <Col span="24">
          <Button class="type-button" @click="changeTypes(-1)" :type="showAll ? 'primary' : 'text'">全部</Button>
          <Button
            class="type-button"
            v-for="(t, index) in TYPES"
            :key="t.key"
            @click="changeTypes(index)"
            :type="t.isShow ? 'primary' : 'text'"
            >{{ t.name }}</Button
          >
        </Col>
      </Row>
      <div class="resource-box" v-for="(t, index) in TYPES" :key="t.key + index">
        <template v-if="t.isShow">
          <div>{{ t.name }}</div>
          <ul :class="`resource-box-list ${t.key}`">
            <li v-for="list in t.lists" :key="list.id" @click.stop="openSource(list.previewUrl)">
              <!-- left -->
              <img v-if="t.key !== 'cliProject'" :src="list.img || require('@/assets/logo.png')" alt="" />
              <!-- right -->
              <div>
                <div class="name common-ellipsis-1" :title="list.name">
                  <i :title="list.title" :class="`iconfont ${ICONS[list.type]}`"></i>
                  {{ list.name }}
                </div>
                <div class="desc common-ellipsis-3" :title="list.description">{{ list.description }}</div>
                <div class="tags common-ellipsis-2" :title="'标签' + list.tags.toString()">
                  <Tag
                    v-for="(tag, i) in list.tags"
                    :key="list.id + i"
                    :color="THEME_COLOR[tag.toUpperCase()] || '#00b259'"
                    >{{ tag }}</Tag
                  >
                </div>
                <div class="tools">
                  <a title="查看代码" @click.stop="openSource(list.path)">
                    <Icon type="md-code" />
                  </a>
                  <a title="查看文档" @click.stop="openSource(list.previewUrl)">
                    <Icon type="ios-document" />
                  </a>
                  <a v-if="list.script" title="快速上手" @click.stop="download(list.script)">
                    <Icon type="ios-create" />
                  </a>
                  <a v-if="list.type === 'templates'" title="快速创建项目" @click.stop="quickStart(list)">
                    <Icon type="ios-create" />
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </template>
      </div>
    </PageWrap>
    <TextCopyModal :title="'安装使用'" v-model="visible" type="resource" :texts="texts" />
    <div v-if="quickVisible">
      <QuickStart :attrShow="quickVisible" :templateName="templateName" @updateStatusData="updateStatusData" />
    </div>
  </div>
</template>

<script>
import Api from '@/api'
import uuid from 'uuid'
import { openSource } from '@/utils'
import TextCopyModal from '../blocks/TextCopyModal'
import QuickStart from './QuickStart'
// 所有类别
const TYPES = [
  { name: '工程脚手架', key: 'cliProject', types: ['cli', 'templates'], lists: [], isShow: true },
  { name: '解决方案', key: 'solutionProject', types: ['solution'], lists: [], isShow: true }
]

const THEME_COLOR = {
  REACT: '#61dafb',
  VUE: '#42b983',
  ANTD: '#1890ff',
  'ANT-DESIGN-REACT': '#1890ff',
  'ANT-DESIGN-VUE': '#1890ff',
  TYPESCRIPT: '#3178c6'
}

// 工程脚手架icon
const ICONS = {
  cli: 'icon-thin-_settings_t',
  templates: 'icon-moban'
}
export default {
  name: 'Resource',
  components: {
    TextCopyModal,
    QuickStart
  },
  data() {
    return {
      openSource,
      THEME_COLOR,
      ICONS,
      TYPES: [],
      visible: false,
      quickVisible: false,
      templateName: '',
      texts: [],
      showAll: true,
      resourceList: {}
    }
  },
  watch: {},
  mounted() {
    Api.get('/resource').then(res => {
      this.TYPES = JSON.parse(JSON.stringify(TYPES))
      res.resource.map(item => {
        this.TYPES.map(ts => {
          if (ts.types.includes(item.type)) {
            item.id = uuid()
            ts.lists.push(item)
          }
        })
      })
    })
  },
  methods: {
    updateStatusData(e) {
      this.quickVisible = e
    },
    changeTypes(index) {
      if (index == -1) {
        this.showAll = !this.showAll
        this.TYPES.map(ts => {
          ts.isShow = this.showAll
        })
        return
      }
      this.TYPES[index].isShow = !this.TYPES[index].isShow
      this.showAll = true
      this.TYPES.some(ts => {
        if (!ts.isShow) this.showAll = false
      })
    },
    download(script) {
      const defaultTitle = '复制命令行到控制台中执行。'
      this.texts = []
      script.map(item => {
        this.texts.push({
          title: item.title || defaultTitle,
          text: item.command
        })
      })
      this.visible = true
    },
    quickStart(item) {
      this.templateName = item.name
      this.quickVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.type-button {
  margin: 0 8px;
  box-shadow: none;
}
.resource {
  &-box {
    &-list {
      display: flex;
      flex-wrap: wrap;
      li {
        min-width: 500px;
        width: 30%;
        margin: 10px;
        border-radius: 4px;
        display: flex;
        height: 200px;
        background: var(--block-item-bg);
        cursor: pointer;
        > img {
          width: 40%;
          height: 100%;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          background: #f2f2f2;
        }
        > div {
          flex: 1;
          padding: 10px 15px;
          font-size: 14px;
          position: relative;
          .name {
            line-height: 30px;
            font-weight: 600;
            color: var(--block-item-name);
            font-size: 16px;
            > i {
              display: none;
            }
          }
          .desc {
            font-size: 12px;
            color: var(--block-item-desc);
            flex: 1;
            line-height: 24px;
            margin: 3px 0 10px;
          }
          .tools {
            position: absolute;
            bottom: 0;
            right: 10px;
            left: 10px;
            color: #86909c;
            text-align: right;
            > a {
              font-size: 20px;
              cursor: pointer;
              margin-left: 10px;
              .iconfont {
                font-size: inherit;
              }
            }
          }
        }
      }
      &.cliProject {
        li {
          width: 20%;
          min-width: 240px;
          height: 200px;
          > div {
            .name {
              > i {
                font-weight: 400;
                border-radius: 5px;
                background: var(--body-bg);
                display: inline-block;
                box-sizing: border-box;
                width: 40px;
                padding: 5px 0;
                text-align: center;
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
