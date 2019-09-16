/**
 * 直接更新 state 的多个方法对象*/
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  GET_LONG,
  RECEIVE_USER_INFO,
  LOGOUT, RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_INFO,
  UPDATE_FOOD_COUNT
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

  [UPDATE_FOOD_COUNT](state,{bool,food}){
    if(bool){
      if(food.count>0){
        food.count -= 1
        if(food.count===0){
          //将food移除
          state.cartFoods.splice(state.cartFoods.indexOf (food), 1)
        }
      }
    }else{
      if(food.count){
        food.count += 1
      }else{
        // 如果这么增加属性 将不会有数据绑定
        //需要使用下面这种方式
        Vue.set(food,'count', 1)
        //将 food 添加到 cartcontrol
        state.cartFoods.push(food)
      }
    }
  }
}
