//此模块用于向手机发送验证码
const md5 = require('blueimp-md5')
const moment = require('moment')
const Base64 = require('js-base64').Base64
const request = require('request')

//生成指定长度随机数
function randomCode(){
  return Math.floor(Math.random()*(9999-1000))+1000

}
exports.randomCode = randomCode
function sendCode(phone, code, callback) {
    const ACCOUNT_SID = '8aaf07086d05d00c016d13ca3569050c'
    const AUTH_TOKEN = 'f0cfa628448b4095ab97ae2bce5b98da'
    const Rest_URL = 'https://app.cloopen.com:8883'
    const AppID = '8aaf07086d05d00c016d13ca35c10513'

  // var sigParameter = '';
    var time = moment().format('YYYYMMDDHHmmss');
    var sigParameter = md5(ACCOUNT_SID+AUTH_TOKEN+time);
    var url = Rest_URL+'/2013-12-26/Accounts/'+ACCOUNT_SID+'/SMS/TemplateSMS?sig='+sigParameter;

    var body = {
    to : phone,
    appId : AppID,
    templateId : '1',
    "datas":[code,"1"]
  }
  var authorization = ACCOUNT_SID + ':' + time;
  authorization = Base64.encode(authorization);
  var headers = {
    'Accept' :'application/json',
    'Content-Type' :'application/json;charset=utf-8',
    'Content-Length': JSON.stringify(body).length+'',
    'Authorization' : authorization
  }
  request({
    method : 'POST',
    url : url,
    headers : headers,
    body : body,
    json : true
  }, function (error, response, body) {
    console.log(error);
    callback(body.statusCode==='000000');
    // callback(true);
  });

}
exports.sendCode = sendCode
