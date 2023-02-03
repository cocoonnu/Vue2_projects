<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(img,index) in imgList" :key="index">
                <img :src="img.imgUrl" />
            </div>
        </div>

        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper'

    export default {
        name: 'Carousel',

        props: ['imgList'],

        watch: {
            imgList: {
                immediate: true,
                handler() {
                    this.$nextTick(function() {
                        new Swiper(".swiper-container", {
                            loop: true,

                            pagination: {
                                clickable: true,
                                el: ".swiper-pagination",
                                bulletClass : 'my-bullet',
                                bulletActiveClass: 'my-bullet-active',
                            },

                            navigation: {
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            },
                        });
                    })
                }
            }
        }
    }
</script>

<style lang="less">
    // 分页器样式
    .my-bullet{
        position: relative;
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        background: black;
        opacity: 0.5;
        margin: 0 4px;
    }

    // 选中的分页器样式（会继承上面那个样式）
    .my-bullet-active {
        background: #ff6600;
        opacity: 1;
    }
</style>