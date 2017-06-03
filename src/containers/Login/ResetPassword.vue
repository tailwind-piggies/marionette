<template>
  <yam-reset-password
    :name="appName"
    :validateToken="validateToken"
    :submit="updatePassword">
  </yam-reset-password>
</template>

<script>
/* schema or config */
import { APP_NAME } from '../../utils/common'

/* services or stores */
import {
  validateToken,
  resetPassword
} from '../../services/user'

/* components */
import { YamResetPassword } from '@xhs/yam-layout'

/* main */
export default {
  name: 'ResetPasswordContainer',
  components: {
    YamResetPassword
  },
  data: () => ({
    appName: APP_NAME
  }),
  methods: {
    validateToken(payload) {
      return validateToken(payload)
    },
    resetPassword(payload) {
      return resetPassword(payload).then(res => {
        if (res.success) {
          this.$toast({
            type: 'success',
            content: '修改密码成功'
          })
          this.$router.push({
            name: 'Login'
          })
        }
      })
    }
  }
}
</script>
