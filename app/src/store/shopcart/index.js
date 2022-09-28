import { reqGetshopcart ,reqDel,reqCheckshop} from "@/api"
const state={
    shoplist:[]
}
const mutations={
    GETSHOPCART(state,shoplist){
        state.shoplist=shoplist
    }
}
const actions={
    async getShopcart({commit}){
        let result = await reqGetshopcart()
        if(result.code==200){
            commit('GETSHOPCART',result.data)
        }
    },
    //删除商品
    async deleteshoplist({commit},skuId){
        let result = await reqDel(skuId)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('shibai'))
        }
    },
    //切换商品选中状态
    async checkShop({commit},{skuId,isChecked}){
         let result= await reqCheckshop(skuId,isChecked)
         if(result.code==200){
            return 'ok'
         }else{
            return 'shibai'
         }
    },
    //删除全部选中商品
    delAllshoplist({dispatch,getters}){
        let promiseAll=[]
        getters.shoplist.cartInfoList.forEach(item => {
            let promise= item.isChecked==1? dispatch('deleteshoplist',item.skuId):''
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    },
    updataAll({dispatch,state},isChecked){
        let promiseAll=[]
        state.shoplist[0].cartInfoList.forEach(item=>{
            let promise=  dispatch('checkShop',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const getters={
    shoplist(state){
        return state.shoplist[0]||{}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}