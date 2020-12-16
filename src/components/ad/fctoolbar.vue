<!--
 * @Description: In User Settings Edit
 * @Author: panlihai
 * @Date: 2020-12-7 14:35:06
 * @LastEditTime: 2020-12-7 14:35:06
 * @LastEditors: panlihai
 -->
<template>
  <div v-if="toolbar">
    <el-button
      v-for="(btn, btnIndex) of toolbar"
      :key="btnIndex"
      @click="toolbarEvent(btn)"
      :icon="btn.btnIcon || ''"
      size="mini"
      >{{ $t(btn.btnName) }}</el-button
    >
  </div>
</template>
<script>
export default {
  name: 'fcToolbar',
  props: {
    toolbar: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 查询条件展开及收起
    toolbarEvent (btn) {
      this.$emit('click', { eventname: btn.btnAct, btn })
    }
  }
}
</script>
