<template>
    <Form :model="formItem" :label-width="120">
        <h2 style="margin-bottom: 20px">工具设置<span style="fontSize: 13px;">（重启生效）</span></h2>
        <FormItem label="启动端口">
            <Input v-model="formItem.startPort" placeholder="默认8111"></Input>
        </FormItem>
        <FormItem label="物料下载目录">
            <Input v-model="formItem.downloadPath" placeholder="默认路径为工作目录下的.showbox"></Input>
        </FormItem>
        <FormItem label="物料开发端口">
            <Input v-model="formItem.materialDevPort" placeholder="默认8222"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" style="margin-right:20px" @click="update">保存</Button>
            <Button type="default" @click="reset">重置默认</Button>
        </FormItem>
    </Form>
</template>
<script>
import Api from '@/api';

export default {
    name: 'Setting',
    data () {
        return {
            formItem: {
                startPort: '',
                downloadPath: '',
                materialDevPort: ''
            }
        }
    },
    methods: {
        update () {
            Api.patch('/config', this.formItem).then(res => {
                this.$Message.success('修改成功');
            });
        },
        reset () {
            Api.patch('/config/reset', this.formItem).then(res => {
                this.$Message.success('重置成功');
                this.formItem = res;
            });
        }
    },
    mounted () {
        Api.get('/config').then(res => {
            this.formItem = res;
        });
    }
}
</script>
