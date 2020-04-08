<template>
    <div class="flex">
        <span>{{title}}：</span>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
            <Checkbox
                :indeterminate="indeterminate"
                :value="checkAll"
                @click.prevent.native="handleCheckAll"
            >全部</Checkbox>
            <Checkbox label="香蕉"></Checkbox>
            <Checkbox label="苹果"></Checkbox>
            <Checkbox label="西瓜"></Checkbox>
        </CheckboxGroup>
    </div>
</template>

<script>
export default {
    name: 'm-Filter',
    props: {
        options: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: '筛选'
        }
    },
    data() {
        return {
            indeterminate: true,
            checkAll: false,
            checkAllGroup: ["香蕉", "西瓜"]
        };
    },
    methods: {
        handleCheckAll() {
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            if (this.checkAll) {
                this.checkAllGroup = ["香蕉", "苹果", "西瓜"];
            } else {
                this.checkAllGroup = [];
            }
        },
        checkAllGroupChange(data) {
            if (data.length === 3) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (data.length > 0) {
                this.indeterminate = true;
                this.checkAll = false;
            } else {
                this.indeterminate = false;
                this.checkAll = false;
            }
        }
    }
};
</script>
