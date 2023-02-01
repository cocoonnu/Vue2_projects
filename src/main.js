import Vue from 'vue'
import App from './App.vue'

// 注册路由
import VueRouter from 'vue-router'
import router from './router'
Vue.use(VueRouter)

// 注册 vuex
import store from './store'

// 注册全局组件
import TypeNav from '@/components/TypeNav.vue'
import Carousel from '@/components/Carousel'
import MyPagination from '@/components/MyPagination.vue'
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(MyPagination.name,MyPagination)

// 引入 ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入 mockServe
import '@/mock/mockServe'

// 引入 swiper.css
import "swiper/css/swiper.css";

// 引入 api 接口
import * as api from '@/api'

// 使用图片加载
import VueLazyload from 'vue-lazyload'
import loadimage from '@/assets/loading.gif'

Vue.use(VueLazyload, {
    loading: loadimage,
})

Vue.config.productionTip = false

new Vue({
    render: h => h(App),

    // 插件
    router,
    store,

    // 安装全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$api = api;
    },
}).$mount('#app')
