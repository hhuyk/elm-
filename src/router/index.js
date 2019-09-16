import Vue from 'vue'
import Router from 'vue-router'

import Msite from '../pages/Msite/Msite'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRating from '../pages/Shop/ShopRating/ShopRating'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/msite',
      name: 'Msite',
      component: Msite,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{
        showFooter:false
      }
    },
    {
      path: '/',
      redirect:'/msite',
      meta:{
        showFooter:true
      }

    },
    {
      path: '/shop',
      name:'Shop',
      component :Shop ,
      meta:{
        showFooter:false
      },
      //子路由通过 children 引入
      // path 可以简写
      children :[
        {
          path:'goods',
          // name:ShopGoods,
          component :ShopGoods
        },
        {
          path:'ratings',
          // name:ShopRating,
          component :ShopRating
        },
        {
          path:'info',
          // name:ShopInfo ,
          component :ShopInfo
        },
        {
          path:'',
          redirect :'goods'
        }

      ]

    }
  ]
})
