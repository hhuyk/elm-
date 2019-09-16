/** 使用mockjs
 * 提供数据接口
 * */

import Mock from 'mockjs'
import data from '../mock/data'

Mock.mock('/goods',{code:0 ,data:data.goods})
Mock.mock('/ratings',{code:0 ,data:data.ratings})
Mock.mock('/info',{code:0 ,data:data.info})


// 不需要向外暴露
//只需要运行该程序，就可以拦截到ajax 请求
