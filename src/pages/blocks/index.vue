<template>
    <div>
        <Input v-model="search.name"
        @on-enter="getList"
        placeholder="输入关键词搜索" style="width: 300px">
            <Icon type="ios-search" slot="suffix" />
        </Input>
        <br>
        <div class="blocks">
            <Row :gutter="24">
                <Col span="6" v-for="(item, key) in blocks" :key="key">
                    <block-item :type="type" :info="item" ></block-item>
                </Col>
            </Row>
            <Spin fix v-if="spinShow"></Spin>
        </div>
        <Page class="pages" :total="total" :page-size="search.pageSize"/>
    </div>
</template>

<script>
import Api from '@/api';
import qs from 'qs';
import BlockItem from "./Item";

export default {
    name: "Blocks",
    data() {
        return {
            type: this.$route.query.type,
            blocks: [],
            search: {
                type: this.$route.query.type,
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
            Api.get('/blocks', {
                params: this.search
            }).then(res => {
                this.blocks = res.list;
                this.total = res.total;
            });
        }
    },
    components: {
        BlockItem
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
