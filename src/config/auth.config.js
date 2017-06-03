import {
  login,
  getUserInfo,
  logout
} from '../services/user'

// provide user releated services, so that it can handle "isLogin" permission
const services = {
  login,
  logout,
  getUserInfo
}

/* ------------------------------ */

// for more detail, please refer <https://gitlab.xiaohongshu.com/formula/launcher/tree/master/src/auth>
export default {
  services
}
