<template>
    <Form :model="form" :label-width="120">
        <h2 style="margin-bottom: 20px">设置</h2>
        <FormItem >
            <label slot="label">
                物料下载目录
                <Tooltip content="相对于工作目录根目录" placement="top">
                    <Icon type="ios-help-circle" />
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
        <FormItem>
            <Button type="primary" style="margin-right:20px" @click="update">保存</Button>
        </FormItem>
    </Form>
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
                materials: []
            }
        }
    },
    methods: {
        update () {
            Api.patch('/setting', this.form).then(() => {
                this.$Message.success('修改成功');
                window.location.reload();
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
