/**
 * 包含多个基于 state 的 getter 计算属性的对象
 * */


export default {
  totalCount(state) {
    //reduce 为数组中的每一个元素依次执行回调函数,不包括数组中被删除或从未被赋值的元素，接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 reduce 的数组。
    return state.cartFoods.reduce((preTotal, food) => preTotal  + food.count,0)
  },
  totalPrice(state) {
    //reduce 为数组中的每一个元素依次执行回调函数,不包括数组中被删除或从未被赋值的元素，接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 reduce 的数组。
    return state.cartFoods.reduce((preTotal, food) => preTotal  + food.count*food.price , 0)
  }

}
