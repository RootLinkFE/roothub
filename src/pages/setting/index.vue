<template>
<div>
    <DashboardHeader title="设置">
    </DashboardHeader>
    <PageWrap>
    <Form :model="form" :label-width="120">
        <FormItem >
            <label slot="label">
                物料下载目录
                <Tooltip content="工作目录根目录" placement="top">
                    <Icon type="ios-help-circle-outline" />
                </Tooltip>
            </label>
            <Input v-model="form.downloadPath" placeholder="默认路径为工作目录下的.pandora"></Input>
        </FormItem>
        <FormItem label="物料设置">
             <CheckboxGroup v-model="form.activeMaterials">
                <Checkbox :label="item.name"
                v-for="(item, key) in form.materials" :key="key"
                >{{item.alias}}</Checkbox>
            </CheckboxGroup>
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
                activeMaterials: [],
                materials: [],
                nodeTool: ''
            },
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
                this.$store.dispatch('getMaterials');
            });
        }
    },
    mounted () {
        Api.get('/setting').then(res => {
            this.form = res;
        });
    }
}
</script>
