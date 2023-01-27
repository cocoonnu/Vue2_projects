// 统一接口管理：封装所有请求函数

// 请求函数返回promise对象

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


// mock 接口
export const reqgetBannerList = function() {
    return mockRequests.get('/banner');
}

export const reqgetFloorList = function() {
    return mockRequests.get('/floor');
}
