<template>
    <div>
        <DashboardHeader title="物料">
            <Input v-model="search.name"
            @on-enter="searchHandler"
            placeholder="输入关键词搜索" style="width: 100%">
                <Icon type="ios-search" slot="suffix" />
            </Input>
        </DashboardHeader>
        <PageWrap>
        <MyFilter v-model="search.tag" @change="filterHandler"></MyFilter>
        <div class="blocks">
            <Row :gutter="24" v-if="blocks.length">
                <Col span="6" v-for="(value, key) in blocks" :key="key">
                    <block-item :materialsName="materialsName" :info="value"></block-item>
                </Col>
            </Row>
            <Empty v-else></Empty>
            <Spin fix v-if="spinShow"></Spin>
        </div>
        <Page class="pages" :show-total="true" :current="search.page" :total="total" :page-size="search.pageSize" @on-change="pageChange"/>
        </PageWrap>
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
                category: '全部',
                page: 1,
                pageSize: 24
            },
            spinShow: false,
            total: 0
        };
    },
    methods: {
        filterHandler (category) {
            this.initParams(this.$route);
            this.search.category = category;
            this.getList();
        },
        searchHandler () {
            this.search.page = 1;
            this.search.category = '全部';
            this.getList();
        },
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
            this.search.category = '全部';
            this.search.materialsName = route.params.materialsName;
            this.search.page = 1;
            this.total = 0;
        },
        pageChange (page) {
            this.search.page = page;
            this.getList();
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
