<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!-- 商品列表项区域 -->
            <div class="mui-card" v-for="(item,i) in now_goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <!-- 特别说明：getters中的值是无法改变的，但是在获取mt-switch当前值(true/false)的时候，发现利用$store.getters.getGoodsSelected[item.id]可以取到变化值，但变化值不影响getters中实际的值 -->
                         <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                         <img :src="item.img_url" alt="">
                         <div class="info">
                             <h1>{{item.title}}</h1>
                             <p>
                                <span class="price">¥{{item.sell_price}}</span>
                                <!-- 循环购物车中的商品数据，创建对象a={id:count} -->
                                <!-- 访问a[id]即为该商品的数量 -->
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- item.id 用来在store中唯一标识，i 用来在now_goodslist中唯一标识 -->
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                             </p>
                         </div>
                    </div>
                </div>
            </div>
        </div>
         <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                   <div class="left">
                       <p>总计（不包含运费）</p>
                       <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价 ¥<span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                   </div>
                   <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numberbox.vue'

export default{
    data(){
        return {
            goodslist:[],//全部商品数组
            now_goodslist:[],//购物车选中的商品数组
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            //获取购物车内商品（存储在localstorage）的id列表
            var idArr=[];
            this.$store.state.car.forEach(element => {
                idArr.push(element.id)
            });
            if(idArr.length<=0) //如果购物车上没有商品，直接返回无需请求数据
                return;
            this.$http.get('../../Data/goodsList/goodslist1.json').then(result=>{
                if(result.status==200){ //此为本地数据，获取网络数据应该使用 if(result.body.status===0)        
                    //this.goodslist=JSON.parse(result.bodyText);//this.newslist=result.body.message
                    this.goodslist=this.goodslist.concat(JSON.parse(result.bodyText));
                    this.$http.get('../../Data/goodsList/goodslist2.json').then(result=>{
                        if(result.status==200){ //此为本地数据，获取网络数据应该使用 if(result.body.status===0)        
                            //this.goodslist=JSON.parse(result.bodyText);//this.newslist=result.body.message
                            this.goodslist=this.goodslist.concat(JSON.parse(result.bodyText));

                            idArr.forEach(item=>{//根据购物车商品列表获取商品信息
                                var data =this.goodslist[(parseInt(item)%10)-1];
                                this.now_goodslist.push(data);
                            })
                            
                        }else{
                            Toast('数据获取失败。。');
                        }
                    })
                }else{
                    Toast('数据获取失败。。');
                }
            });
        },
        remove(id,index){//删除购物车清单中的数据
            this.now_goodslist.splice(index,1);
            this.$store.commit('removeFormCar',id)
        },
        selectedChanged(id,val){//开关变化对购物车的影响
            this.$store.commit('updateGoodsSelected',{id:id,selected:val});
        }
    },
    components:{
        numbox
    }
}
</script>

<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
}
.goods-list{
    img{
        width:60px;
        box-shadow: 0 0 8px #999;
        margin:0px 10px 0px 5px;
    }
    h1{
        font-size: 13px;
    }
    .info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .price{
            color:lighten($color: #FF0000, $amount: 12);
            font-weight: bold;
        }
    }
    .mui-card-content-inner{
        display:flex;
        align-items: center;
    }
}

.jiesuan{
    display: flex;
    justify-content:space-between;
    align-items: center;
    .red{
        color: lighten($color: #ff0000, $amount: 15);
        font-size: 16px;
        font-weight: bold;
    }
}
</style>
