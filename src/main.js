//入口文件
import Vue from 'vue'

//1.1导入路由
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)
    //1.3导入自己的路由模块
import router from './router.js'

//2.1导入vue-resource
import VueResource from 'vue-resource'
//2.2安装vue-resource
Vue.use(VueResource)

//按需导入Mint-UI中的组件
import 'mint-ui/lib/style.css'
import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)

//导入MUI样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入app组件。
import app from './App.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router, //挂载路由对象至vm实例
})