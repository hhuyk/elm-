const express = require('express')
const router = express.Router()
// const md5 = require('blueimp-md5')
const models = require('../database/models')
const UserModel = models.getModel('user')
const _filter = {'pwd': 0, '__v': 0} // 查询时过滤掉
const sms_util = require('../util/sendCode')
const users = {}
const ajax = require('../api/req')

var svgCaptcha = require('svg-captcha')


// 密码登录，由于的登录即注册，所以没有注册api


router.post('/login_pwd',(req,res) =>{
  const name = req.body.name
  // const pwd = md5(req.body.pwd)
  const pwd = req.body.pwd
  //验证码属性
  const captcha = req.body.captcha.toLowerCase()
  console.log('/login_pwd',name,pwd,captcha,req.session)
  // if(captcha !== req.session.captcha ){
  //   return res.send({code :1 ,msg:'验证码不正确'})
  // }
  delete req.session.captcha

  UserModel.findOne({name},(err,user)=>{
    if(user){
      console.log('找到了user', user)
      if(user.pwd !== pwd ){
        res.send({code:1,msg:'用户名或者验证码不正确'})
      }
      else {
        req.session.userid = user._id
        res.send({code: 0, data: {_id: user._id, name: user.name, phone: user.phone}})
      }
    }
    else{
      const userModel = new UserModel({name,pwd})
      userModel.save((err,user)=>{
        req.session.userid = user._id
        const data = { _id :user._id,name: user.name}
        res.send({code:0,data})
      })
    }

  })
})

/*图片验证码*/

router.get('/captcha',(req,res)=>{
  var captcha = svgCaptcha.create({
    ignoreChars:'0O1l',
    noise:2,
    color:true
  })
  req.session.captcha =captcha.text.toLowerCase()
  // res.status(200).send(captcha.data )
  res.type('svg')
  res.send(captcha.data )
})


//根据经维度位置获取位置信息
router.get('/position/:geohash', function (req, res) {
  const {geohash} = req.params
  console.log(`http://cangdu.org:8001/v2/pois/${geohash}`)
  ajax(`http://cangdu.org:8001/v2/pois/${geohash}`)
    .then(data => {
      res.send({code: 0, data})
    })
})


// 发送短信验证码
router.get('/sendcode',(req,res,next)=>{
   const phone = req.query.phone
   let code= sms_util.randomCode()
   console.log('发送给指定的手机号')
   sms_util.sendCode(phone,code,(success)=>{
    if(success ){
      users[phone] = code
      res.send({'code':0})
    }
    else {
      res.send({"code":1,msg: '短信验证码发送失败'})
    }
  })
})

//推出登录 删除 session
 router.get('/logout',(req,res)=>{
   console.log(req.session)
   delete req.session.userid
   res.send({code:0})
 })

//根据会话登录
 router.get('/userinfo',(req,res)=>{
   const userid = req.session.userid
   // 查询
   UserModel.findOne({_id: userid}, _filter, function (err, user) {
     if (!user) {
       delete req.session.userid
       res.send({code: 1, msg: '请先登陆'})
     } else {
       // 如果有, 返回user
       res.send({code: 0, data: user})
     }
   })
 })

//获取食品分类列表
router.get('/index_category',(req,res)=>{
  const data = require('../data/index_category')
  //模拟数据库操作
  setTimeout(()=>{
    res.send({code:0,data})
  },100)
})


//异步获取商家列表

router.get('/shops/',(req,res)=>{
  // 获取商家 参数使用 req.query 获取
  const latitude = req.query.latitude
  const longitude = req.query.longitude

  const data = require('../data/shops')
   setTimeout(()=>{
     res.send({code:0,data})
   },300)

})

module.exports =router;
