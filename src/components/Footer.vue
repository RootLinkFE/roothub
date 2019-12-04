<template>
    <div>
        <footer>
            <span><i class="iconfont iconfolder"></i> {{cwd}}</span>
            <a href="javascript:;" @click="logShow = !logShow"><i class="iconfont iconicon-test"></i> 日志</a>
        </footer>
        <Log v-show="logShow"/>
    </div>
</template>

<script>
import Log from './log';

export default {
    name: 'MyFooter',
    data () {
        return {
            logShow: false
        };
    },
    components: {
        Log
    },
    computed: {
        cwd () {
            return this.$store.state.project.cwd;
        }
    }
};
</script>

<style lang="less" scoped>
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
    &>* {
        margin-right: 40px;
    }
    .iconicon-test {
        cursor: pointer;
    }
}
</style>