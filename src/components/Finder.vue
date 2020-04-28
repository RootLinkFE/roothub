<template>
    <div class="project-import">
        <div class="operate">
            <Button size="small" @click="back(-1)">
                <Icon type="ios-arrow-back" />
            </Button>
            <Button size="small" v-for="(name, index) of currentPathArr" :key="index" @click="back(index + 1)">
                {{name}}
                <Icon type="md-home" v-if="!name"/>
            </Button>
        </div>
        <div class="list">
            <div class="list-item" :key="index" v-for="(item, index) of fileList" @click="into(item)">
                <Icon v-if="item.type === 'dir'" type="md-folder" />
                <Icon v-if="item.type === 'file'" type="md-document" />
                <a href="javascript:;">{{item.name}}</a>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '@/api';

export default {
    name: 'Finder',
    props: {
        value: {
            type: String
        }
    },
    data () {
        return {
            fileList: [],
            currentPath: ''
        };
    },
    watch: {
        currentPath(val) {
            this.$emit('input', val);
            this.getFloder(val);
        },
        value (val) {
            this.currentPath = val;
        }
    },
    computed: {
        currentPathArr () {
            return this.currentPath.split('/');
        },
        isPackage() {
            for (let { name } of this.fileList) {
                if (name === 'package.json') return true;
            }
            return false;
        }
    },
    methods: {
        back(index) {
            const length = this.currentPathArr.length;
            if (length === 1) {
                return;
            }
            let arr = [].concat(this.currentPathArr);
            arr.splice(index, index === -1 ? 1 : length);
            this.currentPath = arr.join('/');
        },
        into({name, type}) {
            if (type === 'dir') {
                this.currentPath += `/${name}`;
            }
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
        }
    },
    mounted() {
        this.currentPath = this.value;
    }
};
</script>

<style lang="less" scoped>
.list {
    height: 260px;
    overflow-y: scroll;
    .list-item:hover {
        color: #2d8cf0;
    }
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
