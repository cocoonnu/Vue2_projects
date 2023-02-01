// search 仓库

// 引入请求函数
import { reqgetSearchData } from '@/api'


export default {
	namespaced: true,

    actions: {
        async updataSearchData(context,params) {
            let result = await reqgetSearchData(params);
            
            if(result.code == 200) {
                context.commit('updataSearchData',result.data)
            } else {
                console.log('搜索失败！');
            }
        },

    },

    mutations: {
        updataSearchData(state,value) {
            state.searchData = value;
        },
    },

    state: {
        searchData: {},
    },

    getters: {
        // 通过 getter 简化 searchData 的数据
        attrsList(state) {
            return state.searchData.attrsList;
        },

        goodsList(state) {
            return state.searchData.goodsList;
        },

        trademarkList(state) {
            return state.searchData.trademarkList;
        }
    }
}
