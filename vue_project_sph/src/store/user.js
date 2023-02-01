// 登录注册仓库

// 引入请求函数
import { reqGetCode,reqRegister,reqLogin,reqgetUserInfo,reqLogout } from '@/api'


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
                // 返回成功result
                return {message: '注册成功'};

            } else {
                // 返回失败result 里面有 message
                return result;
            }
        },

        async login(context,user) {
            try {
                let result = await reqLogin(user);

                // result为 成功态的值 并且任务完成
                if(result.code == 200) {
                
                    localStorage.setItem('token', result.data.token); // 本地存储 token

                    return {message: '登录成功'};

                // result为 成功态的值 并且任务失败
                } else if(result.code == 207) {
                    
                    return result; // 里面带有 message

                // 发送请求失败 result 为一个 AxiosError
                } else {
                    return {message: '登录失败'}
                }

                // error 为失败态的值
            } catch (error) {
                console.log(error);

                return {message: '登录失败'}
            }
        },

        async getUserInfo(context) {
            let result = await reqgetUserInfo();
            
            context.state.userInfo = result.data;
        },

        // 申请向服务器删除 token 同时删除本地（所以必须重新登录）
        async logout() {
            let result = await reqLogout();

            if(result.code == 200) {
                // 当成功态并且 code == 200
                localStorage.removeItem('token');

                return '退出登录成功';

            } else {
                // 失败态或请求失败返回 自定义失败态 promise
                return Promise.reject(new Error('退出登录失败'));
            }
        }

    },

    mutations: {
    },

    state: {
        userInfo: {},
    },

}
