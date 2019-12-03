<template>
    <ModuleWrapper title="依赖管理">
        <div class="dependence">
            <el-tabs v-model="activeName">
                <el-tab-pane :label="`dependencies(${Object.keys(project.dependencies).length})`" name="first" class="dep-list">
                    <div v-for="(item, key) in project.dependencies" :key="key">
                        <a class="name" :title="key">{{key}}</a>
                        <div class="version">{{item}}</div>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`devDependencies(${Object.keys(project.devDependencies).length})`" name="second" class="dep-list">
                    <div v-for="(item, key) in project.devDependencies" :key="key">
                        <a class="name" :title="key">{{key}}</a>
                        <div class="version">{{item}}</div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </ModuleWrapper>
</template>

<script>
import ModuleWrapper from '../ModuleWrapper';

export default {
    name: 'Dependence',
    data () {
        return {
            activeName: 'first'
        };
    },
    computed: {
        project () {
            return this.$store.state.project;
        }
    },
    components: {
        ModuleWrapper
    }
}
</script>

<style lang="less" scoped>
.dependence {
    padding: 0 16px;
    .dep-list {
        &>div {
            display: inline-block;
            width: 30%;
            margin-right: 3%;
            margin-bottom: 15px;
        }
        .name {
            margin-bottom: 10px;
            height: 20px;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .version{
            color: #999;
            font-size: 12px;
        }
    }
}
</style>