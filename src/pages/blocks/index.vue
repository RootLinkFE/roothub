<template>
    <div>
        <Input v-model="search.name"
        @on-enter="getList"
        placeholder="输入关键词搜索" style="width: 100%">
            <Icon type="ios-search" slot="suffix" />
        </Input>
        <br>
        <div class="blocks">
            <Row :gutter="24">
                <Col span="6" v-for="(value, key) in blocks" :key="key">
                    <block-item :materialsName="materialsName" :info="value"></block-item>
                </Col>
            </Row>
            <Spin fix v-if="spinShow"></Spin>
        </div>
        <Page class="pages" :total="total" :page-size="search.pageSize"/>
    </div>
</template>

<script>
import Api from '@/api';
import BlockItem from "./Item";

export default {
    name: "Blocks",
    data() {
        return {
            materialsName: this.$route.params.materialsName,
            blocks: [],
            search: {
                materialsName: this.$route.params.materialsName,
                name: '',
                page: 1,
                pageSize: 16
            },
            spinShow: false,
            total: 0
        };
    },
    methods: {
        getList () {
            this.spinShow = true;
            Api.get('/blocks', {
                params: this.search
            }).then(res => {
                this.blocks = res.list;
                this.total = res.total;
            }).finally(() => {
                this.spinShow = false;
            });
        },
        initParams (route) {
            this.materialsName = route.params.materialsName;
            this.search.name = '';
            this.search.materialsName = route.params.materialsName;
            this.search.page = 1;
            this.total = 0;
        }
    },
    components: {
        BlockItem
    },
    watch: {
        $route: function(val) {
            this.initParams(val);
            this.getList();
        }
    },
    mounted() {
        this.getList();
    }
};
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 24px;
}
.blocks {
    position: relative;
    margin-top: 30px;
}
.pages {
    margin: 60px auto 20px auto;
    text-align: center;
}
</style>
