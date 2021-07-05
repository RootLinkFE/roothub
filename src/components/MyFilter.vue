<template>
  <div class="filter">
    <div class="my-radio-group">
      <div v-for="(item, key) in options" :key="`mf-${key}`" class="my-radio">
        <input
          @change="changeHandler"
          type="radio"
          :id="item"
          :value="item"
          v-model="current"
        /><label :for="item">{{ item }}</label>
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
      default: '筛选',
    },
    value: {
      type: String,
      default: '全部',
    },
  },
  data() {
    return {
      options: [
        '全部',
        'component',
        '表格',
        '表单',
        '通用',
        '布局',
        '导航',
        '数据录入',
        '数据展示',
        '图表',
        '反馈',
        'page',
        'base',
        'ant-design-vue',
        '其他',
      ],
      current: '全部',
    }
  },
  watch: {
    value: function (val) {
      this.current = val
    },
  },
  created() {
    this.current = this.value
  },
  methods: {
    changeHandler(e) {
      this.$emit('input', e.target.value)
      this.$emit('change', e.target.value)
    },
  },
}
</script>

<style lang="less" scoped>
.filter {
  margin-top: 10px;
}
.my-radio-group {
  display: flex;
  flex-wrap: wrap;
  .my-radio {
    margin-right: 10px;
    input {
      opacity: 0;
      width: 0;
      height: 0;
      -webkit-appearance: none;
      &:checked + label {
        background: var(--filter-active-bg);
        color: var(--filter-active-color);
      }
    }
    label {
      cursor: pointer;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 3px;
      font-size: 13px;
      color: var(--filter-color);
      display: inline-block;
    }
  }
}
</style>
