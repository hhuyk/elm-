<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont iconjianhao" v-if="food.count" @click.stop="updateFoodCount(true)"></div>
<!--prevent  方法是阻止默认事件-->
    </transition>
    <div class="cart-count" v-if="food.count"  >{{food.count}}</div>
    <div class="iconfont iconjiahao"  @click.stop="updateFoodCount(false)"></div>
  </div>
</template>

<script>
    export default {
      props :{
        food:{}
      }
      // 改变数据不可以在这里直接改变, 应该去store
      ,methods :{
        updateFoodCount(bool) {
        this.$store.dispatch('updateFoodCount',{bool , food: this.food})
        }
      },

    }

</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .iconjianhao
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .iconjiahao
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>
