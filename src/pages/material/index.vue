<template>
    <div class="material">
        <PageHeader title="物料">
            <div>
                <el-button type="primary" round size="mini" @click="help">添加物料
                    <i class="iconfont iconquestion" style="vertical-align:text-bottom;"></i>
                </el-button>
            </div>
        </PageHeader>
        <MainWrapper>
            <card>
                <el-row>
                    <el-col>
                        客户端类型：
                        <el-radio-group v-model="filterType.agent" size="mini">
                            <el-radio-button label="all">全部</el-radio-button>
                            <el-radio-button label="pc">Pc</el-radio-button>
                            <el-radio-button label="mobile">Mobile</el-radio-button>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        框架类型：
                        <el-radio-group v-model="filterType.framework" size="mini">
                            <el-radio-button label="vue">Vue</el-radio-button>
                            <el-radio-button label="react">React</el-radio-button>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        物料类型：
                        <el-radio-group v-model="filterType.material" size="mini">
                            <el-radio-button label="block">区块</el-radio-button>
                            <el-radio-button label="component">组件</el-radio-button>
                            <el-radio-button label="template">模板</el-radio-button>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <template v-if="filterType.material === 'block'">
                    <item-list v-if="blocks.length">
                        <block-item v-for="(item, key) in blocks" 
                            :info="item"
                            :key="key"></block-item>
                    </item-list>
                    <empty v-else />
                </template>
                <template v-else-if="filterType.material === 'component'">
                    <item-list>
                        <component-item v-for="(item, key) in components" 
                            :info="item"
                            :key="key"></component-item>
                    </item-list>
                </template>
                <template v-else>
                    <item-list>
                        <component-item v-for="(item, key) in cps" 
                            :info="item"
                            :key="key"></component-item>
                    </item-list>
                </template>
            </card>
        </MainWrapper>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import MainWrapper from '@/components/MainWrapper';
import Empty from '@/components/Empty';
import ItemList from './ItemList';
import BlockItem from './BlockItem';
import ComponentItem from './ComponentItem';

export default {
    name: 'Material',
    data () {
        return {
            filterType: {
                agent: 'all',
                framework: 'vue',
                material: 'block'
            }
        };
    },
    watch: {
        filterType: {
            handler: function(val) {
                this.search(val);
            },
            deep: true
        }
    },
    computed: {
        blocks: function () {
            return this.$store.state.blockMaterials;
        },
        components: function () {
            return this.$store.state.componentMaterials;
        }
    },
    methods: {
        search (params) {
            if (params.material === 'block') {
                this.$store.dispatch('getBlocks', params);
            } else if (params.material === 'component') {
                this.$store.dispatch('getComponents', params);
            }
        },
        help () {
            this.$router.push('/material/help');
        }
    },
    components: {
        PageHeader,
        Card,
        MainWrapper,
        Empty,
        ItemList,
        BlockItem,
        ComponentItem
    },
    mounted () {
        this.search(this.filterType);
    }
}
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 24px;
}
.material {
    .content {

    }
}
</style>