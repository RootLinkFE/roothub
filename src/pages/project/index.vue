<template>
    <div class="project">
        <PageHeader title="项目仪表盘"></PageHeader>
        <div class="content">
            <Card title="欢迎">
                <div class="info">
                    <p>项目路径：{{project.cwd}}</p>
                    <p>项目类型：{{project.type}}</p>
                    <p>版本号：{{project.version}}</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';

export default {
    name: "Project",
    data () {
        return {
        };
    },
    computed: {
        project() {
            return this.$store.state.project;
        }
    },
    components: {
        PageHeader,
        Card
    }
};
</script>

<style lang="less" scoped>
.project {
    .content {
        padding: 20px;
    }
    .info {
        color: #fff;
    }
}
</style>