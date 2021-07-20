<template>
  <Modal title="快速生成项目" :loading="loading" v-model="isShow" :mask-closable="false">
    <Form ref="form" :model="form" :label-width="80" :rules="ruleValidate">
      <FormItem label="项目名称" prop="projectName">
        <Input v-model="form.projectName" placeholder="请输入项目名称"></Input>
      </FormItem>
      <FormItem label="文件路径" prop="projectPath">
        <Input v-model="form.projectPath" placeholder="请输入文件路径"></Input>
      </FormItem>
      <FormItem label="物料库">
        <Select v-model="form.libName" @on-select="handleSelect">
          <Option v-for="item of libs" :key="item.name" :value="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <div class="material-wrap">
        <Spin size="large" fix v-if="materialLoading"></Spin>
        <Row :gutter="20" v-if="materials.length">
          <Col span="6" v-for="(item, key) in materials" :key="key">
            <div class="item">
              <Checkbox v-model="item.checked"
                ><span class="title" :title="item.description">{{ item.description }}</span></Checkbox
              >
              <div class="img">
                <img v-lazy="item.screenshot" />
              </div>
            </div>
          </Col>
        </Row>
        <Empty v-else></Empty>
      </div>
    </Form>
    <div v-if="cli">
      <p>最终命令行</p>
      <pre style="color: #cccccc; overflow: hidden; overflow-x: scroll">{{ cli }}</pre>
    </div>
    <div slot="close">
      <i style="font-size: 22px" class="iconfont iconclose" @click="handleClose"></i>
    </div>
    <div slot="footer">
      <Button type="default" @click="handleClose">取消</Button>
      <Button type="primary" @click="handleGen">生成命令</Button>
      <Button type="primary" @click="handleRun">执行命令</Button>
    </div>
  </Modal>
</template>

<script>
import Api from '@/api'
export default {
  name: 'QuickStart',
  components: {},
  props: {
    attrShow: {
      type: Boolean,
      default: false
    },
    templateName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      cli: '',
      form: {
        projectName: '',
        projectPath: '',
        libName: ''
      },
      isShow: this.attrShow,
      loading: true,
      libs: [],
      materials: [],
      libName: '',
      materialLoading: false,
      ruleValidate: {
        projectName: [{ required: true, message: '请选择文件路径' }],
        projectPath: [{ required: true, message: '请选择项目名称' }]
      }
    }
  },
  mounted() {
    this.libLoad()
  },
  watch: {
    attrShow: function (v) {
      this.isShow = this.attrShow
    }
  },
  methods: {
    libLoad() {
      Api.get('/materials').then(res => {
        const arr = [...res.recommendMaterials, ...res.customMaterials]
        this.libs = arr
      })
    },
    materialsLoad() {},
    handleGen() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let materialSel = []
          const { projectName, projectPath, libName } = this.form
          this.materials.map(m => {
            if (m.checked) {
              const result = `${m.belongLib}:blocks:${m.name}` // blocks先写死，后面重新定义物料type
              materialSel.push(result)
            }
          })
          const materialStrs = materialSel.join(',')
          this.cli = `rh create ${projectName} -t ${this.templateName} ${libName ? `-l ${libName}` : ''} ${
            materialStrs ? `-m ${materialStrs}` : ''
          } ${projectPath ? `-p ${projectPath}` : ''}`
        }
      })
    },
    handleRun() {
      if (!this.cli) return this.$Message.warning('请先生成命令')
      return this.$Message.warning('待开发')
    },
    handleClose() {
      this.showClose()
    },
    showClose() {
      this.$emit('updateStatusData', false)
    },
    handleSelect(v) {
      const params = { materialsName: v.value, category: '全部', page: 1, pageSize: 999 }
      this.materialLoading = true
      Api.get('/blocks', { params })
        .then(res => {
          this.materialLoading = false
          this.materials = res.list
        })
        .catch(() => {
          this.materialLoading = false
        })
    },
    resetData() {
      this.libs = []
      this.materials = []
      this.libName = ''
    }
  }
}
</script>

<style lang='less'>
.material-wrap {
  height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
  .item {
  }
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: calc(100% - 25px);
    display: inline-block;
    vertical-align: top;
  }
  .ivu-checkbox-wrapper {
    width: 100%;
  }
  .ivu-checkbox {
    width: 15px !important;
  }
}
.img {
  width: 100%;
  height: 80px;
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
</style>