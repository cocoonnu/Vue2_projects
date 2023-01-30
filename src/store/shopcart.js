// 购物车仓库

// 引入请求函数
import { reqgetCartList,reqDeleteCart,reqCheckCart } from '@/api'

export default {
	namespaced: true,

    actions: {
        async getCartList(context) {
            let result = await reqgetCartList();
            
            if(result.code == 200) {
                context.commit('getCartList',result.data)
            } else {
                console.log('获取购物车列表失败');
            }
        },

        async deleteCart(context,skuId) {
            let result = await reqDeleteCart(skuId);

            if(result.code == 200) {
                return '删除购物车商品成功';
            } else {
                return Promise.reject(new Error('删除购物车商品购物车失败'));
            }
        },

        async checkCart(context,{skuId,isChecked}) {
            let result = await reqCheckCart(skuId,isChecked);

            if(result.code == 200) {
                return '更新购物车商品状态成功';
            } else {
                return Promise.reject(new Error('更新购物车商品状态失败'));
            }
        },

        // 删除所有选中的商品
        async delCheckedCart({state,dispatch}) {
            let promiseAll = [];

            state.cartList.forEach(function(item) {
                if(item.isChecked) {
                    let result = dispatch('deleteCart',item.skuId);
                    promiseAll.push(result);
                }
            })

            return Promise.all(promiseAll);
        },
    },

    mutations: {
        getCartList(state,value) {
            state.cartList = value[0].cartInfoList;
        }
    },

    state: {
        cartList: [],
    },
}
