<template>
  <yam-forgot-password
    :name="appName"
    :submit="forgotPassword"></yam-forgot-password>
</template>

<script>
/* schema or config */
import { APP_NAME } from '../../utils/common'

/* services or stores */
import { forgotPassword } from '../../services/user'

/* components */
import { YamForgotPassword } from '@xhs/yam-layout'

/* main */
export default {
  name: 'ForgotPasswordContainer',
  components: {
    YamForgotPassword
  },
  data: () => ({
    appName: APP_NAME
  }),
  methods: {
    forgotPassword(payload) {
      return forgotPassword(payload)
    }
  }
}
</script>
