<template>
    <div class="goods-list">
        <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag="div">
            <img :src="item.img_url" alt="图片跑路了">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="new">¥{{ item.sell_price }}</span>
                    <span class="old">¥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>出售中</span>
                    <span>剩余{{ item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link> -->

        <!-- 方式1: 使用 a 标签 的跳转形式叫做 标签跳转 -->
        <!-- 方式2: 使用window.location.herf 的形式跳转叫做 编程式导航 -->
         <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="图片跑路了">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="new">¥{{ item.sell_price }}</span>
                    <span class="old">¥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>出售中</span>
                    <span>剩余{{ item.stock_quantity}}件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){//data是往自己组件内部 挂载一些私有数据
        return{
            pageindex:1,
            goodslist:[]//存放商品列表
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            this.$http.get('../../Data/goodsList/goodslist'+this.pageindex+'.json').then(result=>{
                  if(result.status==200){ //此为本地数据，获取网络数据应该使用 if(result.body.status===0)        
                    //this.goodslist=JSON.parse(result.bodyText);//this.newslist=result.body.message
                    this.goodslist=this.goodslist.concat(JSON.parse(result.bodyText));
                }else{
                    Toast('数据获取失败。。');
                }
            })
        },
        getMore(){
            this.pageindex++;
            this.getGoodsList();
        },
        goDetail(id){//使用JS的形式进行路由导航

        //$route 是路由参数对象
        //$router 是路由导航对象
            this.$router.push({name:"goodsinfo",params:{id}})
        }
    }
}
</script>

<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 6px;
    justify-content: space-between;

    .goods-item{
        width:49%;
        border:1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 3px 0px;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 240px;
        img{
            width:100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color:rgb(243, 243, 230);
            p{
                margin: 0;
                padding:4px;
            }
            .price{
                .new{
                    color:rgb(252, 97, 35);
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 13px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
    }
   
}
</style>
