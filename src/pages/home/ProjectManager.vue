<template>
    <div class="project-manager">
        <Row :gutter="24">
            <Col span="6">
                <div class="item import-item" @click="importProject"><Icon type="ios-add" /></div>
            </Col>
            <Col span="6" v-for="(item, key) in projects" :key="key">
                <div class="item project-item">
                    <Icon type="ios-trash-outline" class="del-icon" @click="deleteProject(key, item.path)"/>
                    <div>
                        <div class="name">{{item.name}}</div>
                        <div class="path">{{item.path}}</div>
                    </div>
                    <Button long type="primary" v-if="workingDirectory === item.path">当前工作区</Button>
                    <Button long v-else @click="setWorkingDirectory(item.path)">设为工作区</Button>
                </div>
            </Col>
        </Row>
        <Modal
            v-model="modal"
            :footer-hide="true"
            title="导入项目">
            <div class="modal-content">
                <Finder @success="importHandler"></Finder>
            </div>
        </Modal>
    </div>
</template>

<script>
import Api from '@/api';
import Finder from '@/components/Finder';

export default {
    name: 'ProjectManager',
    data () {
        return {
            modal: false,
            projects: []
        };
    },
    computed: {
        workingDirectory: function () {
            return this.$store.state.workingDirectory;
        }
    },
    components: {
        Finder
    },
    methods: {
        importProject () {
            this.modal = true;
        },
        deleteProject (key, path) {
            if (path === this.workingDirectory) {
                return this.$Notice.warning({
                    title: '标题',
                    desc: '当前工作区不可删除'
                });
            }
            Api.delete(`/myProjects/${key}`).then(res => {
                this.projects = res;
            });
        },
        importHandler (data) {
            this.$Notice.success({
                title: '标题',
                desc: '导入成功!'
            });
            this.projects = data;
            this.modal = false;
        },
        setWorkingDirectory (dir) {
            Api.patch('/workingDirectory', {
                dir
            }).then((res) => {
                this.$Notice.success({
                    title: '提示',
                    desc: '切换成功'
                });
                this.$store.commit('setWorkingDirectory', res);
            });
        }
    },
    mounted () {
        Api.get('/myProjects').then(res => {
            this.projects = res;
        });
    }
}
</script>

<style lang="less">
.project-manager {
    .item {
        border: 1px solid #ddd;
        border-radius: 4px;
        height: 240px;
        margin-bottom: 24px;
    }
    .import-item {
        background: #f2f2f2;
        cursor: pointer;
        color: @color;
        font-size: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .project-item {
        overflow: hidden;
        position: relative;
        white-space: normal;
        word-break: break-all;
        padding: 14px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .del-icon {
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
        }
        .name {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
            line-height: 1.2;
            margin-top: 10px;
        }
        .path {
            color: #999;
            font-size: 13px;
        }
    }
}
.modal-content {
    
}

</style>
