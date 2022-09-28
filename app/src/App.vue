<template>
  <div id="app">
    <HeaDer></HeaDer>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import HeaDer from './components/HeaDer'
import Footer from './components/Footer'

export default{
  components:{
    HeaDer,Footer
  },
  mounted() {
    //通知vuex发送请求，获取数据存储与仓库之中
    this.$store.dispatch("home/categoryList", "categoryList");
    
  },
}

</script>

<style>

</style>
