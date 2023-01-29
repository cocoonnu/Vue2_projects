// 登录注册仓库

// 引入请求函数
import { reqGetCode,reqRegister } from '@/api'


export default {
	namespaced: true,

    actions: {
        async getCode(context,phone) {
            let result = await reqGetCode(phone);
            
            if(result.code == 200) {
                return result.data;
            } else {
                return Promise.reject(new Error('获取验证码失败'));
            }
        },

        async register(context,user) {
            let result = await reqRegister(user);
            
            if(result.code == 200) {
                return {message: '注册成功'};

            } else {
                // 直接返回 promise
                return result;
            }
        },

    },

    mutations: {
    },

    state: {
    },

}
