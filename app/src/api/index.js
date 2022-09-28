import instance from "./require";

import mockrequests from './mockAjax'



export  const reqCat=()=> {
    return instance({url:'/product/getBaseCategoryList',method:'get'})
}
//banner数据
export  const reqGetmock=()=> {
    return mockrequests({url:'/banner',method:'get'})
}
//floor数据
export  const reqGetfloor=()=> {
    return mockrequests({url:'/floor',method:'get'})
}

//search数据
 export const reqGetsearchinfo=(params)=>{
    return instance({url:'/list',method:'post',data:params})
 }
 //detail数据 /api/item/{ skuId }
 export const reqGoodsinfo=(skuId)=>{
    return instance({url:`item/${skuId}`,method:'get'})
 }
 //添加到购物车
 export const reqAddshopcar=(skuId,skuNum)=>{
    return instance({url:`cart/addToCart/${skuId}/${skuNum}`,method:'post'})
 }
 //获取购物车列表
 export const reqGetshopcart=()=>{
    return instance({url:'/cart/cartList',method:'get'})
 }
 //删除购物车
 export const reqDel=(skuId)=>{
   return instance({url:`/cart/deleteCart/${skuId}`,method:'delete'})
 }
 //切换商品选中状态
 export const reqCheckshop=(skuID,isChecked)=>{
   return instance({url:`/cart/checkCart/${skuID}/${isChecked}`,method:'get'})
 }
 //获取验证码
 export const reqGetcode=(phone)=>{
   return instance({url:`/user/passport/sendCode/${phone}`,method:'get'})
 }
 //注册
 export const requserregister=(data)=>{
   return instance({url:'user/passport/register',data,method:'post'})
 }
 //登入
 export const reqLogin=(data)=>{
  return instance({url:'user/passport/login',data,method:'post'})
 }
 //登入token
 export const reqUserinfo=()=>{
  return instance({url:'user/passport/auth/getUserInfo',method:'get'})
 }
 //退出登入
 export const reqQuit=()=>{
  return instance({url:'/user/passport/logout',method:'get'})
 }
 //获取用户地址信息
 export const reqaddressinfo=()=>{
  return instance({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
 }
 ///api/order/auth/trade14.获取订单交易页信息
 export const reqGetinfo=()=>{
  return instance({url:'/order/auth/trade',method:'get'})
 }
 //提交订单
 export const reqsubmit=(tradeNo,data)=>{
  return instance({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
 }
 //获取支付信息
 export const reqGetmsg=(orderId)=>{
  return instance({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
 }
 //获取支付状态
 export const reqpay=(orderId)=>{
  return instance({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
 }
 //获取我的订单列表
 export const reqpaylist=(page,limit)=>{
  return instance({url:`order/auth/${page}/${limit}`,method:'get'})
 }


