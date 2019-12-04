<template>
    <div class="project">
        <FuncModuleWrapper>
            <div slot="top">启动项目</div>
            <div slot="content" class="script">
                <p>项目路径：{{project.cwd}}</p>
                <p>项目类型：{{project.type}}</p>
                <p>版本号：{{project.version}}</p>
            </div>
        </FuncModuleWrapper>
        <Dependence></Dependence>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import FuncModuleWrapper from './FuncModuleWrapper';
import Dependence from './dependence';

// const POST_ADDED = gql`subscription{
//     postAdded {
//         author
//     }
// }`;

export default {
    name: "Project",
    data () {
        return {
            postAdded: {},
            
            project: {}
        };
    },
    apollo: {
        project: {
            query: gql`query {
                project {
                    version
                    cwd
                    type
                }
            }`,
            result(result) {
                this.$store.commit('getProject', result.data.project);
            }
        },
        // $subscribe: {
        //     // 当添加一个标签时
        //     postAdded: {
        //         query: POST_ADDED,
        //         // 结果钩子
        //         // 不要忘记对 `data` 进行解构
        //         result({ data }) {
        //             this.postAdded = data.postAdded;
        //             console.log(data.postAdded);
        //         }
        //     }
        // }
    },
    mounted () {
        // this.$store.commit('getProject', {a: 22});
    },
    components: {
        FuncModuleWrapper,
        Dependence
    }
};
</script>

<style lang="less">
.project {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 40px;
    width: 100%;
    height: 100%;
    overflow: scroll;
    &>* {
        width: 48%;
    }
}
</style>