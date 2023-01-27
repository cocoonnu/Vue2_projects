<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">

      <div @mouseenter="showNav" @mouseleave="choseNav">
        <h2 class="all" >全部商品分类</h2>
        
        <transition
            enter-active-class="down1"
            leave-active-class="up1"
        >
            <!-- 导航下拉面板 -->
            <div class="sort" v-show="show">
                <div class="all-sort-list2">

                    <!-- 三级联动导航 -->

                    <!-- 第一级 -->
                    <div 
                        class="item" 
                        v-for="(item,index) in navList" 
                        :key="item.categoryId"
                        @click="goSearch"
                    >
                        <h3>
                            <a 
                                href="javascript:void(0);" 
                                :data-dataname="item.categoryName" 
                                :data-category1Id="item.categoryId"
                            >{{item.categoryName}}</a>
                        </h3>
                        
                        <!-- 第二级 -->
                        <div 
                            class="item-list clearfix" 
                        >
                            
                            <div 
                                class="subitem"
                                v-for="item_c in item.categoryChild"
                                :key="item_c.categoryId"
                            >
                                <dl class="fore">
                                
                                    <dt>
                                        <a 
                                            href="javascript:void(0);" 
                                            :data-dataname="item_c.categoryName"
                                            :data-category2Id="item_c.categoryId"
                                            >{{item_c.categoryName}}</a>
                                    </dt>
                                    
                                        <!-- 第三极 -->
                                        <dd>
                                            <em
                                                v-for="item_c_c in item_c.categoryChild"
                                                :key="item_c_c.categoryId"
                                            >
                                                <a 
                                                    href="javascript:void(0);"
                                                    :data-dataname="item_c_c.categoryName"
                                                    :data-category3Id="item_c_c.categoryId"
                                                    >{{item_c_c.categoryName}}</a>
                                            </em>
                                        </dd>
                                
                                </dl>
                            </div>
                        
                        </div>
                    
                    </div>

                </div>
            </div>
        </transition>
      
      </div>

      <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
      </nav>

    </div>
  </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'TypeNav',

        data() {
            return {
                currentIndex: -1,
                show: false,
            }
        },

        computed: {
            ...mapState('home',['navList']),
        },

        methods: {
            goSearch(e) {
                let { dataname } = e.target.dataset;

                // 如果点击的是a标签则跳转路由
                if(dataname) {
                    this.$router.push({
                        path: '/search',
                        query: { 
                            dataname, 
                            value: this.$route.params.value || ''
                        },    
                    })
                }
            },

            showNav() {
                this.show = true;
            },

            choseNav() {
                if(this.$route.path != '/home') {
                    this.show = false;
                }
            }
            
        },

        mounted() {
            if(this.$route.path == '/home') {
                this.showNav();
            }
        },
    }
</script>

<style lang="less" scoped>
    @keyframes wipe-in-down {
    from {
        clip-path: inset(0 0 100% 0);
    }
    to {
        clip-path: inset(0 0 0 0);
    }
    }

    .down {
        animation: 1s cubic-bezier(.25, 1, .30, 1) wipe-in-down both;
    }

    @keyframes wipe-out-up {
    from {
        clip-path: inset(0 0 0 0);
    }
    to {
        clip-path: inset(0 0 100% 0);
    }
    }

    .up {
        animation: 1s cubic-bezier(.25, 1, .30, 1) wipe-out-up both;
    }

    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 510px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        h3:hover {
                            background: skyblue;
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            .item-list {
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }
</style>