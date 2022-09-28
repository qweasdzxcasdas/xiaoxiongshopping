
//引入vue和路由
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用路由
Vue.use(VueRouter)
//引入路由组件
import Home from '../pages/Home'
import login from '../pages/login'
import register from '../pages/register'
import Search from '../pages/Search'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import store from '../store'
import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
import PaySucess from '../pages/PaySuccess'

import myOrder from '../pages/Center/myOrder'
import groupOrder from '../pages/Center/groupOrder'
// import Logins from '../pages/Logins'
// import Registers from '../pages/Registers'
//重写push和replace
//第一个参数：告诉原来的push方法 往哪里跳（传递哪些参数）
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//call||apply区别
//相同点：都可以调用函数一次 都可以篡改上下文一次
//不同点：call与apply传递参数：call用逗号隔开 apply方法执行，传递数组
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}

VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}
//配置路由
let router= new VueRouter({
    routes:[
        {
            path:'/center',
            component:()=>import('../pages/Center'),
            meta:{show:true},
            redirect: "/center/myorder",
            children:[
                {
                    path:'myorder',
                    component:myOrder,
                    
                },
                {
                    path:'grouporder',
                    component:groupOrder,
                    
                }
            ]
        },
        {
            path:'/paysucess',
            component:PaySucess,
            meta:{show:true},
        },
        {
            path:'/pay',
            component:Pay,
            meta:{show:true},
            beforeEnter: (to, from, next) => {
                if(from.path=='/trade'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            path:'/trade',
            component:Trade,
            meta:{show:true},
            beforeEnter: (to, from, next) => {
                if(from.path=='/shopcart'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        
        {
            path:'/shopcart',
            component:ShopCart,
            meta:{show:true},
        },
        {
            path:'/addCartSuccess',
            name:'addCartSuccess',
            component:AddCartSuccess,
            meta:{show:true},
        },
        {
            path:'/detail/:skuId',
            component:Detail,
            meta:{show:true},
        },
        {
            path:'/',
            redirect: "/home"
        },
        {
            path:'/home',
            component:Home,
            meta:{show:true},
            
        },
        {
            path:'/login',
            component:login,
            meta:{show:false}
        },
        {
            path:'/register',
            component:register,
            meta:{show:false}
        },
        {
            path:'/search/:keyword?',
            component:Search,
            meta:{show:true},
            name:'search'
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
      },
})

//路由前置守卫
router.beforeEach(async (to,from,next)=>{
    let token =store.state.user.token
    let name = store.state.user.userinfo.name
    let uuid = localStorage.getItem('UUIDTOKEN')
    //用户登入
    if(token||uuid){
        //如果用户登入了想去login
        if(to.path=='/login'){
            next('/home')
        }else{
            //如果有用户名
            if(name){
                next()
            }else{
                //没有用户名 先获取用户信息在放行
                try {
                    await store.dispatch('getUserinfo')
                    next()
                } catch (error) {
                    //token过期 删除信息
                    await store.dispatch('quitUser')
                    next()
                }
            }
        }
    }else{
        //如果没有登入
        if(to.path.indexOf('/center')!=-1 || to.path.indexOf('pay')!=-1 || to.path.indexOf('/trade')!=-1 ||to.path=='/shopcart'){
            next('/login?redirect='+to.path)
        }else{
            next()
        }
    }
})

export default router