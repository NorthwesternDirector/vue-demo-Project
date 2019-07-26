<template>
    <div>
        <!-- 轮播图区域 -->
        <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
        <!-- 九宫格-》六宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                  <img src="../../images/menu/menu1.png" alt="">
                  <div class="mui-media-body">近期旅行</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                    <img src="../../images/menu/menu7.png" alt="">
                     <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                    <img src="../../images/menu/menu6.png" alt="">
                    <div class="mui-media-body">vlogs</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                    <img src="../../images/menu/menu3.png" alt="">
                    <div class="mui-media-body">留言评论</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                    <img src="../../images/menu/menu5.png" alt="">
                    <div class="mui-media-body">测评</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                    <img src="../../images/menu/menu2.png" alt="">
                    <div class="mui-media-body">闲置物品</div></router-link></li>     
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                    <img src="../../images/menu/menu4.png" alt="">
                    <div class="mui-media-body">更多</div></router-link></li>
		</ul> 
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import swiper from '../subcomponents/swiper.vue'

export default{
    data(){
        return{
             lunbotuList:[]
        };
    },
    created(){
         this.getLunbotu();
    },
    methods:{
        //远程数据为空，没得数据用本地的吧
        getLunbotu(){
            this.$http.get("../../Data/lunbotu/homePhotos.json").then(result=>{
                  if(result.status==200){ //此为本地数据，获取网络数据应该使用 if(result.body.status===0)        
                    //this.goodslist=JSON.parse(result.bodyText);//this.newslist=result.body.message
                    this.lunbotuList=JSON.parse(result.bodyText);
                }else{
                    Toast('数据获取失败。。');
                }
            })
        }
    },
    components:{
        swiper
    }
}
</script>

<style lang="scss" scoped>

    // 九宫格样式调整
     .mui-grid-view.mui-grid-9{
        background-color: white;
        border:none;
        img{
            width:60px;
            height:60px;
        }   
        .mui-media-body{
            font-size:13px;
        }
     }
     .mui-grid-view.mui-grid-9 .mui-table-view-cell{
         border:none;
     }
   
</style>
