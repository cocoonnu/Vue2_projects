const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,

    //关闭eslint校验
    lintOnSave: false,

    // 配置服务器代理
	devServer: {
        proxy: {

            // 匹配所有以 '/api'开头的请求路径
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn', // 硅谷后台管理系统接口  
            },
            
        }
    }

})
