<template>
    <div class="create">
        <PageHeader title="项目管理器"></PageHeader>
        <div class="tab">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="project">
              <span slot="label"><i class="el-icon-s-order"></i>项目</span>
              <div class="tab-content">
                <h3 v-if="favorriteProjectList.length > 0">收藏的项目</h3>
                <ProjectList :projectList="favorriteProjectList"
                  @favorite="favorite"
                  @deleteItem="deleteItem"
                  @editItem="editItem"
                  @openEditor="openEditor" />
                <h3 v-if="notFavorriteProjectList.length > 0">更多项目</h3>
                 <ProjectList :projectList="notFavorriteProjectList"
                   @favorite="favorite"
                   @deleteItem="deleteItem"
                   @editItem="editItem"
                   @openEditor="openEditor" />
              </div>
            </el-tab-pane>
            <el-tab-pane name="create">
              <span slot="label"><i class="el-icon-plus"></i>创建</span>
              <div class="tab-content">
                  创建
              </div>
            </el-tab-pane>
            <el-tab-pane name="import">
              <span slot="label"><i class="el-icon-upload2"></i>导入</span>
              <div class="tab-content">
                <Import />
              </div>
            </el-tab-pane>
          </el-tabs>

          <el-dialog
            title="重命名"
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
          <!-- 触发新增操作按钮 -->
          <!-- <el-button size="medium" @click="addProject"><i class="el-icon-edit"></i></el-button> -->
        </div>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import Api from '@/api';
import ProjectList from './list'
import Import from './import'

export default {
    name: "Create",
    components: {
        PageHeader,
        ProjectList,
        Import
    },
    data () {
        return {
           activeName: 'import',
           favorriteProjectList: [],
           notFavorriteProjectList: [],
           dialogVisible: false,
           id: '',
           floderName: ''
        };
    },
    computed: {
        project() {
            return this.$store.state.project;
        }
    },
    created () {
      this.getProjectList()
    },
    methods: {
      async getProjectList () {
        try {
          const data = await Api.get('/create/getProjectList')
          this.favorriteProjectList = data.filter(item => item.favorite)
          this.notFavorriteProjectList = data.filter(item => !item.favorite)
        } catch (err) {
          console.log(err)
        }
      },
      // 收藏
      async favorite (item) {
        const {_id, favorite} = item
        const toastContent = favorite ? '取消成功' : '收藏成功'
        try {
          const res = await Api.get(`/create/favorite?_id=${_id}&favorite=${!favorite}`)
          if(res) {
            this.getProjectList()
            this.$message.success(toastContent)
          }
        } catch (err) {
          console.log(err)
        }
      },
      // 删除某项
      async deleteItem (_id) {
        try {
          const res = await Api.get(`/create/deleteItem?_id=${_id}`)
          if(res) {
            this.getProjectList()
            this.$message.success('删除成功')
          }
        } catch (err) {
          console.log(err)
        }
      },
      // 编辑项目
      async editItem (item) {
        const {_id, name} = item
        this.floderName = name
        this.id = _id
        this.dialogVisible = true
      },
      async submitEdit () {
        const { id, floderName } = this
        try {
          const res = await Api.get(`/create/editItem?_id=${id}&name=${floderName}`)
          if(res) {
            this.getProjectList()
            this.$message.success('修改成功')
          }
        } catch (err) {
          console.log(err)
        } finally {
          this.dialogVisible = false
        }
      },
      // 打开编辑
      async openEditor (item) {
        const { path } = item
        try {
          await Api.get(`/create/openEditor?path=${path}`)
        } catch (err) {
          console.log(err)
        }
      },
      async getFloder (path) {
        try {
          const data = await Api.get('/create/list?path=' + path)
          this.fileList = data
        } catch (err) {
          console.log(err)
        }
      },
      handleClick(tab, event) {
        if(tab.name === 'project') {
          this.getProjectList()
        }
      }
    }
};
</script>

<style lang="less">
.create {
  width: 100%;
    .tab {
      background: #344a5f;
      .el-tabs__header {
        margin: 0;
      }
      .el-tabs__nav-wrap {
        display: flex;
        .el-tabs__nav-scroll {
          margin: 0 auto;
          color: #fff;
          .el-tabs__item {
            color: #fff;
            font-size: 16px;
          }
        }
      }
      .el-tabs__nav-wrap::after {
        height: 0;
      }
      .tab-content {
        padding: 16px;
        background: #3a5169;
        box-sizing: border-box;
        h3 {
          line-height: 0;
          color: #fff;
        }
      }
    }
}
</style>