<template>
  <MyCard style="marginbottom: 24px">
    <div class="project-item">
      <div class="content" @click="setWorkingDirectory(data.path)">
        <div class="name"><b v-if="workingDirectory === data.path">·</b>{{ data.name }}</div>
        <div class="path">{{ data.path }}</div>
      </div>
      <div class="actions">
        <Tooltip content="打开编辑器" placement="top">
          <Icon type="md-code" @click="launchEditor(data.path)" />
        </Tooltip>
        <Tooltip content="打开文件夹" placement="top">
          <Icon type="ios-folder" @click="openDir" />
        </Tooltip>
        <Tooltip content="删除" placement="top">
          <Icon type="md-trash" @click="deleteProject" />
        </Tooltip>
      </div>
    </div>
  </MyCard>
</template>

<script>
import Api from '@/api'

export default {
  name: 'Item',
  props: {
    data: {
      type: Object,
      default() {}
    },
    index: Number
  },
  computed: {
    workingDirectory: function () {
      return this.$store.state.workingDirectory
    }
  },
  methods: {
    setWorkingDirectory(dir) {
      Api.patch('/workingDirectory', {
        dir
      }).then(res => {
        this.$store.commit('setWorkingDirectory', res)
        this.$router.push('/overview')
      })
    },
    deleteProject() {
      this.$emit('deleteProject', this.index)
    },
    openDir() {
      Api.get(`/finder/open?dirPath=${this.data.path}`)
    },
    launchEditor(file) {
      Api.get('/files/launchEditor', {
        params: { file }
      })
    }
  }
}
</script>

<style lang="less">
.project-item {
  height: 200px;
  position: relative;
  white-space: normal;
  word-break: break-all;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .content {
    flex: 1;
    padding: 10px 15px;
    cursor: pointer;
  }
  .name {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    line-height: 18px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    color: var(--project-item-name);
    b {
      color: #00a854;
      font-size: 40px;
      line-height: 18px;
      margin-right: 6px;
    }
  }
  .path {
    color: var(--project-item-desc);
    font-size: 13px;
  }
  .actions {
    // border-top: 1px solid #eee;
    height: 36px;
    display: flex;
    align-items: center;
    color: #999;
    & > div {
      cursor: pointer;
      width: 33%;
      text-align: center;
    }
  }
}
</style>
