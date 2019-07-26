//入口文件
import Vue from 'vue'

//1.1导入路由
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)
    //1.3导入自己的路由模块
import router from './router.js'

//注册Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站，将历史购物记录添加至car
var car = JSON.parse(localStorage.getItem('car') || '[]') //localStorage.getItem('car') || '[]'代表前者不存在就来个空数组！

var store = new Vuex.Store({
    state: { //this.$store.statue.参数名
        car: car //将购物车中的商品数据用数组储存
    },
    mutations: { //this.$store.commit('方法名','参数')
        addToCar(state, goodsinfo) { //点击购物车把商品信息保存到store里的car中
            var flag = false;
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            });
            if (!flag) {
                state.car.push(goodsinfo)
            };

            //当更新car之后，把car数组存储到本地的localStorage中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) { //修改购物车页面中的商品数量值
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count);
                    return true;
                }
            });

            //当更新car之后，把car数组存储到本地的localStorage中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFormCar(state, id) { //根据id从store中的car中删除对应商品
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1);
                    return true;
                }
            });

            //当更新car之后，把car数组存储到本地的localStorage中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                }
            });

            //当更新car之后，把car数组存储到本地的localStorage中
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: {
        'getAllCount': function(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            });
            return c;
        },
        'getGoodsCount': function(state) { //生成购物车页面 商品数量对象
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count;
            });
            return o;
        },
        'getGoodsSelected': function(state) { //生成购物车页面 标签是否勾选对象
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.selected
            });
            return o;
        },
        'getGoodsCountAndAmount': function(state) { //生成购物车页面 勾选的物品总件数&总价
            var o = {
                count: 0, //勾选数量
                amount: 0, //勾选总价
            };
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count;
                    o.amount += item.price * item.count;
                }
            });
            return o;
        }
    }
})


//2.1导入vue-resource
import VueResource from 'vue-resource'
//2.2安装vue-resource
Vue.use(VueResource)

//定义全局日期过滤器
import moment from 'moment'
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

//按需导入Mint-UI中的组件
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//导入MUI样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入app组件。
import app from './App.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router, //挂载 路由对象 至vm实例
    store, //挂载 store状态管理对象 至vm实例
})