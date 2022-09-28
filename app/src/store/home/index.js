//home模块
//引入axios
import {reqCat} from '@/api'
import {reqGetmock} from '@/api'
import { reqGetfloor } from '@/api'

const state={
    categoryList:[],
    mockList:[],
    floorlist:[]
}
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    MOCKREQUESTS(state,mockList){
        state.mockList=mockList
    },
    FLOORREQUESTS(state,floorlist){
        state.floorlist=floorlist
    }
}
const actions={
    async categoryList({commit}){
        let result =  await reqCat();
        console.log(result);
        if(result.code==200){
            //这里不懂明天继续
            commit('CATEGORYLIST',result.data)
        }
    },
    //轮播图数据
    async mockrequests({commit}){
       let result= await reqGetmock()
        if(result.code==200){
            commit('MOCKREQUESTS',result.data)
            console.log(result.data);
        }
    },
    //floor数据
    async floorrequests({commit}){
        let result= await reqGetfloor()
        if(result.code==200){
            commit('FLOORREQUESTS',result.data)
        }
    }
}
const getters={}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}