<template>
  <yam-login
    :name="appName"
    :submit="login"></yam-login>
</template>

<script>
/* schema or config */
import { APP_NAME } from '../../utils/common'

/* components */
import { YamLogin } from '@xhs/yam-layout'

/* main */
export default {
  name: 'LoginContainer',
  components: {
    YamLogin
  },
  data: () => ({
    appName: APP_NAME
  }),
  methods: {
    login(payload) {
      // the login service is defined on auth.config.js
      return this.$auth.login(payload).then(
        () => this.$router.push('/')
      )
    }
  }
}
</script>
