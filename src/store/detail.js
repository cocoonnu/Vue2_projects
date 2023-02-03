// detail 仓库

// 引入请求函数
import { reqgetGoodData, reqAddShopCart } from '@/api'


export default {
	namespaced: true,

    actions: {
        async updataGoodData(context,goodId) {
            let result = await reqgetGoodData(goodId);
            
            if(result.code == 200) {
                context.commit('updataGoodData',result.data);
            } else {
                console.log('获取商品数据失败！');
            }
        },

        async addShopCart(context,{skuId,skuNum}) {
            let result = await reqAddShopCart(skuId,skuNum);

            if(result.code == 200) {
                return '更新购物车成功';
            } else {
                return Promise.reject(new Error('更新购物车失败'));
            }
        },
    },

    mutations: {
        updataGoodData(state,value) {
            state.goodData = value;
        },
    },

    state: {
        goodData: {},
    },

    getters: {
        categoryView(state) {
            return state.goodData.categoryView || {};
        },

        skuInfo(state) {
            return state.goodData.skuInfo || {};
        },

        spuSaleAttrList(state) {
            return state.goodData.spuSaleAttrList || [];
        },
    }
}
