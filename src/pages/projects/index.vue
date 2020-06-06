<template>
    <div class="projects">
        <div class="top">
            <Logo></Logo>
            <div class="btns">
                <Button type="primary" @click="modal = true">导入项目</Button>
            </div>
        </div>
        <div class="list">
            <Row :gutter="36">
                <Col span="6" v-for="(item, key) in projects" :key="key">
                    <Item :data="item" :index="key" @deleteProject="deleteProject"></Item>
                </Col>
            </Row>
        </div>
        <Modal
            v-model="modal"
            on-text="确定"
            @on-ok="importProject"
            title="导入项目">
            <div class="modal-content">
                <Finder v-model="currentPath"></Finder>
            </div>
        </Modal>
    </div>
</template>

<script>
import Api from '@/api';
import Item from './item';

export default {
    name: "Projects",
    data () {
        return {
            modal: false,
            currentPath: ''
        };
    },
    computed: {
        projects () {
            return this.$store.state.projects;
        }
    },
    components: {
        Item
    },
    methods: {
        importProject() {
            Api.post('/myProjects', {
                name: this.currentPath.split('/').pop(),
                currentPath: this.currentPath
            }).then(res => {
                this.$Notice.success({
                    title: '标题',
                    desc: '导入成功!',
                    duration: 1
                });
                this.$store.commit('setWorkingDirectory', this.currentPath);
                this.$router.push('/dashboard/overview');
            });
        },
        deleteProject (index) {
            Api.delete(`/myProjects/${index}`).then(() => {
                this.$store.dispatch('getProjects');
            });
        },
        getHomedir() {
            return Api.get('/finder/homedir').then(res => {
                this.currentPath = res;
            });
        }
    },
    mounted () {
        this.$store.dispatch('getProjects');
        this.getHomedir();
    }
};
</script>

<style lang="less" scoped>
.projects {
    .top {
        background: var(--dashboard-header-bg);
        padding: 0 24px;
        height: 63px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);
        .btns {
            display: flex;
            align-items: center;
        }
    }
    .list {
        padding: 40px 24px;
    }
}
</style>
