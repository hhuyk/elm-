<template>
  <div id="app">

    <router-view />
<!--    $route 表示当前路由-->
    <footer-guide v-show="$route.meta.showFooter" />

  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'
  import {mapActions} from 'vuex'
  // import util  from 'util'

  //请求一般在 mounted 里面发
  // import router from './router'
 export default {
    components:{
      FooterGuide
    },
     mounted() {
       // const getLong = util.promisify(this.getLong);
       this.getLong( this.getAddress)
       // this.$store.dispatch('getLong')
       // this.$store.dispatch('getAddress')
       this.getUserInfo()



   },
   methods: {
      ...mapActions(['getAddress','getLong','getUserInfo'])
   }
 }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.app
  width 100%
  height 100%
  background-color #f5f5f5
a
  text-decoration none
</style>
