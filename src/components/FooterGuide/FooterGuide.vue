<template>
  <footer class="footer_guide">
    <router-link to="/msite" class="guide_item " :class="{on :'/msite' === $route.path}">
      <span class="item_icon">
        <i class="iconfont iconicon-test"></i>
      </span>
      <span>外卖</span>
    </router-link>
    <router-link to="/search" class="guide_item" :class="{on :'/search' === $route.path}">
      <span class="item_icon">
        <i class="iconfont iconsousuo"></i>
      </span>
      <span>搜索</span>
    </router-link>
    <router-link to="/order" class="guide_item" :class="{on :'/order' === $route.path}">
      <span class="item_icon">
        <i class="iconfont icondingdan"></i>
      </span>
    <span>订单</span>
  </router-link>
    <router-link to="/profile" class="guide_item" :class="{on :'/profile' === $route.path}">
      <span class="item_icon">
        <i class="iconfont iconwodedangxuan"></i>
      </span>
      <span>我的</span>
    </router-link>

  </footer>

</template>

<script>
    export default {}

</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixins.styl"
.footer_guide
  top-border-1px(#e4e4e4)
  position fixed
  z-index 100
  left 0
  right 0
  bottom 0
  background-color #fff
  width 100%
  height 50px
  display flex
  .guide_item
    text-decoration none
    display flex
    flex 1
    text-align center
    flex-direction column
    align-items center
    margin 5px
    color #999999
    &.on
      color #02a774
    span
      font-size 12px
      margin-top 2px
      margin-bottom 2px
      .iconfont
        font-size 22px









</style>
