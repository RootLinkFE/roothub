<template>
    <div class="project-import">
        <div class="operate">
            <Button size="small" @click="back">
                <Icon type="ios-arrow-back" />
            </Button>
            <Button size="small" v-for="(name, index) of currentPathArr" :key="index" @click="pathSlice(index)">
                {{name}}
                <Icon v-if="!name" type="md-home" />
            </Button>
        </div>
        <div class="list">
            <div class="list-item" :key="index" v-for="(item, index) of fileList" @click="into(item)">
                <Icon v-if="item.type === 'dir'" type="md-folder" />
                <Icon v-if="item.type === 'file'" type="md-document" />
                {{item.name}}
            </div>
        </div>
        <Button :disabled="!isPackage" @click="importProject">
            导入这个文件夹
        </Button>
    </div>
</template>

<script>
export default {
    name: 'ProjectImport',
    data () {
        return {
            path: '',
            fileList: [],
            currentPathArr: []
        };
    },
    watch: {
        currentPathArr(newVal, oldVal) {
            if (oldVal.length < 1) return;
            else this.getFloder(this.currentPath);
        }
    },
    computed: {
        currentPath() {
            return this.currentPathArr.join('/');
        },
        isPackage() {
            for (let { name } of this.fileList) {
                if (name === 'package.json') return true;
            }
            return false;
        }
    },
    methods: {
        back() {
            this.currentPathArr.pop();
        },
        into({name, type}) {
            if (type === 'dir') {
                this.currentPathArr.push(name);
            }
        },
        pathSlice(index) {
            this.currentPathArr.splice(index + 1);
        },
        importProject() {
            this.$api.create.addProject(this.currentPath);
        },
        getFloder(path) {
            this.$api.create.list(path).then(res =>{
                if (res.code && res.code === 'ENOENT') {
                    this.fileList = [];
                    return;
                }
                this.fileList = res;
            })
        },
        getHomeDir() {
            return this.$api.create.homeDir().then((res) => {
                this.currentPathArr = res.split('/');
                return this.currentPath;
            });
        }
    },
    mounted() {
        this.getHomeDir().then(path => void this.getFloder(path));
    }
};
</script>

<style lang="less" scoped>
.project-import {

}
</style>