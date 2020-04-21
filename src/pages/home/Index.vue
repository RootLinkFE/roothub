<template>
    <div>
        <h2 style="marginBottom: 30px;">我的项目</h2>
        <ProjectManager></ProjectManager>
    </div>
</template>

<script>
import ProjectManager from './ProjectManager';

export default {
    name: 'Home',
    data() {
        return {
            currentCom: 'select'
        }
    },
    components: {
        ProjectManager
    }
};
</script>
