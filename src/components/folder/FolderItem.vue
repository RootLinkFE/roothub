<template>
    <div>
        {{name}}
    </div>
</template>

<script>
export default {
    name: 'FolderItem',
    props: {
        path: String,
        name: String
    }
};
</script>