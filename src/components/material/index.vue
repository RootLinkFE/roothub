<template>
    <main-wrapper>
        <el-button-group>
            <el-button :type="acitveTab.component" @click="switchTab('component')">组件</el-button>
            <el-button :type="acitveTab.block" @click="switchTab('block')">区块</el-button>
            <el-button :type="acitveTab.template" @click="switchTab('template')">模板</el-button>
        </el-button-group>
        <div v-if="acitveTab.component">
            <item-list>
                <component-item v-for="(item, key) in cps" 
                    :info="item"
                    :key="key"></component-item>
            </item-list>
        </div>
        <!-- <el-tabs >
            
            <el-tab-pane label="组件">
                
            </el-tab-pane>
            <el-tab-pane label="模板">模板</el-tab-pane>
            <el-tab-pane label="区块">区块</el-tab-pane>
        </el-tabs> -->
    </main-wrapper>
</template>

<script>
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