// 支付页面仓库

// 引入请求函数
import { reqFindAddressList,reqGetTradeList } from '@/api'


export default {
	namespaced: true,

    actions: {
        async findAddressList(context) {
            let result = await reqFindAddressList();
            
            if(result.code == 200) {
                context.commit('findAddressList',result.data);
                return 'ok';
            } else {
                return Promise.reject(new Error('获取地址失败'));
            }
        },

        async getTradeList() {
            let result = await reqGetTradeList();
            console.log(result);
        }


    },

    mutations: {
        findAddressList(state,value) {
            state.addressList = value;
        }
    },

    state: {
        addressList: [],
    },

}
