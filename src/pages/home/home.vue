<template>
    <div class="pg-home">
        <DashboardHeader title="仪表盘"></DashboardHeader>
        <PageWrap>
            <Row :gutter="24">
                <Col span="14">
                    <MyCard class="t1">
                        <h1>欢迎使用Pandora</h1>
                        <div class="item">
                            <Icon type="ios-analytics" />
                            <div>
                                <h3>可视化开发</h3>
                                <p>可视化UI界面，物料预览，源码查看，个性化配置</p>
                            </div>
                        </div>
                        <div class="item">
                            <Icon type="md-apps" />
                            <div>
                                <h3>丰富物料</h3>
                                <p>集成ant-design物料，基于丰富的物料可帮助你快速开发页面，并且支持私有物料</p>
                            </div>
                        </div>
                        <div class="item">
                            <Icon type="ios-appstore" />
                            <div>
                                <h3>配套工具</h3>
                                <p>配套的CI命令帮助你快速开发物料，管理项目等</p>
                            </div>
                        </div>
                        <div class="ta-center">
                            <Button type="primary">
                                <a target="_blank" :href="DOC_URL">了解更多 ></a>
                            </Button>
                        </div>
                    </MyCard>
                </Col>
                <Col span="10">
                    <MyCard class="t2">
                        <h2>前端资讯</h2>
                        <ul>
                            <li v-for="(item, key) in news" :key="key">
                                <a :href="item.node.originalUrl" target="_blank">{{item.node.title}}</a>
                            </li>
                        </ul>
                    </MyCard>
                </Col>
            </Row>
        </PageWrap>
    </div>
</template>

<script>
import { DOC_URL } from '@/const';
import axios from "axios";

const instance = axios.create({
    baseURL: "https://web-api.juejin.im",
    timeout: 20000,
    headers: {
        "X-Agent": "Juejin/Web"
    }
});

// 响应拦截器
instance.interceptors.response.use(
    function(response) {
        return response.data.data;
    },
    function(error) {
        console.error(error.response);
        window &&
            window.vm.$Notice.error({
                title: "提示",
                desc: error.response.data || "接口出错了"
            });
        return Promise.reject(error);
    }
);

export default {
    name: "Home",
    data() {
        return {
            currentCom: "select",
            news: [],
            DOC_URL
        };
    },
    components: {},
    mounted() {
        instance
            .post("/query", {
                operationName: "",
                query: "",
                variables: {
                    tags: [],
                    category: "5562b415e4b00c57d9b94ac8",
                    first: 20,
                    after: "",
                    order: "POPULAR"
                },
                extensions: {
                    query: { id: "653b587c5c7c8a00ddf67fc66f989d42" }
                }
            })
            .then(res => {
                this.news = res.articleFeed.items.edges;
            });
    }
};
</script>

<style lang="less" scoped>
.t1 {
    color: #fff;
    padding: 0 20px 20px 20px;
    h1 {
        text-align: center;
        font-weight: normal;
        margin: 40px auto;
    }
    .item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 40px;
        i {
            font-size: 40px;
            margin-right: 20px;
            color: @blue;
        }
    }
}
.t2 {
    color: #fff;
    padding: 20px;
    height: 80vh;
    a:hover {
        color: @blue;
    }
    h2 {
        font-weight: normal;
        margin-bottom: 20px;
        color: #999;
    }
    ul {
        overflow-y: scroll;
        height: 90%;
    }
    li {
        margin-bottom: 20px;
    }
}
</style>
