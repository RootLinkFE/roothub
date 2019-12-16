<template>
    <div class="create">
        <PageHeader title="项目管理器"></PageHeader>
        <div class="tab">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="project">
              <span slot="label"><i class="el-icon-s-order"></i>项目</span>
              <div class="tab-content">
                <ProjectList :projectList="projectList" />
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
                导入
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import ProjectList from './list'

export default {
    name: "Create",
    components: {
        PageHeader,
        ProjectList
    },
    data () {
        return {
           activeName: 'project',
           projectList: [
             {
               id: 1,
               name: 'vue2',
               path: '/user/berlin/www/personal/study/vue/',
               favorite: false
              },
              {
               id: 2,
               name: 'vue3',
               path: '/user/berlin/www/personal/study/vue/vues3',
               favorite: true
              },
           ]
        };
    },
    computed: {
        project() {
            return this.$store.state.project;
        }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
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
        background: #3a5169;
        padding-top: 20px;
        box-sizing: border-box
      }
    }
}
</style>