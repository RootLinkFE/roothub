<template>
    <div class="filter">
        <div class="my-radio-group">
            <div v-for="(item, key) in options" :key="`mf-${key}`" class="my-radio">
                <input @change="changeHandler"
                type="radio" :id="item" :value="item"
                v-model="current"><label :for="item">{{item}}</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyFilter',
    props: {
        title: {
            type: String,
            default: '筛选'
        },
        value: {
            type: String,
            default: '全部'
        }
    },
    data() {
        return {
            options: ['全部', '表格', '表单', '通用', '布局', '导航', '数据录入', '数据展示', '反馈', '其他'],
            current: '全部'
        };
    },
    watch: {
        value: function(val) {
            this.current = val;
        }
    },
    created () {
        this.current = this.value;
    },
    methods: {
        changeHandler (e) {
            this.$emit('input', e.target.value);
            this.$emit('change', e.target.value);
        }
    }
};
</script>

<style lang="less">
.my-radio-group {
    display: flex;
    .my-radio {
        margin-right: 10px;
        input {
            opacity: 0;
            width: 0;
            height: 0;
            -webkit-appearance: none;
            &:checked+label{
                background: @blue;
                color: #fff;
            }
        }
        label {
            padding: 0 8px;
            height: 24px;
            line-height: 24px;
            border-radius: 3px;
            font-size: 13px;
            display: inline-block;
        }
    }
}
</style>
