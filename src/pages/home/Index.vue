<template>
    <div style="height: 1000px;">
        <h2>项目概览</h2>
        <p>路径：{{project.cwd}}</p>
        <p>类型：{{project.type}}</p>
        <p>版本号：{{project.version}}</p>
    </div>
</template>

<script>

export default {
    name: 'Home',
    computed: {
        project() {
            return this.$store.state.project;
        }
    }
};
</script>
