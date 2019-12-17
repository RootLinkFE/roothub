<template>
  <div class='Floader'>

    <div class="module back">
      <div class="icon" @click="backUpperLevel">
         <i class="el-icon-arrow-up"></i>
      </div>
    </div>

    <div class="module module-floder" v-if="isDisabled">
      <div class="icon floder-icon">
         <i style="width: 28px" class="el-icon-folder-opened"></i>
      </div>
      <div class="floder-wrap" v-for="(item, index) in path.split('/').slice(1, -1)" :key="index">
        {{ item }}
      </div>
      <el-input placeholder="请输入内容" v-model="floderName" :disabled="isDisabled"        class="input-with-select"
      @blur="isDisabled = true">
         <i @click="editItem" class="el-icon-edit" slot="append"></i>
      </el-input>
    </div>

    <div class="module module-floder" v-else>
      <el-input placeholder="请输入内容" v-model="floderName" :disabled="isDisabled"        class="input-with-select"
      @blur="isDisabled = true">
         <i @click="editItem" class="el-icon-edit" slot="append"></i>
      </el-input>
    </div>

    <div class="module refresh">
      <div class="icon">
         <i class="el-icon-refresh"></i>
      </div>
    </div>

    <div class="module operate">
      <div class="icon favorite" @click="operateFavorite">
         <i :class="favorite ? 'el-icon-star-on' : 'el-icon-star-off'"></i>
      </div>
      <div class="icon">
         <i class="el-icon-arrow-down"></i>
      </div>
    </div>

    <div class="module oters final">
      <div class="icon">
         <i class="el-icon-more"></i>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Floader',
  components: {

  },
  props: {
    fileList: {
      type: Array,
      default: () => []
    },
    path: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      floderName: '',
      isDisabled: true,
      favorite: false
    }
  },
  created () {
    this.floderName = this.path.split('/').slice(-1)[0]
  },
  watch: {
    path () {
      this.floderName = this.path.split('/').slice(-1)[0]
    }
  },
  methods: {
    editItem () {
      this.isDisabled = false
      this.floderName = this.path
      this.$emit('editItem')
    },
    backUpperLevel () {
      this.$emit('backUpperLevel')
    },
    // 收藏
    operateFavorite () {
      this.favorite = !this.favorite
      this.$emit('operateFavorite', this.favorite)
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
    width: 64px
  }
  .operate {
    width: 64px;
    display: flex;
    .favorite {
      margin-right: 8px;
    }
  }
  .others {
    width: 64px
  }
  .icon {
    width: 28px;
    height: 28px;
    line-height: 28px;
    border-radius: 4px;
    background: #152533;
    text-align: center;
  }
  .final {
    margin-right: 0
  }

}
</style>
