<template>
    <div>
        <span @click="openFinder"><i class="iconfont icondaoru-tianchong"></i> 导入项目</span>
        <Finder :visible="visible" 
        @close="visible = false"
        @submit="importProject" />
    </div>
</template>

<script>
import Finder from '@/components/Finder';

export default {
    name: 'ImportProject',
    data () {
        return {
            visible: false
        };
    },
    components: {
        Finder
    },
    methods: {
        openFinder () {
            this.visible = true;
        },
        // 检验是否拥有这个项目
        async checkHasProject(path) {
            try {
                const result = await this.$api.create.checkHasProject(path);
                return result.hasProject;
            } catch (err) {
                console.log(err);
            }
        },
        // 导入项目
        async importProject(path) {
            const name = path.split("/").slice(-1)[0];
            console.log(path);
            const hasProject = await this.checkHasProject(path);
            if (hasProject) {
                this.$message.warning("已拥有此项目");
                return;
            }
            try {
                const data = await this.$api.create.importProject({
                    name,
                    path
                });
                if (data) {
                    this.$message.success("导入成功");
                    this.visible = false;
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
};
</script>