<template>
    <div>
        <!-- 使用三级联动全局组件 -->
        <typeNav/>
        <listContainer/>
        <todayRecommene/>
        <rank/>
        <like/>
        <floor v-for="(list,index) in floorlist" :key="list.id" :next="list" />
        
        <brand/>
    </div>
</template>

<script>
//引入剩余的组件
import listContainer from './listContainer'
import todayRecommene from './todayRecommend'
import rank from './rank'
import like from './like'
import floor from './floor'
import brand from './brand'
import {mapState} from 'vuex'
export default {
    components:{
        listContainer,
        todayRecommene,
        rank,
        like,
        floor,
        brand
    },
    mounted(){
        this.$store.dispatch('home/floorrequests','floorrequests ')
        //获取用户token
        this.$store.dispatch('getUserinfo')
        
    },
    computed:{
        ...mapState({
            floorlist: (state) => {
        return state.home.floorlist;
      },
        })
    }
    
}
</script>

<style lang="">
    
</style>