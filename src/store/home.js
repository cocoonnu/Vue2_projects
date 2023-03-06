// home仓库

// 引入请求函数
import {
    reqgetCategoryList,
    reqgetBannerList,
    reqgetFloorList 
} from '@/api'


export default {
	namespaced: true,

    actions: {
        async updataNavList(context) {
            let result = await reqgetCategoryList();

            if(result.code == 200) {
                console.log(result.data);
                context.commit('updataNavList',result.data)
            }
        },

        async updataBannerList(context) {
            let result = await reqgetBannerList();
            
            if(result) {
                context.commit('updataBannerList',result.data)
            }
        },

        async updataFloorList(context) {
            let result = await reqgetFloorList();
            
            if(result) {
                context.commit('updataFloorList',result.data)
            }
        }

    },

    mutations: {
        updataNavList(state,value) {
            if(!JSON.parse(localStorage.getItem('navList'))) 
            {
                localStorage.setItem('navList', JSON.stringify(value));
            }
            state.navList = value;
        },

        updataBannerList(state,value) {
            state.bannerList = value;
        },

        updataFloorList(state,value) {
            state.floorList = value;
        }

    },

    state: {
        navList: [],
        bannerList: [],
        floorList: [],
    },
}
