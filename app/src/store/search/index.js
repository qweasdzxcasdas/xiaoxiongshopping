import {reqGetsearchinfo} from '@/api'
//search模块
const state={
    searchList:{}
}
const mutations={
    GETSEARCHONFO(state,searchList){
        state.searchList= searchList
    }
}
const actions={
    async Getsearchinfo({commit},params={}){
        let result = await reqGetsearchinfo(params)
        if(result.code==200){
            commit('GETSEARCHONFO',result.data)
        }
    }
}
const getters={
    goodsList(state){
        return state.searchList.goodsList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },

}

export default {
   
    state,
    mutations,
    actions,
    getters
}