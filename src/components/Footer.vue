<template>
    <div>
        <footer>
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    当前项目：{{cwd}}<i class="el-icon-arrow-up el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <ImportProject /> 
            <span><i class="iconfont icontianjia"></i> 创建项目</span>
            <span @click="toggleLog"><i class="iconfont iconicon-test"></i> 日志</span>
            <span><i class="iconfont iconfankui"></i> 反馈</span>
        </footer>
    </div>
</template>


<script>
import ImportProject from '@/components/ImportProject';

export default {
    name: 'MyFooter',
    data () {
        return {
            visible: false
        }
    },
    computed: {
        logShow () {
            return this.$store.state.logShow;
        },
        cwd () {
            if (this.$store.state.project.cwd) {
                const paths = this.$store.state.project.cwd.split('/');
                return paths[paths.length - 1];
            }
            return '';
        }
    },
    methods: {
        toggleLog () {
            this.$store.commit('setLogShow', !this.logShow);
        }
    },
    components: {
        ImportProject
    }
};
</script>

<style lang="less">
footer {
    height: 36px;
    width: 100vw;
    padding: 0 10px;
    position: fixed;
    bottom: 0;
    left: 0;
    background: @color;
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 13px;
    box-shadow: 0 -3px 5px 0 rgba(0, 0, 0, .12);
    /deep/ .el-dropdown {
        color: #fff;
    }
    &>* {
        margin-right: 40px;
    }
    span {
        cursor: pointer;
    }
}
</style>