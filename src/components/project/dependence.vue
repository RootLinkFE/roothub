<template>
    <FuncModuleWrapper>
        <div slot="top">依赖管理</div>
        <div slot="content" class="dependence">
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
    </FuncModuleWrapper>
</template>

<script>
import FuncModuleWrapper from './FuncModuleWrapper';

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
        FuncModuleWrapper
    }
}
</script>

<style lang="less" scoped>
.dependence {
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