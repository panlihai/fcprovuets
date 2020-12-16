<template>
  <el-container>
    <el-header style="padding:0px">
      <fcheader></fcheader>
    </el-header>
    <el-container>
      <el-aside width="200px"><fcmenu></fcmenu></el-aside>
      <el-main><router-view></router-view></el-main>
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
    return {}
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
