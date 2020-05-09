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
    background: var(--card-background);
    border: 1px solid var(--card-border-color);
    border-radius: 2px;
    &:hover {
        box-shadow: 0 2px 7px var(--card-hover-color);
    }
}
</style>
