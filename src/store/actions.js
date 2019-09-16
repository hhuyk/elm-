/**
 * 间接更新 ，通过 mutations */


import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  GET_LONG,
  RECEIVE_USER_INFO,
  LOGOUT,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS
} from './mutation-types'

import { reqAddress ,reqFoodCategorys,reqShops,reqLogout ,reqUserInfo,reqShopGoods ,reqShopRatings ,reqShopInfo } from "../api";


export default {

  //异步获取地址
  async  getAddress({commit,state}){
    //发送异步ajax请求
    const geohash= state.latitude +',' +state.longitude
    const res =  await  reqAddress(geohash)
    if(res.code ===0){
      const address = res.data
      commit(RECEIVE_ADDRESS,{address})
    }
  },

  //异步获取食品分类
  async  getcategorys({commit,state}){
    //发送异步ajax请求
    const res =  await  reqFoodCategorys()
    if(res.code ===0){
      const categorys = res.data
      commit(RECEIVE_CATEGORYS,{categorys} )
    }
  },
  //异步获取商家
  async  getShops({commit,state}){
    //发送异步ajax请求
    const res =  await  reqShops(state.longitude,state.latitude )
    if(res.code ===0){
      const shops = res.data
      commit(RECEIVE_SHOPS,{shops} )
    }
  },
  // 异步获取经纬度
   getLong({commit,state},callback){

        navigator.geolocation.getCurrentPosition( position=>{
         let longitude = position.coords.longitude
         let latitude = position.coords.latitude
         console.log(longitude,latitude)
          commit(GET_LONG,{longitude,latitude   } )
          callback()

        },err =>{
         console.log('获取位置失败')
          callback()
       } )
   },
  //存入用户信息
  recordUser({commit},userInfo){
    //这里定义的参数名必须和 mutation 一致
    commit(RECEIVE_USER_INFO,{userInfo} )
  },
  async logout({commit}){
    const res = await reqLogout()
    if(res.code ===0) {
      commit(LOGOUT)
    }


  },
  //异步获取用户信息
  async getUserInfo({commit}){
    const res= await reqUserInfo()
     if(res.code === 0) {
       const userInfo = res.data
       commit(RECEIVE_USER_INFO,{userInfo} )
     }
},
  async getShopGoods({commit} ,cb){
     const res = await  reqShopGoods()
    if(res.code ===0){
      const goods = res.data
      commit(RECEIVE_GOODS,{goods} )
       cb&&cb()
    }
  },
  async getShopRatings({commit}){
    const res = await  reqShopRatings()
    if(res.code ===0){
      const ratings = res.data
      commit(RECEIVE_RATINGS,{ratings } )
    }
  },
  async getShopInfo({commit}){
    const res = await  reqShopInfo()
    if(res.code ===0){
      const Info = res.data
      commit(RECEIVE_INFO,{Info} )
    }
  }



}
