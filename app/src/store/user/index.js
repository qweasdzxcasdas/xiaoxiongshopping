import { reqGetcode,requserregister,reqLogin ,reqUserinfo,reqQuit} from "@/api"
import { setItem,getItem } from "@/utils/token"
const state={
    code:'',
    token:getItem(),
    userinfo:{}
}
const mutations={
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userinfo){
        state.userinfo=userinfo
    },
    QUITUSER(state){
        state.token='',
        state.userinfo=''
    }
        
}
const actions={
    async getCode({commit},phone){
        let result= await reqGetcode(phone)
        if(result.code==200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('shibai'))
        }
    },
    //注册
    async userRegister({commit},data){
        let result= await requserregister(data)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('falie'))
        }
    },
    //登入
    async userLogin({commit},data){
        let result= await reqLogin(data)
        if(result.code==200){
            commit('USERLOGIN',result.data.token)
            setItem(result.data.token)
        }else{
            return Promise.reject(new Error('falie'))
        }
    },
    //获取用户信息
    async getUserinfo({commit}){
         let result= await reqUserinfo()
         if(result.code==200){
            commit('GETUSERINFO',result.data)
            return 'ok'
         }else{
            
         }
    },
    //退出登入
    async quitUser({commit}){
        let result=await reqQuit()
        if(result.code==200){
            commit('QUITUSER')
        }
    }
}
const getters={}

export default {
    state,
    mutations,
    actions,
    getters
}