<template>
  <div class="main-wrapper" :class="{'--shrink': isMenuShrink}">
    <yam-side-menu
      class="side-menu"
      :shrink="isMenuShrink"
      :app-name="appName"
      :items="sideMenu.items"
      :logo-src="sideMenu.logoSrc"
      :logo-shrink-src="sideMenu.logoShrinkSrc"
    ></yam-side-menu>

    <yam-top-menu
      class="top-menu"
      @toggle-side-menu="handleToogleSideMenu"
      @reset-password="handleResetPassword"
      @logout="handleLogout"
      :user="user"
      :show-search-item="false"
      :show-help-item="false"
      :show-language-switch="false"
    ></yam-top-menu>

    <router-view></router-view>

  </div>
</template>

<script>
import { YamTopMenu, YamSideMenu } from '@xhs/yam-layout'

import { menus } from '../../config/routes.config'
import { APP_NAME } from '../../utils/common'

import logoSrc from './assets/logo-noar.png'
import logoShrinkSrc from './assets/logo-shrink-noar.png'

export default {
  name: 'AppLayout',

  components: {
    YamTopMenu,
    YamSideMenu
  },

  data: () => ({
    appName: APP_NAME,
    isMenuShrink: false
  }),

  methods: {
    handleToogleSideMenu() {
      this.isMenuShrink = !this.isMenuShrink
    },
    handleResetPassword() {
      this.$router.push({
        name: 'ResetPassword'
      })
    },
    handleLogout() {
      this.$auth.logout()
      this.$router.push({
        name: 'Login'
      })
    }
  },
  computed: {
    sideMenu: () => ({
      logoSrc,
      logoShrinkSrc,
      items: menus
    }),
    user() {
      // if router meta has "isLogin" permission, the userInfo will be assigned automatically
      const userInfo = this.$auth.userInfo

      if (!userInfo) {
        return {}
      }

      return {
        name: userInfo.nickname,
        headPicture: userInfo.image
      }
    }
  }
}
</script>
