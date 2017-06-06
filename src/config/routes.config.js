
/* Common pages */
import { YamDefaultPage } from '@xhs/yam-layout'

import Login from '../containers/Login/Login'
import ForgotPassword from '../containers/Login/ForgotPassword'
import ResetPassword from '../containers/Login/ResetPassword'

import AppLayout from '../containers/App/AppLayout'


/* Application pages */
import TopicList from '../containers/Topic/List'


const needLoginMeta = {
  auth: {}
}

/* routes will register to vue-router */
const routes = [
  {
    path: '/marionette/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/marionette/forgot_password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/marionette/reset_password',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/marionette',
    component: AppLayout,
    meta: needLoginMeta,
    children: [
      {
        path: '',
        redirect: 'topics'
      },

      /* Topic */
      {
        path: 'topics',
        name: 'TopicList',
        component: TopicList
      },

      /* ------------------------------- */
      {
        path: '*',
        name: 'NotFound',
        meta: needLoginMeta,
        component: YamDefaultPage.NotFound
      }
    ]
  }
]

/* menus will register to side menu */
const menus = [
  {
    name: 'Topics',
    route: { name: 'TopicList' }
  }
]

export default routes

export {
  routes, menus
}
