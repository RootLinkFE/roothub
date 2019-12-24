<template>
    <div>
        <PageHeader title="如何添加物料？">
        </PageHeader>
        <MainWrapper class="help">
            
                <help/>
        </MainWrapper>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import MainWrapper from '@/components/MainWrapper';
import help from './help.md';

export default {
    name: 'Help',
    data () {
        return {
            vue: 'https://git.souche-inc.com/loan/magic-park/vue-materials',
            react: 'https://git.souche-inc.com/loan/magic-park/react-materials'
        };
    },
    components: {
        MainWrapper,
        PageHeader,
        help: help.vue.component
    }
}
</script>

<style lang="less">
.help {
    color: #fff;
    a {
        color: @color;
    }
}
</style>