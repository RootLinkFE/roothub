<template>
    <div class="item-list">
        <slot class="item"></slot>
    </div>
</template>

<script>
export default {
    name: 'ItemList'
}
</script>

<style lang="less">
.item-list {
    display: flex;
    flex-wrap: wrap;
    .item {
        width: 29%;
        margin-right: 3%;
        margin-bottom: 20px;
    }
}
</style>