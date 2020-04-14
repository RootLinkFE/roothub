<template>
    <div class="materials">
        <div class="filter-bar">
            <RadioGroup v-model="materialType" type="button">
                <Radio label="blocks">区块</Radio>
                <Radio label="components">组件</Radio>
            </RadioGroup>
        </div>
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
        // this.search(this.filterType);
        this.changeTab(this.materialType);
    }
}
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 24px;
}
.filter-bar {
    text-align: center;
    margin-bottom: 20px;
}
</style>
