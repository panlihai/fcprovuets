<template>
  <el-menu
    :uniqueOpened="true"
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <template v-for="menu of value" :key="menu.MENUID">
      <!-- 第一层 -->
      <el-submenu :index="menu.MENUID" v-if="menu.HASCHILD === 'Y'">
        <template #title>
          <i class="el-icon-menu"></i>
          <span>{{ menu.MENUNAME }}</span>
        </template>
        <template v-for="cmenu of menu.P_CHILDMENUS" :key="cmenu.MENUID"
          :index="cmenu.MENUID">
          <el-menu-item :index="cmenu.MENUID" v-if="cmenu.MENUTYPE!=='MENU'" @click="navigate(cmenu)">
            <i class="el-icon-location"></i>
            <template #title>{{ cmenu.MENUNAME }}</template>
          </el-menu-item>
          <el-submenu v-if="cmenu.MENUTYPE==='MENU'">
          <!-- 第二层 -->
            <template #title>{{ cmenu.MENUNAME }}</template>
            <template v-for="ccmenu of cmenu.P_CHILDMENUS" :key="ccmenu.MENUID">
              <el-submenu :index="ccmenu.MENUID" v-if="ccmenu.HASCHILD === 'Y'">
                <!-- 第三层 -->
                <template #title>
                  <i class="el-icon-menu"></i>
                  <span>{{ ccmenu.MENUNAME }}</span>
                </template>
                <template v-if="ccmenu.MENUTYPE==='MENU'">
                  <el-submenu
                    v-for="cccmenu of ccmenu.P_CHILDMENUS"
                    :key="cccmenu.MENUID"
                    :index="cccmenu.MENUID"
                  >
                    <template #title v-if="cccmenu.MENUTYPE==='MENU'">{{ cccmenu.MENUNAME }}</template>
                    <el-menu-item  @click="navigate(cccmenu)" v-if="cccmenu.MENUTYPE!=='MENU'">{{ cccmenu.MENUNAME }}</el-menu-item>
                  </el-submenu>
                </template>
                <el-menu-item :index="ccmenu.MENUID"  @click="navigate(ccmenu)" v-if="ccmenu.MENUTYPE!=='MENU'">
                  <i class="el-icon-location"></i>
                  <template #title>{{ ccmenu.MENUNAME }}</template>
                </el-menu-item>
              </el-submenu>
            </template>
          </el-submenu>
        </template>
      </el-submenu>
      <el-menu-item :index="menu.MENUID" v-else  @click="navigate(menu)">
        <i class="el-icon-location"></i>
        <template #title>{{ menu.MENUNAME }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { mapState } from 'vuex'
import store from '@/store'
export interface Menu {
  id?: string;
  menuCode: string;
  menuName: string;
  router?: string;
  icon?: string;
}
export default defineComponent({
  name: 'fcmenu',
  computed: {
    ...mapState('system', {
      value: (state: any) => state.sysmenus
    })
  },
  setup () {
    const router = useRouter()
    const navigate = (menu: any) => {
      store.dispatch('system/tabspush', {
        title: menu.MENUNAME,
        name: menu.MENUID,
        content: '',
        meta: { ...menu }
      })
      if (router) {
        router.push({
          name: 'listinfo',
          params: menu
        })
      }
    }
    return {
      navigate
    }
  },
  methods: {
  }
})
</script>
