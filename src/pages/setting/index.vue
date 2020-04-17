<template>
    <Form :model="formItem" :label-width="120">
        <h2 style="margin-bottom: 20px">工具设置<span style="fontSize: 13px;">（重启生效）</span></h2>
        <FormItem label="物料下载目录">
            <Input v-model="formItem.downloadPath" placeholder="默认路径为工作目录下的.pandora"></Input>
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
                downloadPath: ''
            }
        }
    },
    methods: {
        update () {
            Api.patch('/setting', this.formItem).then(res => {
                this.$Message.success('修改成功');
            });
        },
        reset () {
            Api.patch('/setting/reset', this.formItem).then(res => {
                this.$Message.success('重置成功');
                this.formItem = res;
            });
        }
    },
    mounted () {
        Api.get('/setting').then(res => {
            this.formItem = res;
        });
    }
}
</script>
