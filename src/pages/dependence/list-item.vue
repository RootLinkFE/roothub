<template>
    <div class="list-item">
        <span class="name">{{item.name}}</span>
        <span class="version">版本 {{item.version}}</span>
        <!-- <i class="iconfont iconzhuanfa"></i> -->
        <i class="iconfont iconshanchu" @click="remove(item.name)"></i>
    </div>
</template>

<script>
// import socket from '@/api/socket';

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
            // socket.emit('install dependence', name);
            this.$store.commit('setLogShow', true);
        }
    }
};
</script>

<style lang="less">
.list-item {
    color: #6a8bad;
    display: flex;
    justify-content: space-between;
    padding: 16px 20px;
    align-items: center;
    &:hover {
        background: rgba(66, 185, 131, .05);
    }
    .name {
        flex: 1;
        color: #fff;
    }
    .version {
        flex: 1
    }
    .iconfont {
        cursor: pointer;
    }
    .iconzhuanfa {
        margin-right: 20px;
    }
}
</style>
