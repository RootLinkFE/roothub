<!--
 * @Author: mingxing.zhong
 * @Date: 2021-07-01 17:51:37
 * @Description: 复制弹窗
-->

<template>
  <Modal :title="title" :value="value" @on-visible-change="onVisibleChange" footer-hide>
    <template v-if="type === 'materials'">
      <p>1、安装<a href="https://www.npmjs.com/package/@roothub/cli">@roothub/cli</a>；（如已安装请忽略）</p>
      <pre style="color: #cccccc">npm i @roothub/cli -g</pre>
      <p>
        2、复制命令行到控制台中执行。
      </p>
      <pre style="color: #cccccc">{{ text }}</pre>

      <!-- <Input style="margin: 16px 0;" disabled :value="text">
      <Button slot="append">复制</Button>
    </Input> -->
    </template>
    <template v-else>
      <div v-for="(t, index) in texts" :key="index">
        <p>
          {{ t.title }}
        </p>
        <pre style="color: #cccccc">{{ t.text }}</pre>
      </div>
    </template>
  </Modal>
</template>

<script>
export default {
  name: 'TextCopyModal',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    title: { type: String, default: '代码下载' },
    value: { type: Boolean, default: false },
    text: { type: String, default: '' },
    // 扩展
    type: { type: String, default: 'materials' },
    texts: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    onVisibleChange(value) {
      console.log(value)
      this.$emit('change', value)
    },
    onTextCopy(text) {
      console.log(text)
    }
  }
}
</script>

<style></style>
