import { reqaddressinfo,reqGetinfo } from "@/api"
const state={
    address:[],
    userinfo:{}
}
const mutations={
    GETADDRESSINFO(state,address){
        state.address=address
    },
    GETINFO(state,userinfo){
        state.userinfo=userinfo
    }
}
const actions={
    async getAddressinfo({commit}){
        let result =  await reqaddressinfo()
        if(result.code==200){
            commit('GETADDRESSINFO',result.data)
            console.log(result);
        }else{
            // return Promise.reject(new Error('falie'))
        }
    },
    //14.获取订单交易页信息
    async getinfo({commit}){
        let result = await reqGetinfo()
        if(result.code==200){
            commit('GETINFO',result.data)
        }
    }
}
const getters={}

export default {
    state,
    mutations,
    actions,getters
}