<template>
    <div class="spec-preview">
        <img 
            v-for="(img,index) in imgList"
            v-if="img.isDefault == 1"
            :src="img.imgUrl" 
        />

        <!-- 遮罩层 -->
        <div class="event" @mousemove="show"></div>

        <!-- 放大镜 -->
        <div class="big">
            <img :src="imgList[imgIndex]?.imgUrl" ref="bigImg">
        </div>

        <!-- 正方形蒙版 -->
        <div class="mask" ref="mask"></div>
    </div>
</template>

<script>
export default {
    name: "Zoom",

    props: ['imgList'],

    computed: {
        imgIndex: {
            get() {
                for(let i=0;i<this.imgList.length;i++) {
                    if(this.imgList[i].isDefault == 1) return i;
                }         
            },

            set(value) {
                for(let i=0;i<this.imgList.length;i++) {
                    this.imgList[i].isDefault = 0;
                }   
                
                this.imgList[value].isDefault = 1;
            }
        }
    },


    methods: {
        show(e) {
            let mask = this.$refs.mask;
            let bigImg = this.$refs.bigImg;

            let top = e.offsetY - mask.offsetHeight/2;
            let left = e.offsetX - mask.offsetWidth/2;

            if(e.offsetY > (e.target.offsetHeight - mask.offsetHeight/2)) {
                top = e.target.offsetHeight - mask.offsetHeight + 'px';
            }
            if(e.offsetY < mask.offsetHeight/2) top = 0;
    
            if(e.offsetX > e.target.offsetWidth - mask.offsetWidth/2) {
                left = e.target.offsetWidth - mask.offsetWidth + 'px';
            }
            if(e.offsetX < mask.offsetWidth/2) left = 0;

            mask.style.top = top + 'px';
            mask.style.left = left + 'px';
            bigImg.style.top = -2 * top + 'px';
            bigImg.style.left = -2 * left + 'px';
        },
    },

    mounted() {
        this.$bus.$on('getIndex',(index) => {
            this.imgIndex =index;
        }) 
    }
}
</script>

<style lang="less">
button {
    z-index: 999;
}

  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>