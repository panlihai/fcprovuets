<template>
  <el-menu
    :default-active="activeIndex"
    class="fcheader"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1000" style="flex:1;text-align: left;">企业综合管理系统</el-menu-item>
    <el-menu-item :index="index" v-for="(product,index) of sysproducts" :key="index" @click="getMenus(product.PID)">{{product.PNAME}}</el-menu-item>
    <template v-if="user.isLogin">
      <el-submenu index="8999">
        <template #title>我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template #title>选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="9000"><a href="#">个人信息</a></el-menu-item>
      <el-menu-item index="9001"><a href="#">{{user.NAME}}</a></el-menu-item>
      <el-menu-item index="9002"><a href="#/login">退出</a></el-menu-item>
    </template>
  </el-menu>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import store from '@/store'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'fcheader',
  computed: {
    ...mapState('system', {
      sysproducts: (state: any) => state.sysproducts,
      user: (state: any) => {
        return {
          ...state.sysuser,
          isLogin: state.isLogin
        }
      }
    })
  },
  setup: () => {
    return {
      activeIndex: '1'
    }
  },
  created () {
    store.dispatch('system/getProducts').then(result => {
      console.log(result)
      if (result.length !== 0) {
        this.getMenus(result[0].PID)
      }
    })
  },
  methods: {
    getMenus (pid: string) {
      store.dispatch('system/getMenus', pid)
    }
  }
})
</script>
<style>
.fcheader {
  text-align: right;
  display: flex;
  justify-content: flex-end;
}
</style>
