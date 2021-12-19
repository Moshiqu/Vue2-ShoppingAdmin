<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="initCurrentIndex" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 过渡动画 -->
                <transition name="sort">
                    <div class="sort" v-show="isShowSort">
                        <div class="all-sort-list2">
                            <div
                                class="item"
                                v-for="(c1,index) in categoryList"
                                :key="c1.categoryId"
                                :class="{ itemActive: currentIndex == index }"
                                @click="goSearch"
                            >
                                <h3 @mouseenter="changeCurrentIndex(index)">
                                    <a
                                        :data-categoryName="c1.categoryName"
                                        :data-category1Id="c1.categoryId"
                                    >{{ c1.categoryName }}</a>
                                </h3>
                                <div
                                    class="item-list clearfix"
                                    :style="{ display: currentIndex == index ? 'block' : 'none' }"
                                >
                                    <div
                                        class="subitem"
                                        v-for="c2 in c1.categoryChild"
                                        :key="c2.categoryId"
                                    >
                                        <dl class="fore">
                                            <dt>
                                                <a
                                                    :data-categoryName="c2.categoryName"
                                                    :data-category2Id="c2.categoryId"
                                                >{{ c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <em
                                                    v-for="c3 in c2.categoryChild"
                                                    :key="c3.categoryId"
                                                >
                                                    <a
                                                        :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId"
                                                    >{{ c3.categoryName }}</a>
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
import { mapState } from "vuex"
import throttle from 'lodash/throttle'

export default {
    name: 'TypeNav',
    data() {
        return {
            currentIndex: -1, // sort当前的索引
            isShowSort: this.$route.path == '/home' ? true : false, // 是否展示sort
        }
    },
    computed: {
        ...mapState({
            // 右侧需要的是一个函数, 当使用这个计算属性的时候, 右侧函数会立即执行一次
            // 注入一个参数state, 其实即为大仓库中的数据
            categoryList: state => state.home.categoryList
        }),

    },
    // 组件挂载完毕, 可以向服务器发送请求
    methods: {
        // changeCurrentIndex(index) {
        //     this.currentIndex = index
        // },
        // 改变鼠标当前的背景以及二三级选择框
        changeCurrentIndex: throttle(function (index) {
            this.currentIndex = index
        }, 50),
        // 取消一级选择的高亮
        initCurrentIndex() {
            this.currentIndex = -1
            if (this.$route.path != '/home') {
                this.isShowSort = false
            }
        },
        // 进行路由跳转的方法
        goSearch(event) {
            // 最好的解决方案: 编程式导航 + 事件委派
            // 存在问题: 事件委派, 是把全部的子节点【h3,dt,dl,em]的事件委派给父节点
            // 点击a标签的时候, 才会进行路由跳转如何【如何确定点击的是a标签】
            // 存在另一个问题, 即使能确定点击的是a标签, 如何区分是一级,二级,三级分类的标签

            // 第一个问题: 把子节点当中a标签加上自定义属性 data-categoryName, 其他标签没有这个自定义属性
            let { categoryname, category1id, category2id, category3id } = event.target.dataset
            if (categoryname) {
                //点击的是a标签
                // 整理路由跳转参数
                let location = { name: "search" }
                let query = { categoryName: categoryname }
                if (category1id) {
                    // 点击的是一级标签
                    query.category1Id = category1id
                } else if (category2id) {
                    //点击的是二级标签
                    query.category2Id = category2id
                } else {
                    query.category3Id = category3id
                    //点击的是三级标签
                }

                if (this.$route.params) {
                    location.params = this.$route.params
                    // 整理参数
                    location.query = query
                    // 路由跳转及传参
                    // 一般使用对象的形式进行参数传递
                    // this.$router.push({name:'search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})
                    this.isShowSort = false
                    this.$router.push(location)
                    // 路由跳转后 关闭下拉栏
                }
            }
        },
        // 展示sort 一级选择框
        enterShow() {
            this.isShowSort = true
        }
    },
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    a {
        text-decoration: none;
        cursor: pointer;
    }
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
            height: 464px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 29px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        // display: none;
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
                }

                .itemActive {
                    background-color: skyblue;
                }
            }
        }

        //过渡动画样式
        // 过度动画开始状态(起始)
        .sort-enter {
            height: 0;
        }

        //过渡动画结束状态
        .sort-enter-to {
            height: 464px;
        }

        //定义动画时间, 速率
        .sort-enter-active {
            transition: all 0.5s linear;
            overflow: hidden;
        }

        .sort-leave {
            height: 464px;
        }

        .sort-leave-to {
            height: 0;
        }

        .sort-leave-active {
            transition: all 0.5s linear;
            overflow: hidden;
        }
    }
}
</style>