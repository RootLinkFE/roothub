<template>
    <div class="material">
        <PageHeader title="物料">
            <div>
                <el-button type="primary" round size="mini">添加物料</el-button>
            </div>
        </PageHeader>
        <MainWrapper>
            <card>
                <el-row>
                    <el-col span="20">
                        项目框架：
                        <el-button-group>
                            <el-button size="mini" :type="acitveTab.component" @click="switchTab('component')">React</el-button>
                            <el-button size="mini" :type="acitveTab.block" @click="switchTab('block')">Vue</el-button>
                        </el-button-group>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col span="20">
                        物料类型：
                        <el-button-group>
                            <el-button size="mini" :type="acitveTab.block" @click="switchTab('block')">区块</el-button>
                            <el-button size="mini" :type="acitveTab.template" @click="switchTab('template')">模板</el-button>
                            <el-button size="mini" :type="acitveTab.component" @click="switchTab('component')">组件</el-button>
                        </el-button-group>
                    </el-col>
                </el-row>
                <div v-if="acitveTab.component">
                    <item-list>
                        <component-item v-for="(item, key) in cps" 
                            :info="item"
                            :key="key"></component-item>
                    </item-list>
                </div>
            </card>
        </MainWrapper>

    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import MainWrapper from '../MainWrapper';
import ItemList from './ItemList';
import ComponentItem from './ComponentItem';

export default {
    name: 'Material',
    data () {
        return {
            cps: [{
                name: 'img',
                npm: '@ideagays/validator',
                description: '这是描述丧尸国度技术导师的手机号多少的时候几倒是环境的是多少几乎都是'
            }, {
                name: '电视机看电视剧',
                description: '这是描述丧尸国度技术导师的手机号多少的时候几倒是环境的是多少几乎都是'
            }, {
                name: '电视机看电视剧',
                description: '这是描述丧尸国度技术导师的手机号多少的时候几倒是环境的是多少几乎都是'
            }],
            acitveTab: {
                component: 'primary',
                block: '',
                template: ''
            }
        };
    },
    components: {
        PageHeader,
        Card,
        MainWrapper,
        ItemList,
        ComponentItem
    },
    methods: {
        switchTab (name) {
            for (let key in this.acitveTab) {
                this.acitveTab[key] = '';
            }
            this.acitveTab[name] = 'primary';
        }
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