<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">沙雕外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay }" @click="loginWay = true ">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay }" @click="loginWay = false ">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent ="login" >
          <div :class="{on:loginWay }">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" >
              <button :disabled="!rightPhone" class="get_verification"  :class="{right_phone:rightPhone }" @click.prevent='getCode'>{{computeTime >0 ?`${computeTime}s重新发送`:'获取验证码' }}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay }">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" :class="showPwd?'on' :'off'" @click="showPwd = !showPwd  ">
                  <div class="switch_circle" :class="{right: showPwd } "></div>
                  <span class="switch_text">{{showPwd ?'abc':''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" >
                <img class="get_verification" src="http://localhost:3000/captcha" alt="captcha"  @click="changeCaptcha" >
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont iconai207"></i>
      </a>
    </div>
    <alert-tip v-if="showAlert" :alert-text="alertText"   @closeTip="closeTip" />
  </section>
</template>

<script>
  import AlertTip from '../../components/AlertTrip/AlertTip'

  import { reqSendCode,reqSmsLogin,reqPwdLogin  } from '../../api/index'

    export default {

      data(){
        return {
          loginWay:true,// true 代表短信登录，false 代表密码登录
          phone:'',
          computeTime:0,
          showPwd:'true',
          pwd:'',
          code:'',//短信验证码
          name:'',
          captcha:'',
          alertText:'',
          showAlert: false
        }
      },
      computed :{
        rightPhone(){
          return /^1\d{10}$/.test(this.phone)
        }
      },
      methods :{
        //表单验证

        async login(){
          let res
          if(this.loginWay ){ //短信登录
            if( !this.rightPhone ){
              //手机号不正确
              this.showAlert =true
              this.alertText ='手机号不正确'
              return
            }else if(!/^\d{6}$/.test(this.code) ){
              //请输入6位数字验证码
              this.showAlert =true
              this.alertText ='请输入正确验证码'
              return
            }
            //发送短信登录请求
            res= await reqSmsLogin( this.phone ,this.code)

          }
          else{
            //密码登录
            const { name,pwd,captcha} =this
            if(!this.name){
              //必须指定用户名
              this.showAlert =true
              this.alertText ='请输入用户名'
              return

            }else if(!this.pwd ){
              //密码必须指定
              this.showAlert =true
              this.alertText ='请输入密码'
              return

            }
            else if(!this.captcha){
              //必须指定验证码
              this.showAlert =true
              this.alertText ='验证码不正确'
              return

            }
            //发送密码登录请求
             res= await reqPwdLogin ({name,pwd,captcha})

          }

          //这里关闭定时器
          if(this.computeTime ){
            this.computeTime =0
            clearInterval(this.intervalId)
            this.intervalId = null
          }
          //在这里处理结果
          if(res.code===0){
             const user = res.data
            //将user 信息保存到vuex
            //跳转路由
            console.log(user)
            this.$store.dispatch('recordUser',user)
            this.$router.replace('/profile')
          }
          else{
            const msg = res.msg
            this.showAlert =true
            this.alertText =msg
          }
        },
        async  getCode(){
          // this.rightPhone
          //发送短信
          //如果当前 计时器 >0 则不可以计时，反之可以
          if(!this.computeTime ){
            this.computeTime =30
              this.intervalId = setInterval(()=>{
              this.computeTime--
            },1000)
          }
          //发送 ajax 请求
          const res = await  reqSendCode(this.phone)
           if(res.code ===1){
             this.showAlert = true
             this.alertText =res.msg
             if(this.computeTime ){
               this.computeTime =0
               clearInterval(this.intervalId)
               this.intervalId = null
             }
           }
        },
        changeCaptcha(event){
          event.target.src= 'http://localhost:3000/captcha?time=' + Date.now()

        },
        closeTip(){
          this.showAlert = false
          this.alertText =''
        }
      },
      components: {
        AlertTip,
      }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixins.styl"
    .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.right_phone
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 40px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                     transform translateX(25px)

              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 50px
          height 50px
          >.iconfont
            font-size 20px
            color #999



</style>
