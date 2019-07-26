<template>
        
    <div class="goodsinfo-container">
       <!-- 购物车小球 -->
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
             <div class="ball" v-show="ballflag" ref="ball"></div>
        </transition>     
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotu" :isfull="true"></swiper>
                </div>
            </div>
		</div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{now_goods.title}}</div>
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <p>发布时间：{{now_goods.add_time|dateFormat}}</p>
                        <p class="price">
                            <span>原价:<del>¥{{now_goods.market_price}}</del></span>&nbsp;
                           <span class="now">咸鱼价:¥{{now_goods.sell_price}}</span>
                        </p>
                        
                        <p>库存：{{now_goods.stock_quantity}}</p>
                        <p>购买数量：<numbox @getcount="getSelectCount" :max="now_goods.stock_quantity"></numbox></p>
                        <p>
                            <mt-button type="primary" size="small">立即购买&nbsp;💰</mt-button>
                            <mt-button type="primary" size="small" @click="addToShopCar">加入购物车&nbsp;🛒</mt-button>
                            <!-- 涉及到子组件向父组件传值（事件调用机制） -->
                        </p>
                    </div>
                </div>
		</div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品描述</div>
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        {{now_goods.zhaiyao}}
                    </div>
                </div>
		</div>

    </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue'
import numbox from '../subcomponents/goodsinfo_numberbox.vue'//导入数字选择框组件

export default {
    data(){
        return {
            id:this.$route.params.id,//将路由参数中的id挂载到data
            lunbotu:[],//轮播图数据
            goodslist:[],
            now_goods:{},
            ballflag:false,//控制小球的显示
            selectedCount:1
        }
    },
    created(){
        this.getLunbotu();
        this.getGoodsInfo();
    },
    methods:{
        getLunbotu(){
            this.$http.get('../../Data/goodsinfo/'+this.id+'.json').then(result=>{
                if(result.status==200){ //此为本地数据，获取网络数据应该使用 if(result.body.status===0)        
                    //this.goodslist=JSON.parse(result.bodyText);//this.newslist=result.body.message
                    this.lunbotu=JSON.parse(result.bodyText);
                }else{
                    Toast('数据获取失败。。');
                }
            })
        },
        getGoodsInfo(){
            this.$http.get('../../Data/goodsList/goodslist1.json').then(result=>{
                  if(result.status==200){ //此为本地数据，获取网络数据应该使用 if(result.body.status===0)        
                    //this.goodslist=JSON.parse(result.bodyText);//this.newslist=result.body.message
                    this.goodslist=this.goodslist.concat(JSON.parse(result.bodyText));
                    this.$http.get('../../Data/goodsList/goodslist2.json').then(result=>{
                        if(result.status==200){ //此为本地数据，获取网络数据应该使用 if(result.body.status===0)        
                            //this.goodslist=JSON.parse(result.bodyText);//this.newslist=result.body.message
                            this.goodslist=this.goodslist.concat(JSON.parse(result.bodyText));

                            this.now_goods=this.goodslist[parseInt(this.id%10)-1]
                        }else{
                            Toast('数据获取失败。。');
                        }
                    })
                }else{
                    Toast('数据获取失败。。');
                }
            });
        },
        addToShopCar(){//添加至购物车
            this.ballflag=!this.ballflag;
            var goodsinfo={//拼接出一个要保存到store里的car参数
                id:this.id,
                count:this.selectedCount,
                price:this.now_goods.sell_price,
                selected:true
            };
            this.$store.commit("addToCar",goodsinfo);
        },
        beforeEnter: (el) => {//小球动画
            el.style.transform="translate(0,0)";
        },
        enter(el,done){//小球动画
            el.offsetWidth;//保证动画正常运行的 神秘代码
            
            //先得到 徽标的横纵坐标 再得到 小球的横纵坐标，然后插值求得位移量
            //利用原生方法 domObject.getBoundingClientRect()

            //获取小球在页面中的位置,利用ref属性
            const ballPosition =this.$refs.ball.getBoundingClientRect();
            //获取徽标在页面中的位置，利用dom操作 不数据绑定无伤大雅
            const badgePosition= document.getElementById("badge").getBoundingClientRect();

            const xDist=badgePosition.left-ballPosition.left;
            const yDist=badgePosition.top-ballPosition.top;
            
            el.style.transform=`translate(${xDist}px,${yDist}px)`;//模板字符串
            el.style.transition='all 0.7s cubic-bezier(.4,-0.3,1,.68)';
            done();//aferEnter()函数的引用
        },
        afterEnter(el){//小球动画
            this.ballflag=!this.ballflag;
        },
        getSelectCount(count){//获取goodsinfo_numberbox子组件中的值
            this.selectedCount=count;
        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container{
    background-color:#eee;
    overflow: hidden;
}

.now{
    color:lighten($color: #ff0000, $amount: 15);
    font-size: 16px;
    font-weight: bold;
}

.ball{
    width:15px;
    height:15px;
    border-radius: 50%;
    background-color:lighten($color: #ff0000, $amount: 10);
    position:absolute;
    z-index: 99;
    top:390px;
    left:146px;
}
</style>
