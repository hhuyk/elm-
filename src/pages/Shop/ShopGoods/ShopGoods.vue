<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <!--current-->
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
              :class="{current: index===currentIndex}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
<!--加上 ref 参数 这样在 进行 dom 操作的时候 可以迅速定位到这里-->
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>

<script>

  import BScroll from 'better-scroll'
  import Food from '../../../components/Food/Food'
  import CartControl from '../../../components/CartControl/CartControl'
  import ShopCart from '../../../components/ShopCart/ShopCart'

  import { mapState} from 'vuex'
    export default {
      data(){
        return {
          //food 需要在这里定义  不然无法传出
          scrollY:0, // 右侧滑动y轴坐标
          tops:[],//所有 li top 组成的数组
          food:{},//需要显示的 food
        }
      },
      mounted() {
      this.$store.dispatch('getShopGoods',()=>{
       this.$nextTick( ()=>{ //列表数据显示以后
         //由于这个滑块 需要在数据接受之后创建，所以我们需要
         //
         this._initSrolly()
         this._initTops()
       })
      })

      },
      computed : {
        ...mapState(['goods']),

        currentIndex(){
          // 当前分类
           // 由于滑动的过程中  scrolly 在实时变化 ，所以 根据这一点
          // 可以计算出  当前列表的下标
          const { scrollY , tops} = this
          const index = tops.findIndex((top,index)=>{
            return scrollY >= top && scrollY < tops[index + 1]
          })
          return index
        }
      },
      components :{
        Food,
        CartControl,
        ShopCart

      },
      methods:{
        clickMenuItem(index){
          // console.log(index)
          const y = - this.tops[index]
          //由于 scrolly 决定 currentindex
          this.scrollY = -y
          this.foodScroll.scrollTo(0,y,300)

        },
        showFood(food){
          //设置 food  显示 food 组件
            this.food = food
          //通过 ref 标签 找到 对象  然后调动其方法
          this.$refs.food.toggleShow()
          // this.$emit('toggleShow') 这个方法在于 向父组件发送一个事件 ，然后父组件来监听这个 事件  以达到传值的效果
        },
        //一般事件相关的函数 加上下划线
        _initSrolly(){
          new BScroll('.menu-wrapper',{
            click:true,

          })
          this.foodScroll =  new BScroll('.foods-wrapper',{
            click:true,
            probeType: 2,//惯性滑动不会触发事件
          })

          // ...... 详见配置项
          //右侧列表绑定scroll 监听
          this.foodScroll.on('scroll',({x,y})=>{
            // console.log(x,y)
            this.scrollY  = Math.abs(y)

          })
          //解决惯性滑动问题。  也可以使用 probeType 为 3
          this.foodScroll.on('scrollEnd',({x,y})=>{
            // console.log(x,y)
            this.scrollY  = Math.abs(y)

          })

          //
        },
        _initTops(){
          //找到所有的 li
           //ref 属性
          let tops = []
          let top = 0
          tops.push(top)
          const lis = this.$refs.foodsUl.children
          // console.log(lis)
          Array.prototype.slice.call(lis) .forEach( li => {
            top +=li.clientHeight
            tops.push(top)
          })
          this.tops = tops
        }
      }

    }

</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

