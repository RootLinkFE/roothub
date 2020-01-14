<template>
  <div class='list'>
     <div class="list-item"
          v-for="item in projectList"
          :key="item.id">
       <div class="left-part">
         <div class="favorite" @click="favorite(item)">
           <i :class="item.favorite ? 'el-icon-star-on' : 'el-icon-star-off'"></i>
         </div>
         <div class="file">
           <span class="file-name">{{ item.name }}</span>
           <span class="file-path">{{ item.path }}</span>
         </div>
       </div>
       <div class="right-part">
        <el-row>
          <el-button size="medium" @click="openEditor(item)"><i class="el-icon-upload2" style="margin-right:5px"></i>在编辑器中打开</el-button>
          <el-button size="medium" @click="editItem(item)"><i class="el-icon-edit"></i></el-button>
          <el-button size="medium" @click="deleteItem(item.id)"><i class="el-icon-close"></i></el-button>
        </el-row>
       </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  components: {

  },
  props: {
    projectList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  },
  methods: {
    favorite (item) {
      this.$emit('favorite', item)
    },
    deleteItem (id) {
       this.$emit('deleteItem', id)
    },
    editItem (item) {
       this.$emit('editItem', item)
    },
    openEditor (item) {
       this.$emit('openEditor', item)
    }
  }
}

</script>

<style lang="less" scoped>
.list{
  .list-item {
    background: #344a5f;
    color: #fff;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 16px;
    margin-bottom: 32px;
    .left-part {
      display: flex;
      .favorite {
        width: 28px;
        height: 28px;
        border-radius: 4px;
        background: #152533;
        text-align: center;
        margin-right: 10px;
        margin-top: 12px;
        i {
          line-height: 28px;
        }
      }
      .file {
        display: flex;
        flex-direction: column;
        line-height: 24px;
      }
    }
    .right-part {
      display: flex;
      margin-top: 12px;
    }
  }
}
</style>
