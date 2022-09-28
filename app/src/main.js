import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from './router/index'
//引入全局组件
import typeNav from './components/typeNav'
import Carousel from './components/Carousel'
import pagination from './components/pagination'
// import { reqCat } from './api'
// reqCat()
//引入vuex
import store from './store'
//第一个参数全局组件的名字 第二个参数 那一组件
//引用mockServe.js
import './mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'
import * as API from './api'
//引入elementui
import {MessageBox} from 'element-ui';

//引入校验插件
import '@/Puglia/validate'

Vue.component(MessageBox.name,MessageBox)

Vue.component(typeNav.name,typeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(pagination.name,pagination)
Vue.config.productionTip = false
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  },
  //使用路由
  router,
  store,
}).$mount('#app')
