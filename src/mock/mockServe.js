import Mock from 'mockjs'

// 引入 json 数据
import banner from './banner.json'
import floor from './floor.json'

// 设置响应
Mock.mock('/mock/banner',{ // 相应的图片也要放在 public 文件夹下供本地端口访问！
    data: banner,    
})

Mock.mock('/mock/floor',{
    data: floor,
})

