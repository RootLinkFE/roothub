<template>
    <div class="project-select">
        <div v-for="(item, index) of projectList" :key="index">{{item.name}}</div>
    </div>
</template>

<script>
export default {
    name: 'ProjectSelect',
    data () {
        return {
            projectList: []
        };
    },
    mounted() {
        this.$api.create.getMyProject().then(res => {
            this.projectList = res;
        });
    }
};
</script>

<style lang="less" scoped>
.project-select {

}
</style>