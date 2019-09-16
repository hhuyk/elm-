/**
 * 直接更新 state 的多个方法对象*/

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  GET_LONG,
  RECEIVE_USER_INFO,
  LOGOUT, RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_INFO
} from './mutation-types'

export default {

  [RECEIVE_ADDRESS](state,{address}){
    state.address = address
  },
  [RECEIVE_CATEGORYS](state,{categorys}){
    state.categorys= categorys
  },
  [RECEIVE_SHOPS](state,{ shops}){
    state.shops = shops
  },
  [GET_LONG](state,{longitude,latitude}){
    state.longitude = longitude
    state.latitude = latitude
  },
  [RECEIVE_USER_INFO](state,{userInfo}){
    state.userInfo = userInfo
  },
  [LOGOUT](state){
    state.userInfo= {}
  },
  [RECEIVE_GOODS ](state,{goods}){
    state.goods = goods
  },
  [RECEIVE_RATINGS ](state,{ratings}){
    state.ratings = ratings
  },
  [RECEIVE_INFO](state,{Info}){
    console.log(Info)
    state.info = Info
  },
}
