<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
           
            <div class="cart-body">
                <ul class="cart-list" v-for="item in cartList" :key="item.id">
                    <li class="cart-list-con1">
                        <input 
                            type="checkbox" 
                            name="chk_list" 
                            :checked="item.isChecked == 1"
                            @change="checkCart(item.skuId,$event.target.checked)"
                        >
                    </li>
                    <li class="cart-list-con2">
                        <img :src="item.imgUrl">
                        <div class="item-msg">{{item.skuName}}</div>
                    </li>
                    <li class="cart-list-con4">
                        <span class="price">{{item.skuPrice}}</span>
                    </li>
                    <li class="cart-list-con5">
                        <a class="mins" @click="changeSkuNum('mins',-1,item)">-</a>
                        <input 
                            type="text" 
                            minnum="1" 
                            class="itxt"
                            :value="item.skuNum" 
                            @blur="changeSkuNum('input',$event.target.value * 1,item)"
                        >
                        <a class="plus" @click="changeSkuNum('plus',1,item)">+</a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">{{item.skuPrice * item.skuNum}}</span>
                    </li>
                    <li class="cart-list-con7">
                        <a class="sindelet" @click="deleteCart(item.skuId)">删除</a><br>
                        <a href="#none">移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="cart-tool">
            <div class="select-all">
                <input 
                    class="chooseAll" 
                    type="checkbox"
                    @change="allCheckedCart($event.target.checked)"
                    :checked="isAllChecked && cartList.length > 0"
                >
                <span>全选</span>
            </div>
            
            <div class="option">
                <a @click="delCheckedCart">删除选中的商品</a>
                <a href="#none">移到我的关注</a>
                <a href="#none">清除下柜商品</a>
            </div>
            
            <div class="money-box">
                <div class="chosed">已选择
                <span>0</span>件商品</div>

                <div class="sumprice">
                    <em>总价: </em>
                    <i class="summoney">0</i>
                </div>
                <div class="sumbtn">
                    <a class="sum-btn" href="###" target="_blank">结算</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { throttle } from 'lodash'

export default {
    name: 'ShopCart',

    computed: {
        ...mapState('shopcart',['cartList']),

        isAllChecked() {
            return this.cartList.every(item => item.isChecked == 1);
        },
    },

    methods: {
        // 全选框功能实现
        allCheckedCart(isChecked) {
            isChecked = isChecked ? 1 : 0; 

            this.cartList.forEach((item) => {
                this.checkCart(item.skuId,isChecked);
            })

            this.$store.dispatch('shopcart/getCartList');
        },

        async delCheckedCart() {
            try {
                // 申请删除所有选中的商品
                let result = await this.$store.dispatch('shopcart/delCheckedCart');

                // result 为成功态数组数据

                // 为成功态则刷新购物车列表
                this.$store.dispatch('shopcart/getCartList');

            } catch (error) {
                // 为失败态则输出
                alert('删除所有选中的商品失败');
            }
        },

        async checkCart(skuId,isChecked) {
            isChecked = isChecked ? '1' : '0';

            try {
                await this.$store.dispatch('shopcart/checkCart',{skuId,isChecked});

                // 成功则刷新购物车列表
                this.$store.dispatch('shopcart/getCartList');

            } catch (error) {
                alert('更新购物车商品状态失败');
            }
        },

        async deleteCart(skuId) {
            try {
                await this.$store.dispatch('shopcart/deleteCart',skuId);

                // 成功则刷新购物车列表
                this.$store.dispatch('shopcart/getCartList');

            } catch (error) {
                alert('删除商品失败');
            }
        },

        // 更改购物车物品购买数量（函数开启节流 1s内只执行一次）
        changeSkuNum: throttle(async function(type,disNum,item) {
            // disNum：为数量的变化量

            if(type == 'mins' && item.skuNum <= 1) disNum = item.skuNum * -1 + 1;

            if(type == 'input') {
                disNum = isNaN(disNum) || disNum < 1 ? 0 : parseInt(disNum) - item.skuNum;
            }

            try {
                // 申请更新购物车（和添加购物车接口相同）
                await this.$store.dispatch('detail/addShopCart',{
                    skuId: item.skuId,
                    skuNum: disNum
                });

                // 成功则刷新购物车列表
                this.$store.dispatch('shopcart/getCartList');

            } catch (error) {
                console.log(error);
            }

        },1000)
    },

    mounted() {
        this.$store.dispatch('shopcart/getCartList');
    }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          .sindelet {
            color: red;
          }

          a {
            color: #666;
            cursor: pointer;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>