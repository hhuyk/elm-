const axios = require('axios')
axios.defaults.withCredentials = true

module.exports = function ajax(url='',data = {},type = 'GET') {
   return new Promise(((resolve, reject) => {
     let promise
     if(type === 'GET'){
       let datastr = ''
       Object.keys(data).forEach(key =>{
         datastr +=key + '=' + data[key] + '&'
       })
       if(datastr !== ''){
         datastr = datastr.substr(0,datastr.lastIndexOf('&') )
         url = url + '?' + datastr
       }
     //发送 get 请求
       promise =axios.get(url)
     }
     else{
       promise =axios.post(url,data)
     }

     promise.then( res =>{
       resolve(res.data)
     })
       .catch(error =>{
         reject(error)
       })



   }))
}
