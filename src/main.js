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
    router, //挂载路由对象至vm实例
})