<template>
  <div>
    <DashboardHeader title="设置"></DashboardHeader>
    <PageWrap>
      <div class="section">
        <h3>基础设置</h3>
        <MyCard class="setting">
          <Form :model="form" :label-width="100">
            <FormItem>
              <label slot="label">
                下载目录
                <Tooltip content="工作目录根目录" placement="top">
                  <Icon type="ios-help-circle-outline" />
                </Tooltip>
              </label>
              <Input
                style="width: 400px"
                v-model="form.downloadPath"
                placeholder="默认路径为工作目录下的.roothub"
              ></Input>
            </FormItem>
            <FormItem label="包管理器">
              <RadioGroup v-model="form.nodeTool">
                <Radio
                  :label="item.label"
                  v-for="(item, key) in nodeTools"
                  :key="key"
                  >{{ item.name }}</Radio
                >
              </RadioGroup>
            </FormItem>
            <FormItem>
              <Button type="primary" style="margin-right: 20px" @click="update"
                >保存</Button
              >
            </FormItem>
          </Form>
        </MyCard>
      </div>
      <MaterialsManage></MaterialsManage>
    </PageWrap>
  </div>
</template>
<script>
import Api from '@/api'
import MaterialsManage from './MaterialsManage'

export default {
  name: 'Setting',
  data() {
    return {
      form: {
        downloadPath: '',
        nodeTool: '',
      },
      nodeTools: [
        {
          label: 'yarn',
          name: 'yarn',
        },
        {
          label: 'npm',
          name: 'npm',
        },
      ],
    }
  },
  methods: {
    update() {
      Api.patch('/setting', this.form).then(() => {
        this.$Message.success('修改成功')
      })
    },
  },
  components: {
    MaterialsManage,
  },
  mounted() {
    Api.get('/setting').then((res) => {
      this.form = res
    })
  },
}
</script>

<style lang="less" scoped>
/deep/ .ivu-form .ivu-form-item-label {
  color: inherit;
}
.setting {
  padding: 20px;
}
.section {
  margin-bottom: 40px;
}
h3 {
  margin-bottom: 20px;
}
</style>
