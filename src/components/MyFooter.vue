<template>
    <div>
        <footer>
            <div class="flex">
                <router-link to="/projects"><Icon type="md-home" />项目</router-link>
                <span class="item" title="打开文件夹" @click="open"><Icon type="ios-folder" />{{workingDirectory}}</span>
                <span class="item" @click="toggleLog"><i class="iconfont iconicon-test"></i>日志</span>
            </div>
            <div class="flex">
                <a href="http://f2e.souche.com/projects/loan/magic-park/docs/" target="_blank"><Icon type="ios-planet" size="20" />官网</a>
                <a href="https://git.souche-inc.com/loan/magic-park/showbox/issues" target="_blank"><Icon type="ios-paper-plane" />反馈</a>
                <span class="item"><Icon type="md-pricetags" />1.0.0</span>
            </div>
        </footer>
    </div>
</template>


<script>
import Api from '@/api';

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
        workingDirectory: function () {
            return this.$store.state.workingDirectory;
        }
    },
    methods: {
        toggleLog () {
            this.$store.commit('setLogShow', !this.logShow);
        },
        open () {
            Api.get(`/finder/open?dirPath=${this.workingDirectory}`);
        }
    }
};
</script>

<style lang="less">
footer {
    height: 36px;
    width: 100vw;
    padding: 0 10px;
    position: fixed;
    z-index: 12;
    bottom: 0;
    left: 0;
    background: var(--footer-background);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    line-height: 1;
    box-shadow: 0 -3px 5px 0 rgba(0, 0, 0, .12);
    a,
    .item {
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-right: 20px;
        i {
            margin-right: 5px;
        }
    }
}
</style>
