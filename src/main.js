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
// import ElementUI from 'element-ui';
// Vue.use(ElementUI);
import { Pagination } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Pagination);



// 引入 animate.css
import animated  from 'animate.css'
Vue.use(animated)

// 引入 mockServe
import '@/mock/mockServe'

// 引入 swiper.css
import "swiper/css/swiper.css";

Vue.config.productionTip = false

new Vue({
    render: h => h(App),

    router,

    store,

    // 安装全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this 
    },
}).$mount('#app')
