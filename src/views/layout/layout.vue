<template>
  <el-container>
    <el-header style="padding: 0px">
      <fcheader></fcheader>
    </el-header>
    <el-container>
      <el-aside width="200px"><fcmenu></fcmenu></el-aside>
      <el-main>
        <keep-alive><router-view></router-view></keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import fcheader from '../../components/fcheader.vue'
import fcmenu from '../../components/fcmenu.vue'

export default defineComponent({
  name: 'Fcapp',
  components: {
    fcheader,
    fcmenu
  },
  data: () => {
    return {
      tabs: [{
        title: '首页',
        name: '1',
        content: 'Tab 1 content'
      }],
      tabIndex: 2
    }
  },
  setup: () => {
    return {}
  }
})
</script>

<style>
.el-header {
  padding: 0px;
}
</style>
