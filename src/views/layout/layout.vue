<template>
  <el-container>
    <el-header style="padding: 0px">
      <fcheader></fcheader>
    </el-header>
    <el-container>
      <el-aside width="200px"><fcmenu></fcmenu></el-aside>
      <el-main>
        <el-tabs v-model="activetab" @tab-remove="removeTab" @tab-click="selectedTab">
          <el-tab-pane
            v-for="item in tabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            :closable="item.name !== 'home'"
          >
          </el-tab-pane>
        </el-tabs>
        <keep-alive><router-view></router-view></keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { useRouter } from 'vue-router'
import store from '@/store'
import fcheader from '../../components/fcheader.vue'
import fcmenu from '../../components/fcmenu.vue'

export default defineComponent({
  name: 'Fcapp',
  components: {
    fcheader,
    fcmenu
  },
  computed: {
    ...mapState('system', {
      tabs: (state: any) => {
        return state.tabs
      },
      menus: (state: any) => {
        return state.sysmenus
      },
      activetab: (state: any) => {
        return state.activetab
      }
    })
  },
  data: () => {
    return {
      activetab: 'home'
    }
  },
  setup: () => {
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
    selectedTab (tab: any) {
      console.log(tab.props.name)
      store.dispatch('system/activetab', tab.props.name)
      this.navigate(this.findMenu(tab.props.name))
    },
    removeTab (tabname: string) {
      store.dispatch('system/removetab', tabname)
    },
    findMenu (menuId: string) {
      let result = {}
      function getMenu (menus: any[]) {
        for (let i = 0; i < menus.length; i++) {
          const m: any = menus[i]
          if (m.MENUID === menuId) {
            result = { ...m }
            break
          } else if (m.P_CHILDMENUS && m.P_CHILDMENUS.length !== 0) {
            getMenu(m.P_CHILDMENUS)
          }
        }
      }
      getMenu(this.menus)
      return result
    }
  }
})
</script>

<style>
.el-header {
  padding: 0px;
}
</style>
