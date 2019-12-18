<template>
  <div class='Floader'>

    <div class="module back">
      <div class="icon" @click="backUpperLevel">
         <i class="el-icon-arrow-up"></i>
      </div>
    </div>

    <div class="module module-floder" v-if="isDisabled">
      <div class="icon floder-icon" @click="rootDir">
         <i style="width: 28px" class="el-icon-folder-opened"></i>
      </div>
      <div class="floder-wrap" v-for="(item, index) in path.split('/').slice(1, -1)" :key="index">
        {{ item }}
      </div>
      <el-input placeholder="请输入内容" v-model="floderName" :disabled="isDisabled"        class="input-with-select"
      @blur="blurInput">
         <i @click="editItem" class="el-icon-edit" slot="append"></i>
      </el-input>
    </div>

    <div class="module module-floder" v-else>
      <el-input placeholder="请输入内容" v-model="floderName" :disabled="isDisabled"        class="input-with-select"
      @blur="blurInput">
         <i @click="editItem" class="el-icon-edit" slot="append"></i>
      </el-input>
    </div>

    <div class="module refresh">
      <div class="icon favorite" @click="operateFavorite">
         <i :class="favorite ? 'el-icon-star-on' : 'el-icon-star-off'"></i>
      </div>
      <div class="icon refresh-icon" @click="refresh">
         <i class="el-icon-refresh"></i>
      </div>
      <div class="icon" @click="importProject" v-if="canImport">
         <i class="el-icon-upload2"></i>
      </div>
    </div>

    <div class="module operate">
      <div class="icon favorite" @click="favoritePath" v-if="!isFavorite">
         <i class="el-icon-circle-plus"></i>
      </div>
      <div class="icon favorite" @click="removeFavoritePath" v-else>
         <i class="el-icon-remove"></i>
      </div>
      <div class="icon">
         <el-dropdown @command="handleCommand">
            <el-button type="primary">
              <i class="el-icon-arrow-down"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" v-if="favoritePathList.length > 0">
              <el-dropdown-item v-for="(item, index) in favoritePathList" :key="index" :command="item.path">{{ item.path }}</el-dropdown-item>
            </el-dropdown-menu>
            <el-dropdown-menu slot="dropdown" v-else>
              <el-dropdown-item>暂无收藏的路由</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="module oters final">
      <div class="icon">
          <el-dropdown @command="commandMore">
            <el-button type="primary">
              <i class="el-icon-more"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="mkdir">
                <i class="el-icon-folder-add" style="margin-right: 8px"></i>
                <span>新建文件夹</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

  </div>
</template>

<script>
import Api from '@/api';
import { Throttle } from '@/utils'

export default {
  name: 'Floader',
  props: {
    fileList: {
      type: Array,
      default: () => []
    },
    path: {
      type: String,
      default: ''
    },
    favoritePathList: {
      type: Array,
      default: () => []
    },
    isSwitchTab: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      floderName: '',
      isDisabled: true,
      favorite: false,
      canImport: false,
      projectList: []
    }
  },
  computed: {
    isFavorite () {
      return this.favoritePathList.filter(item => item.path === this.path).length > 0
    },
  },
  created () {
    this.floderName = this.path.split('/').slice(-1)[0]
    const { cwd } = this.$store.state.project
    this.queryIsFavorite(cwd)
  },
  watch: {
    path () {
      // 查看是否收藏
      this.queryIsFavorite(this.path)
      // 根据input Disabled状态取输入框值
      this.floderName = this.isDisabled ? this.path.split('/').slice(-1)[0] : this.path;
    },
    // 输入节流
    floderName: Throttle(function(val) {
      // 是否可输入
      if(!this.isDisabled){
        // 传递当前input值
        this.$emit('editItem', val)
      }
    }, 100),
    fileList: {
      // 判断是否可上传此项目 重重不可上传
      handler (val) {
        this.canImport = this.fileList.filter(item => item.type === 'dir' && item.name === 'node_modules').length > 0
      },
    },
    // tab 切换 查询 此项目是否收藏
    isSwitchTab (val) {
      this.queryIsFavorite(this.path)
    },
  },
  methods: {
    // 查询是否收藏此项目；
    async queryIsFavorite (path) {
      try {
          const data = await Api.get('/create/queryIsFavorite?path=' + path)
          if(data.success) {
            this.favorite = data.success
            this.projectList = data.projectList
          } else {
            this.favorite = false
          }
        } catch (err) {
          console.log(err)
        }
    },
    // 编辑路径
    editItem () {
      this.isDisabled = false
      this.floderName = this.path
    },
    //
    blurInput () {
      this.isDisabled = true
      this.floderName = this.path.split('/').slice(-1)[0]
    },
    // 上一级路径
    backUpperLevel () {
      this.$emit('backUpperLevel')
    },
    // 收藏
    operateFavorite () {
      this.favorite = !this.favorite
      this.$emit('operateFavorite', {
        favorite: this.favorite,
        projectList: this.projectList
      })
    },
    // 根路径
    rootDir () {
      this.$emit('rootDir')
    },
    // refresh
    refresh () {
      this.$emit('refresh')
    },
    // favoritePath
    favoritePath () {
      this.$emit('favoritePath')
    },
    // removeFavoritePath
    removeFavoritePath () {
      this.$emit('removeFavoritePath')
    },
    // goThisPath
    handleCommand (path) {
      this.$emit('goThisPath', path)
    },
    // commandMore
    commandMore (type) {
     if(type === 'mkdir') {
       this.$emit('mkdir')
     }
    },
    // importProject
    importProject () {
      this.$emit('importProject')
    },
  }
}

</script>

<style lang="less">
.Floader{
  width: 100%;
  // background: #344a5f;
  color: #fff;
  display: flex;
  justify-content: space-between;
  .module {
    margin-right: 16px;
  }
  .back {
    width: 28px
  }
  .module-floder {
    width: 73%;
    display: flex;
    .floder-icon {
      margin-right: 8px;
    }
    .floder-wrap {
      background: #152533;
      height: 28px;
      line-height: 28px;
      border-radius: 4px;
      padding: 0 8px;
      margin-right: 8px;
    }
    .el-input.is-disabled .el-input__inner, input {
       background: #152533;
       height: 28px;
       border: none;
       color: #fff
    }
    .el-input-group__append {
      background: #152533;
      border: none;
      color: #fff
    }
  }
  .refresh {
    width: 92px;
    display: flex;
    .favorite, .refresh-icon {
      margin-right: 8px;
    }
  }
  .operate {
    width: 64px;
    display: flex;
    .favorite {
      margin-right: 8px;
    }
    .el-button--primary {
      width: 28px;
      height: 28px;
      padding: 0;
      background: #152533;
      border: none;
      text-align: center;
      box-sizing: border-box;
    }
  }
  .others {
    width: 28px;

  }
  .icon {
    width: 28px;
    height: 28px;
    line-height: 28px;
    border-radius: 4px;
    background: #152533;
    text-align: center;
    cursor: pointer;
  }
  .final {
    margin-right: 0;
    .el-button--primary {
      width: 28px;
      height: 28px;
      padding: 0;
      background: #152533;
      border: none;
      text-align: center;
      box-sizing: border-box;
    }
  }

}
</style>
