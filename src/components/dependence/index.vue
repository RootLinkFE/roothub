<template>
    <div>
        <PageHeader title="项目依赖"></PageHeader>
        <div class="content">
            <h2>运行依赖</h2>
            <list-item v-for="(item, key) in dependencies" :key="key"
            :item="item"></list-item>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import PageHeader from '@/components/PageHeader';
import ListItem from './list-item';

export default {
    name: 'Dependence',
    computed: {
        dependencies () {
            return this.$store.state.dependencies;
        },
        devDependencies () {
            return this.$store.state.devDependencies;
        }
    },
    apollo: {
        project: {
            query: gql`query {
                dependencies {
                    version
                    name
                }
            }`,
            result(result) {
                this.$store.commit('getDependencies', result.data.dependencies);
            }
        },
    },
    components: {
        PageHeader,
        ListItem
    }
};
</script>

<style lang="less">
.content {
    h2 {
        margin: 16px;
        color: #6a8bad;
        font-size: 18px;
        font-weight: normal;
    }
}
</style>