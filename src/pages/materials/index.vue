<template>
    <div class="materials">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Materials',
    data () {
        return {
            materialType: 'blocks'
        };
    },
    watch: {
        materialType: function(val) {
            this.changeTab(val);
        }
    },
    methods: {
        changeTab (name) {
            this.$router.push({
                name: name
            });
        }
    },
    components: {
        
    },
    mounted () {
    }
}
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 24px;
}
</style>
