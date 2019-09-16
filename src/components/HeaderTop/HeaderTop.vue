<!-- slot 用法
slot 定义一个插槽 ,用于指定 ,插入在子组件标签内的所有内容将替代子组件的<slot>
如果在没有指定 slot 的情况下，将完全按照 子组件的 样式插入
如果在父组件中 指定子组件的 组件标签时候，且在里面指定了 slot 属性，则该部分内容会替代 子组件中的 slot 标签中的默认内容

-->


<template>
  <header class="header">
    <slot name="left">
    </slot>
    <span class="header_title">
      <span class="header_title_text ellipsis">{{title}}</span>
    </span>
    <slot name="right">
    </slot>
  </header>

</template>

<script>
    export default {
      props: {
        title:String
      },
      computed:{

      }
    }

</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .header
    background-color #02a774
    position fixed
    z-index 100
    left 0
    top 0
    width 100%
    height 45px
    .header_search
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)
      width 10%
      height 50%
      .icon-sousuo
        font-size 25px
        color #fff
    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 50%
      color #fff
      text-align center
      .header_title_text
        font-size 20px
        color #fff
        display block
    .header_login
      font-size 14px
      color #fff
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)
      .header_login_text
        color #fff

</style>
