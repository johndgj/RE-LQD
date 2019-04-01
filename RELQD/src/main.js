// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './link'
import Cookies from 'js-cookie'

import headerView from './components/headerView'
import footerView from './components/footerView'
import agreement from './components/agreement'

import OfferingsLeft from './components/OfferingsLeft'
import OfferingsSearch from './components/OfferingsSearch'

/* view component */
Vue.component(headerView.name, headerView)
Vue.component(footerView.name, footerView)
Vue.component(agreement.name, agreement)
Vue.component(OfferingsLeft.name, OfferingsLeft)
Vue.component(OfferingsSearch.name, OfferingsSearch)


import { Button, Progress, Scrollbar, Tooltip, Dialog, Checkbox,Upload } from 'element-ui'

Vue.use(Button)
Vue.use(Progress)
Vue.use(Scrollbar)
Vue.use(Tooltip)
Vue.use(Dialog)
Vue.use(Checkbox)
Vue.use(Upload)

Vue.prototype.$http = axios

Vue.config.productionTip = false

//监听URL变化 ：判断是否登录
router.beforeEach(({ meta, path }, from, next) => {
  var _this = this;
  //权限控制
  if (meta.role.length == 0) { // 在免登录白名单，直接进入
    next();
  } else {
    if (Cookies.get('token')) { // 判断是否有token
      next();
    } else {
      next('/home'); // 否则全部重定向到首页
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
