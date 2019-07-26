import VueRouter from 'vue-router'

//导入对应组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/goodsList.vue'
import GoodsInfo from './components/goods/goodsInfo.vue'

//创建路由对象
var router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' }, //在首页地址重定向至home页面，使得页面打开后即在home页面
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/newslist', component: NewsList },
        { path: '/home/newsinfo/:id', component: NewsInfo }, // ‘:’代表id是个参数
        { path: '/home/photolist', component: PhotoList },
        { path: '/home/photoinfo/:id', component: PhotoInfo },
        { path: '/home/goodslist', component: GoodsList },
        { path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo' } //name为路由名称
    ],
    linkActiveClass: 'mui-active' //覆盖了默认的路由选中激活的类名（默认为router-link-active），将其设置为mui定义过的高亮类
})

export default router