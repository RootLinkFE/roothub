<template>
    <div style="height: 1000px;">
        <h2>项目概览</h2>
        <p>路径：{{project.cwd}}</p>
        <p>类型：{{project.type}}</p>
        <p>版本号：{{project.version}}</p>
        <RadioGroup v-model="currentCom" type="button">
            <Radio label="select">项目</Radio>
            <Radio label="import">导入</Radio>
        </RadioGroup>
        <component v-bind:is="currentTabComponent" class="tab"></component>
    </div>
</template>

<script>
import ProjectSelect from './select';
import ProjectImport from './import';

export default {
    name: 'Home',
    data() {
        return {
            currentCom: 'select'
        }
    },
    computed: {
        project() {
            return this.$store.state.project;
        },
        currentTabComponent() {
            return `project-${this.currentCom}`;
        }
    },
    components: {
        ProjectSelect,
        ProjectImport
    }
};
</script>
