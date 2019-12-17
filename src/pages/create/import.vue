<template>
  <div class='import'>
     <Floder :fileList="fileList" :path="path"
        @backUpperLevel="backUpperLevel"
        @editItem="editItem"
        @operateFavorite="operateFavorite" />
      <div class="table-of-contents">
        <section class="wrap" v-for="(item, index) in fileList" :key="index" @click="getThisFileList(item)">
          <div>
            <span>
                <i :class="item.type  ===  'dir' ? 'el-icon-folder' : 'el-icon-tickets'"></i>
            </span>
            <span>{{ item.name }}</span>
          </div>
        </section>
      </div>
      <div class="btn">
        <el-button size="medium" :disabled="isDisabled" @click="importFloader" class="btn-content"><i class="el-icon-upload2" style="margin-right:5px"></i>导入这个文件夹</el-button>
      </div>
  </div>
</template>

<script>
import Floder from '@/components/Floder'
import Api from '@/api';

export default {
  name: 'Import',
  components: {
    Floder
  },
  data () {
    return {
      fileList: [],
      path: this.$store.state.project.cwd,
      favorite: false
    }
  },
  computed: {
     isDisabled () {
       return !this.fileList.filter(item => item.type === 'dir' && item.name === 'node_modules').length > 0
     }
  },
  created () {
    this.getFloder(this.$store.state.project.cwd)
  },
  methods: {
    async getFloder (path) {
        try {
          const data = await Api.get('/create/list?path=' + path)
          this.fileList = data
        } catch (err) {
          console.log(err)
        }
    },
    // 返回上级目录
    backUpperLevel () {
      this.path = this.path.split('/').slice(0, -1).join('/')
      // 获取当前文件目录
      this.getFloder(this.path)
    },
    // 获取当前目录
    getThisFileList ({ name, type }) {
      if (type === 'file') {
         this.$message.warning('请点击文件夹')
         return;
      }
      this.path = `${this.path}/${name}`
       // 获取当前文件目录
      this.getFloder(this.path)
    },
    editItem () {},
    // 收藏
    operateFavorite (item) {
      this.favorite = item
    },
    // 导入
    async importFloader () {
      const name = this.path.split('/').slice(-1)[0]
      const { path, favorite } = this
      const hasProject = await this.checkHasProject(path)
      if(hasProject) {
         this.$message.warning('已拥有此项目')
         return
      }
      try {
        const data = await Api.post('/create/addProject', {
            name,
            path,
            favorite
          })
          if (data) {
            this.$message.success('导入成功')
          }
      } catch (err) {
        console.log(err)
      }
    },
    // 检验是否拥有这个项目
    async checkHasProject (path) {
      try {
        const result = await Api.get('/create/checkHasProject?path=' + path)
        return result.hasProject
      } catch (err) {
        console.log(err)
      }
    },
  }
}

</script>

<style lang="less" scoped>
.import{
  .table-of-contents {
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    .wrap {
      padding: 16px;
      background: #3a5169;
      color: #fff;
      cursor: pointer;
      &:hover {
        background: #344a5f
      }
      span {
        margin-right: 16px
      }
    }
  }
  .btn {
    position: fixed;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, 0);
    .btn-content {
      width: 200px;
      margin: 0 auto;
    }
  }
}
</style>
