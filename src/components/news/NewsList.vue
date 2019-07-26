<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newsinfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{ item.title }}</h1>
                        <p class='mui-ellipsis'>
                            <span>发布时间:{{ item.add_time|dateFormat('YYYY-MM-DD')}}</span>
                            <span>浏览次数:{{ item.click }}</span>
                        </p>
                    </div>
                </router-link>
            </li>
		</ul>
    </div>
</template>

<script>
import {Toast} from "mint-ui"

export default {
    data(){
        return{
            newslist:[]
        }
    },
    created(){
        this.getNewsList();
    },
    methods:{
        getNewsList(){
            this.$http.get('../../Data/newsList/newsList.txt').then(result=>{
                if(result.status==200){ //此为本地数据，获取网络数据应该使用 if(result.body.status===0)
                    
                    this.newslist=JSON.parse(result.bodyText);//this.newslist=result.body.message
                }else{
                    Toast('数据获取失败。。');
                }
                
                
            })
        }
    }
    
}
</script>

<style lang="scss" scoped>
.mui-table-view{
    li{
        h1{
            font-size:14px;
        }
        .mui-ellipsis{
            font-size: 12px;
            color:lightslategray;
            display: flex;
            justify-content: space-between;
        }
        
    }
}

</style>
