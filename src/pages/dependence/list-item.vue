<template>
    <div class="de-list-item">
        <a :href="'https://www.npmjs.com/package/' + item.name" target="_blank" rel="noopener" class="name">
            {{item.name}}
        </a>
        <span class="version">版本 {{item.version}}</span>
        <div>
            <Icon type="md-trash" @click="remove(item.name)"/>
        </div>
    </div>
</template>

<script>
import socket from '@/api/socket';

export default {
    name: "ListItem",
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        remove (name) {
            this.$store.commit('setLogShow', true);
            socket.emit('uninstall dependence', name);
        }
    }
};
</script>

<style lang="less">
.de-list-item {
    color: var(--text-color);
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    align-items: center;
    font-size: 15px;
    .name {
        width: 30%;
        color: #fff;
        &:hover {
            color: @primary-color;
        }
    }
    .version {
        width: 20%;
    }
    .ivu-icon {
        cursor: pointer;
    }
}
</style>
