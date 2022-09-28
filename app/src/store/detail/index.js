
import { reqGoodsinfo,reqAddshopcar } from "@/api"
import {getUUID} from '@/utils/uuid_token'
const state={
    goodList:{},
    // uuid_token:getUUID()
}
const mutations={
    GETGOODSINFO(state,goodList){
        state.goodList=goodList
    }
}
const actions={
    async getGoodsinfo({commit},skuId){
        let result= await reqGoodsinfo(skuId)
        if(result.code==200){
            commit('GETGOODSINFO',result.data)
        }
    },
    //添加到购物车
    async addorupdataShopcat({commit},{skuId,skuNum}){
        let result= await reqAddshopcar(skuId,skuNum)
        console.log(result);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('falie'))
        }
    }
}
const getters={
    categoryView(state){
        return state.goodList.categoryView || {}
    },
    skuInfo(state){
        return state.goodList.skuInfo || {}
    },
    spuSaleAttrList(state){
         return state.goodList.spuSaleAttrList || []
    }

}
export default {
    
    
    state,
    mutations,
    actions,
    getters
}