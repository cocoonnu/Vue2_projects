<template>
    <div>
        <h1>img_懒加载</h1>
        修改图片的路径，设置为懒加载的形式，将src改成v-lazy
        <h1>一张图片</h1>
        <img v-lazy="aaa">


        <h1>图片列表 li>img </h1>
        <ul>
            <li v-for="(img, index) in img_list" :key="index">
                <img v-lazy="img">
            </li>
        </ul>


        <h1> div>img </h1>
        <div v-lazy-container="{ selector: 'img' }">
            <!-- 不能再用 v-lazy 了， 只能用 data-src 替换 -->
            <img v-lazy="img_list[0]">
            <img :data-src="img_list[1]">
            <img :data-src="img_list[2]">
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            aaa: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.utuku.imgcdc.com%2F650x0%2Fent%2F20220822%2F7fa922ec-8177-462e-92b6-f013e7d0317f.jpg&refer=http%3A%2F%2Fimg1.utuku.imgcdc.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664097306&t=ca1b85bb7c5cd10a6bcb3adc4d6304d4",
            img_list: [
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg3.utuku.imgcdc.com%2F650x0%2Fent%2F20220822%2Fa1f8ba9e-0061-4738-861a-0f64e24d4656.jpg&refer=http%3A%2F%2Fimg3.utuku.imgcdc.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664097306&t=19dd99632ed17e12f681fe3b611c7427",
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx3.sinaimg.cn%2Fmw690%2F0079Rneply1h5ir0i5fijj30sg15e0yt.jpg&refer=http%3A%2F%2Fwx3.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664097306&t=b2b54e7c0f61ee29dafbb156e58236f2",
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx4.sinaimg.cn%2Fmw690%2F00894mOqly1h5eg3rqfw7j32g63cshdv.jpg&refer=http%3A%2F%2Fwx4.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664097306&t=082e6b0aa3d4a82aeab7ebc9ce9f978c",
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww4.sinaimg.cn%2Fmw690%2F007edoMely1h5jfoujf3dj311g1dxqcx.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664097306&t=0aed6398399696859b93aa6141f97760",
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg0.utuku.imgcdc.com%2F650x0%2Fent%2F20220819%2Fb1fd7b99-43bc-4d33-8555-3020f37d5f32.jpg&refer=http%3A%2F%2Fimg0.utuku.imgcdc.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664097306&t=ac3c4f1ebd7b47351a8ede5018c6264a",
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg0.utuku.imgcdc.com%2F650x0%2Fent%2F20220822%2F45983042-c645-436a-9bde-43e14d813f80.jpg&refer=http%3A%2F%2Fimg0.utuku.imgcdc.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664097306&t=ca875094509273c0f08814643df69849",
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F16%2F20200516144231_2AV3y.thumb.400_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664097306&t=9f47f0e6e66227541ce9fc41c781fa6a",
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F09%2F20200309212857_NAPAP.thumb.400_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664097306&t=e894a74fe0dc680b887036d2afae5d45"
            ]
        }
    }
}
</script>