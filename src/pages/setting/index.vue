<template>
    <Form :model="formItem" :label-width="120">
        <h2 style="margin-bottom: 20px">工具设置</h2>
        <FormItem label="启动端口">
            <Input v-model="formItem.startPort" placeholder="默认8111"></Input>
        </FormItem>
        <FormItem label="物料下载路径">
            <Input v-model="formItem.downloadPath" placeholder="默认路径为工作目录下的.showbox"></Input>
        </FormItem>
        <FormItem label="物料开发端口">
            <Input v-model="formItem.materialDevPort" placeholder="默认8222"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary">保存</Button>
        </FormItem>
    </Form>
</template>
<script>
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
        }
    }
</script>
