<template>
    <div class="project-import">
        <div class="operate">
            <Button size="small" @click="back">
                <Icon type="ios-arrow-back" />
            </Button>
            <Button size="small" v-for="(name, index) of currentPathArr" :key="index" @click="pathSlice(index)">
                {{name}}
                <Icon type="md-home" v-if="!name"/>
            </Button>
        </div>
        <div class="list">
            <div class="list-item" :key="index" v-for="(item, index) of fileList" @click="into(item)">
                <Icon v-if="item.type === 'dir'" type="md-folder" />
                <Icon v-if="item.type === 'file'" type="md-document" />
                {{item.name}}
            </div>
        </div>
        <div class="btn-wrap">
            <Button :disabled="!isPackage" type="primary" @click="importProject">
                导入这个文件夹
            </Button>
        </div>
    </div>
</template>

<script>
import Api from '@/api';

export default {
    name: 'Finder',
    data () {
        return {
            homedir: '',
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
            if (this.currentPathArr.length === 1) {
                return;
            }
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
            Api.post('/myProjects', {
                name: this.currentPathArr[this.currentPathArr.length - 1],
                currentPath: this.currentPath
            }).then(res => {
                this.$emit('success', res);
            });
        },
        getFloder(filePath) {
            Api.get('/finder/files', {
                params: {
                    filePath
                }
            }).then(res => {
                if (res.code && res.code === 'ENOENT') {
                    this.fileList = [];
                    return;
                }
                this.fileList = res;
            });
        },
        getHomedir() {
            return Api.get('/finder/homedir').then(res => {
                this.homedir = res;
                this.currentPathArr = res.split('/');
            });
        }
    },
    mounted() {
        this.getHomedir().then(() => { this.getFloder(this.currentPath)});
    }
};
</script>

<style lang="less" scoped>
.list {
    height: 350px;
    overflow-y: scroll;
}
.btn-wrap {
    text-align: right;
}
.operate {
    margin-bottom: 10px;
    button {
        margin: 0 10px 10px 0;
    }
}
</style>
