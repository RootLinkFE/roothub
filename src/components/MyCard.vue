<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'MyCard',
    props: {
        title: String
    }
};
</script>

<style lang="less">
.card {
    width: 100%;
    background: var(--card-bg);
    border: 1px solid var(--card-border-color);
    border-radius: 2px;
    color: var(--text-color);
    &:hover {
        box-shadow: 0 2px 7px var(--card-hover-color);
    }
}
</style>
