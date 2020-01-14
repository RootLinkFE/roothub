<template>
  <div class='import'>
     <Floder
        :fileList="fileList"
        :path="path"
        :favoritePathList="favoritePathList"
        :isSwitchTab="isSwitchTab"
        @backUpperLevel="backUpperLevel"
        @editItem="editItem"
        @operateFavorite="operateFavorite"
        @rootDir="rootDir"
        @refresh="refresh"
        @importProject="importProject"
        @favoritePath="favoritePath"
        @removeFavoritePath="removeFavoritePath"
        @goThisPath="goThisPath"
        @mkdir="mkdir"
        @viewhide="viewhide" />
      <div class="table-of-contents">
        <section class="wrap" v-for="(item, index) in fileList" :key="index">
          <div @click="getThisFileList(item)">
            <span>
                <i :class="item.type  ===  'dir' ? 'el-icon-folder' : 'el-icon-tickets'"></i>
            </span>
            <span>{{ item.name }}</span>
          </div>
          <span class="el-icon-close" @click="deleteThis(item)"></span>
        </section>
      </div>

       <el-dialog
            title="新建文件夹"
            :visible.sync="dialogVisible"
            width="40%">
            <el-form  status-icon label-width="40px" >
              <el-form-item label="名称" prop="pass">
                <el-input type="text" v-model="floderName"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitEdit">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import Floder from '@/components/Floder'

export default {
  name: 'Import',
  components: {
    Floder
  },
  props: {
    isSwitchTab: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      fileList: [],
      path: this.$store.state.project.cwd,
      favorite: false,
      favoritePathList: [],
      dialogVisible: false,
      floderName: ''
    }
  },
  created () {
    // 获取当前路径下文件list
    this.getFloder(this.$store.state.project.cwd)
    // 获取s收藏的url
    this.queryFavoritePath()
  },
  methods: {
    // 根据路径获取当前目录
    async getFloder (path, isShowHideFile = true) {
        try {
          const data = await this.$api.create.list(path, isShowHideFile)
          if(data.code === 'ENOENT') {
            this.fileList = []
            return
          }
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
    // 删除当前选择的文件
    deleteThis (item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          try {
            const res = await this.$api.create.deleteFile(this.path, item)
            if(res.success) {
              this.getFloder(this.path)
              this.$message.success('删除成功')
            }
            if(res.hasFloder) {
              this.$message.warning('此文件夹不存在')
            }
          } catch (err) {
            console.log(err)
          }
        })
    },
    // 编辑路径
    editItem (val) {
      val = val.split('/').slice(-1)[0] === ''
                ? val.split('/').slice(0,-1).join('/')
                : val
      this.getFloder(val)
      this.path = val
    },
    // 已导入的收藏
    async favoriteOperate (item) {
      const {id, favorite} = item
      const toastContent = favorite ? '取消成功' : '收藏成功'
      try {
        const res = await this.$api.create.favorite(id, favorite)
        if(res) {
          this.$message.success(toastContent)
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 收藏
    operateFavorite (item) {
      this.favorite = item.favorite
      console.log(item.projectList)
      // 判断是否已导入
      if(item.projectList.length > 0) {
        this.favoriteOperate(item.projectList[0])
      }
    },
    // 根文件啊
    rootDir () {
      // 获取当前文件目录
      this.path = ''
      this.getFloder('/')
    },
    // 刷新
    refresh () {
      this.path = this.$store.state.project.cwd
      this.getFloder(this.path)
    },
    // 导入
    async importProject () {
      const name = this.path.split('/').slice(-1)[0]
      const { path, favorite } = this
      console.log(path);
      const hasProject = await this.checkHasProject(path)
      if(hasProject) {
         this.$message.warning('已拥有此项目')
         return
      }
      try {
        const data = await this.$api.create.importProject({name, path, favorite})
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
        const result = await this.$api.create.checkHasProject(path)
        return result.hasProject
      } catch (err) {
        console.log(err)
      }
    },
    // 收藏此路由
    async favoritePath () {
      const { path } = this
      try {
        const res = await this.$api.create.favoritePath({path})
        if (res) {
           this.queryFavoritePath()
           this.$message.success('收藏成功')
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 查询收藏的路由
    async queryFavoritePath () {
      try {
        const res = await this.$api.create.queryFavoritePath()
        if(res.success) {
           this.favoritePathList = res.data
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 删除收藏的路由
    async removeFavoritePath () {
      const { path } = this
      try {
        const res = await this.$api.create.removeFavoritePath(path)
        if(res.success) {
          this.queryFavoritePath()
          this.$message.success('删除成功')
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 跳转对应收藏的路由
    goThisPath (path) {
      this.getFloder(path)
      this.path = path
    },
    // 新建文件夹
    mkdir () {
     this.floderName = '';
     this.dialogVisible = true;
    },
    // 提交文件夹名称
    async submitEdit () {
      const {path, floderName} = this
      try {
        const res = await this.$api.create.mkDir(path, floderName)
        if(res.success) {
          // 创建成功并跳转到该文件夹
          // this.path = `${path}/${floderName}`
          this.getFloder(path)
          this.$message.success('创建文件夹成功')
        }
        if(res.hasFloder) {
          this.$message.warning('此文件夹已存在')
        }
      } catch (err) {
        console.log(err)
      } finally {
         this.dialogVisible = false;
      }
    },
    // 显示隐士文件
    viewhide (val) {
      this.getFloder(this.path, val)
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
      display: flex;
      justify-content: space-between;
      &:hover {
        background: #344a5f
      }
      span {
        margin-right: 16px
      }
    }
  }
}
</style>
