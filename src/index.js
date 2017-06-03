// import style (must setup style plugin in formula.config.js)
import '@xhs/yam-style'
import { uiPlugin } from '@xhs/yam-layout'

// use launcher
import Launcher from '@xhs/launcher'

// application configs
import authConfig from './config/auth.config'
import httpConfig from './config/http.config'
import routesConfig from './config/routes.config'
import storesConfig from './config/stores.config'

/* ----------------------------------------------- */

const app = new Launcher('#app', {
  routes: routesConfig,
  stores: storesConfig,
  http: httpConfig
})

app.use('ui', uiPlugin)
app.use('auth', authConfig)

/* ----------------------------------------------- */

Launcher.http.interceptors.result.use(undefined, err => {
  // global http error handler
  if (err.statusCode === 401) {
    app.router.push({ name: 'Login' })
  } else {
    app.vm.$alert(err.message)
  }

  throw err
})

app.start()

/* ----------------------------------------------- */

export default app
