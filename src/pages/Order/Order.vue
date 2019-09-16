<template>
  <div>
    <section class="order">
      <header-top title="订单"></header-top>
      <section class="order_no_login" v-if="!userInfo._id">
        <img src="./images/order/person.png">
        <h3>登录后查看外卖订单</h3>
        <router-link to="/login">立即登陆</router-link>
      </section>
      <section v-else>
        <div>
          订单列表
        </div>
      </section>
    </section>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import HeaderTop from '@/components/HeaderTop/HeaderTop'

  export default {
    components: {
      HeaderTop
    },
    mounted(){
    } ,
    computed:{
      ...mapState(['userInfo'])
    }
  }

</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixins.styl"

  &.order  //订单
    width 100%
    .order_no_login
      padding-top 140px
      width 60%
      margin 0 auto
      text-align center
      >img
        display block
        width 100%
        height 30%
      >h3
        padding 10px 0
        font-size 17px
        color #6a6a6a
      >a
        display inline-block
        background #02a774
        font-size 14px
        color #fff
        border 0
        outline none
        border-radius 5px
        padding 10px 20px

</style>
