<template>
    <div class="pg-dependence">
        <DashboardHeader title="依赖">
            <div class="h-right">
                <Input v-model="search"
                placeholder="输入关键词搜索" style="width: 200px;">
                    <Icon type="ios-search" slot="suffix" />
                </Input>
                <Button type="primary" class="ml20" @click="dialogFormVisible = true">安装依赖</Button>
            </div>
        </DashboardHeader>
        <PageWrap>
            <h2>运行依赖</h2>
            <list-item v-for="item in dependence.dependencies" :key="item.name"
            :item="item"></list-item>
            <h2>开发依赖</h2>
            <list-item v-for="item in dependence.devDependencies" :key="item.name"
            :item="item"></list-item>
        </PageWrap>
        <Modal
            v-model="dialogFormVisible"
            title="安装依赖">
            <Form :model="form" :label-width="80">
                <FormItem label="类型">
                    <RadioGroup v-model="form.type">
                        <Radio label="S">运行依赖</Radio>
                        <Radio label="D">开发依赖</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="名称">
                    <Input v-model="form.name" type="textarea" placeholder="请输入npm包名及版本号，例如lodash@latest,多个包名之间用空格分隔"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="dialogFormVisible = false">取消</Button>
                <Button type="primary" @click="installDependence">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Api from '@/api';
import socket from '@/api/socket';
import ListItem from './list-item';

export default {
    name: 'Dependence',
    data () {
        return {
            search: '',
            dialogFormVisible: false,
            loading: true,
            form: {
                name: '',
                type: 'S'
            },
        };
    },
    computed: {
        _dependence: function () {
            return this.$store.state.dependence;
        },
        dependence: function () {
            const dependence = Object.assign({}, this._dependence);
            const dependencies = dependence.dependencies.filter((v) => v.name.indexOf(this.search) > -1);
            const devDependencies = dependence.devDependencies.filter((v) => v.name.indexOf(this.search) > -1);
            return {
                dependencies,
                devDependencies
            };
        }
    },
    methods: {
        installDependence () {
            if (!this.form.name) {
                this.$Notice.warning({
                    title: '提示',
                    desc: '请填写包名'
                });
                return;
            }
            socket.emit('install dependence', this.form);
            this.dialogFormVisible = false;
            this.$store.commit('setLogShow', true);
        }
    },
    components: {
        ListItem
    },
    mounted () {
        this.$store.dispatch('getDependence');
    }
};
</script>

<style lang="less" scoped>
.h-right {
    display: flex;
    justify-content: flex-end;
}
.install-btn {
    margin-left: 20px;
}
.content {
    h2 {
        margin: 16px;
        color: #6a8bad;
        font-size: 18px;
        font-weight: normal;
    }
}
</style>
