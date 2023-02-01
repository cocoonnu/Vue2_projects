//引入VueRouter
import VueRouter from 'vue-router'

//引入组件
// import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import ShopCart from '@/pages/ShopCart'
import AddCartSuccess from '@/pages/AddCartSuccess'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import { reqgetUserInfo } from '@/api'
import store from '@/store'


//创建router实例对象
const router = new VueRouter({
    mode: 'history',

    scrollBehavior() {
        return { y: 0, behavior: 'smooth'}
    },

	routes:[
		{
            name: 'search',
            path: '/search',
			component: Search,
            props(route) {
                return {
                    value: route.query.value, 
                    dataname: route.query.dataname,
                }
            }
		},
		{
			path: '/home',
			component: () => import('@/pages/Home')
		},
        {
            path: '/login',
            component: Login,
            meta: { closeFooter: true }
        },
        {
            path: '/register',
            component: Register,
            meta: { closeFooter: true }
        },
        {
            path: '/detail/:goodId',
            component: Detail,
        },
        {
            path: '/addCartSuccess',
            name: 'addCartSuccess',
            component: AddCartSuccess
        },
        {
            name: 'shopcart',
            path: '/shopcart',
            component: ShopCart
        },
        {
            path: '/trade',
            component: Trade,
        },
        {
            path: '/pay',
            component: Pay
        },

        // 设置首页路由
        {   
            path:'/',
            redirect: '/home'
        }
	]
})

router.beforeEach(function(to,from,next) {

    if(to.path == '/shopcart') {
    
        // 权限规则
        if(store.state.user.userInfo) {
            next();
        } else {
            alert('请登录');
            next('/login');
        }
    
    } else {
        next();
    }
}) 


// 使用编程式路由实现跳转的时候，多次执行报错问题处理
let originPush=VueRouter.prototype.push;
let originReplace=VueRouter.prototype.replace;
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}

//暴露router
export default router