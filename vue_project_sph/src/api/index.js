// 统一接口管理：封装所有请求函数

// 请求函数返回 promise 对象

import requests from './requests';
import mockRequests from './mockRequests'

// api 接口
export const reqgetCategoryList = function() {
    return requests.get(`/product/getBaseCategoryList`);
}

export const reqgetSearchData = function(params) {
    return requests({
        method: 'POST',
        url: '/list',
        data: params,
    })
} 

export const reqgetGoodData = function(goodId) {
    return requests({
        method: 'GET',
        url: `/item/${goodId}`,
    })
} 

export const reqAddShopCart = function(skuId,skuNum) {
    return requests({
        method: 'POST',
        url: `/cart/addToCart/${skuId}/${skuNum}`,
    })
} 

export const reqgetCartList = function() {
    return requests.get(`/cart/cartList`);
}

export const reqDeleteCart = function(skuId) {
    return requests({
        method: 'DELETE',
        url: `/cart/deleteCart/${skuId}`,
    })
} 

export const reqCheckCart = function(skuId,isChecked) {
    return requests({
        method: 'GET',
        url: `/cart/checkCart/${skuId}/${isChecked}`,
    })
} 

export const reqGetCode = function(phone) {
    return requests({
        method: 'GET',
        url: `/user/passport/sendCode/${phone}`,
    })
} 

export const reqRegister = function(user) {
    return requests({
        method: 'POST',
        data: user,
        url: `/user/passport/register`,
    })
} 

export const reqLogin = function(user) {
    return requests({
        method: 'POST',
        data: user,
        url: `/user/passport/login`,
    })
} 

export const reqgetUserInfo = function() {
    return requests.get(`/user/passport/auth/getUserInfo`);
}

export const reqLogout = function() {
    return requests.get(`/user/passport/logout`);
}

export const reqFindAddressList = function() {
    return requests.get(`/user/userAddress/auth/findUserAddressList`);
}

export const reqGetTradeList = function() {
    return requests.get(`/order/auth/trade`);
}



// mock 接口
export const reqgetBannerList = function() {
    return mockRequests.get('/banner');
}

export const reqgetFloorList = function() {
    return mockRequests.get('/floor');
}
