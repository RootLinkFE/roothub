<template>
    <div class="project-manager">
        <Row :gutter="24">
            <Col span="6">
                <div class="item import-item" @click="importProject"><Icon type="ios-add" /></div>
            </Col>
            <Col span="6" v-for="(item, key) in projects" :key="key">
                <div class="item project-item">
                    <div>
                        <div class="name">{{item.name}}</div>
                        <div class="path">{{item.path}}</div>
                    </div>
                    <Button long type="error" @click="deleteProject(key)">删除</Button>
                </div>
            </Col>
        </Row>
        <Modal
            v-model="modal1"
            :footer-hide="true"
            title="导入项目">
            <div class="modal-content">
                <ProjectImport></ProjectImport>
            </div>
        </Modal>
    </div>
</template>

<script>
import Api from '@/api';
import ProjectImport from './import';

export default {
    name: 'ProjectManager',
    data () {
        return {
            modal1: false,
            projects: []
        };
    },
    components: {
        ProjectImport
    },
    methods: {
        importProject () {
            this.modal1 = true;
        },
        deleteProject (key) {
            Api.delete(`/myProjects/${key}`).then(res => {
                console.log(res);
                this.projects = res;
            });
        }
    },
    mounted () {
        Api.get('/myProjects').then(res => {
            console.log(res);
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
        cursor: pointer;
    }
    .import-item {
        background: #f2f2f2;
        color: @color;
        font-size: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .project-item {
        overflow: hidden;
        white-space: normal;
        word-break: break-all;
        padding: 14px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .name {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
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
