<template>
<div>
  <section class="msite">
    <!--首页头部-->

    <header-top :title="address.name">
       <router-link class="header_search" slot="left" to="/search">
            <i class="iconfont iconsousuo"></i>
          </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id?'/userinfo':'/login'">
            <span class="header_login_text" v-if=" !userInfo._id ">登录|注册</span>
            <span class="header_login_text" v-else>
              <i class="iconfont iconren"></i>
            </span>
      </router-link>
    </header-top>
    <!--首页导航-->
    <nav class="msite_nav">
      <div v-if="categorys.length" class="swiper-container" >
        <div class="swiper-wrapper" >
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key = index >
            <a href="javascript:" class="link_to_food" v-for="(category, index2) in categorys" :key =index2>
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + category.image_url">
              </div>
              <span> {{category.title }}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
<!--        <div class="swiper-button-prev"></div>-->
<!--        <div class="swiper-button-next"></div>-->
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <shop-list  />
  </section>
</div>
</template>

<script>
  import swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import {mapState} from 'vuex'



  import HeaderTop from '@/components/HeaderTop/HeaderTop'
  import ShopList from '@/components/ShopList/ShopList'


  export default {
    components: {
      HeaderTop,
      ShopList
    },
    mounted() {
      this.$store.dispatch('getcategorys')
      this.$store.dispatch('getShops')



    },
    computed:{
      ...mapState (['address','userInfo','categorys','shops']),
      //根据一维数组生成二维数组 ,小数组的最大个数是8
      categorysArr(){
        const {categorys} =this
        let arr = []
        let minArr = []
        categorys.forEach(c =>{
          if(minArr.length ===8){
            minArr =[]
          }
          if(minArr.length===0 ){
            arr.push(minArr)
          }
          minArr.push(c)
        })
        return arr
      }
    },
    watch:{
      categorys(value){
        //由于 dispatch 是一个异步的，所以需要在他执行之后 在生成 swiper实例  所以用到$ nextTick函数
        this.$nextTick(()=>{

          //将回调延迟到下一次dom更新之后执行，在修改数据之后立即执行
          //此时实例挂在完成 ，并且 data 渲染
          new swiper('.swiper-container', {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            scrollbar: {
              el: '.swiper-scrollbar',
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
  &.msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774

</style>
