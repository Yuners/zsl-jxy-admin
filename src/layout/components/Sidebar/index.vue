<template>
  <div :class="{'has-logo':showLogo}">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import JinSwimRouter from '@/router/modules/jinSwim'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      let name = this.$route.matched[0].name
      let routeList = this.$router.options.routes
      switch (name) {
        case "jinSwim":
          let jinSwim = routeList.filter( item => {
            return item.name == name
          })
          return jinSwim[0].children
          break
        case 'infoManage':
          let infoManage = routeList.filter( item => {
            return item.name == name
          })
          return infoManage[0].children
          break
        case 'sysManage':
          let sysManage = routeList.filter( item => {
            return item.name == name
          })
          return sysManage[0].children
          break
      }
      // return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path, redirectedFrom } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      if (route.redirectedFrom){
        return redirectedFrom
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
