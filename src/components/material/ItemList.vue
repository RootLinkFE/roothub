<template>
    <div class="item-list">
        <slot></slot>
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
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
        width: 31%;
    }
}
</style>