<template>
<div>
    <DashboardHeader title="设置"></DashboardHeader>
    <PageWrap>
        <div class="section">
        <h3>基础设置</h3>
            <MyCard class="setting">
                <Form :model="form" :label-width="100">
                    <FormItem >
                        <label slot="label">
                            下载目录
                            <Tooltip content="工作目录根目录" placement="top">
                                <Icon type="ios-help-circle-outline" />
                            </Tooltip>
                        </label>
                        <Input style="width:400px;" v-model="form.downloadPath" placeholder="默认路径为工作目录下的.pandora"></Input>
                    </FormItem>
                    <FormItem label="包管理器">
                        <RadioGroup v-model="form.nodeTool">
                            <Radio :label="item.label"
                            v-for="(item, key) in nodeTools" :key="key"
                            >{{item.name}}</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" style="margin-right:20px" @click="update">保存</Button>
                    </FormItem>
                </Form>
            </MyCard>
        </div>
        <div class="section">
            <h3>官方推荐物料</h3>
            <MyCard class="material-item" v-for="(item, key) in recommendMaterials" :key="key">
                <div class="left">
                    <span class="icon">{{item.alias.substr(0, 1)}}</span>
                    <div class="info">
                        <div>{{item.alias}}</div>
                        <div class="desc">{{item.description || '暂无描述'}}</div>
                    </div>
                </div>
                <div class="right">
                    <iSwitch v-model="item.active" @on-change="(status) => {changeHandler(status, 'recommendMaterials', item.alias)}"/>
                </div>
            </MyCard>
        </div>
        <div class="section">
            <h3>自定义物料</h3>
            <MyCard class="material-item" v-for="(item, key) in customMaterials" :key="key">
                <div class="left">
                    <span class="icon">{{item.alias.substr(0, 1)}}</span>
                    <div class="info">
                        <div>{{item.alias}}</div>
                        <div class="desc">{{item.description || '暂无描述'}}</div>
                    </div>
                </div>
                <div class="right">
                    <iSwitch v-model="item.active" @on-change="(status) => {changeHandler(status, 'customMaterials', item.alias)}"/>
                </div>
            </MyCard>
        </div>
    </PageWrap>
</div>
</template>
<script>
import Api from '@/api';

export default {
    name: 'Setting',
    data () {
        return {
            form: {
                downloadPath: '',
                nodeTool: ''
            },
            recommendMaterials: [],
            customMaterials: [],
            nodeTools: [
                {
                    label: 'yarn',
                    name: 'yarn'
                },
                {
                    label: 'npm',
                    name: 'npm'
                }
            ]
        }
    },
    methods: {
        update () {
            Api.patch('/setting', this.form).then(() => {
                this.$Message.success('修改成功');
            });
        },
        changeHandler(status, type, alias) {
            console.log(status, type, alias);
            Api.post('/materials/switch', {
                status, type, alias
            }).then(() => {
                this.$Notice.success({
                    title: '提示',
                    desc: '设置成功',
                    duration: 1
                });
            });
        }
    },
    mounted () {
        Api.get('/setting').then(res => {
            this.form = res;
        });
        this.$store.dispatch('getMaterials').then((res) => {
            this.recommendMaterials = res.recommendMaterials;
            this.customMaterials = res.customMaterials;
        });
    }
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
.material-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 10px;
    .icon {
        display: inline-block;
        width: 48px;
        height: 48px;
        border-radius: 100%;
        background: #333333;
        text-align: center;
        line-height: 48px;
        margin-right: 10px;
    }
    .left,
    .right {
        display: flex;
        align-items: center;
    }
    .info {
        .desc {
            font-size: 12px;
            color: #999;
            margin-top: 5px;
        }
    }
    .right {
        justify-content: flex-end;
    }
}
</style>
