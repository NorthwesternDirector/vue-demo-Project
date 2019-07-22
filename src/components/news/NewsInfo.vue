<template>
    <div class="newsinfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{ newsinfo.title }}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{ newsinfo.add_time }}</span>
            <span>浏览次数：{{ newsinfo.click }}次</span>
        </p>
        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="newsinfo.content"></div>
        <!-- 评论区域 -->
        <!-- 父子组件传值 -->
        <component-box :id="this.id"></component-box>
    </div>
</template>

<script>
import {Toast} from "mint-ui"
//导入评论子组件
import comment from '../subcomponents/comment.vue'

export default {
    data(){
        return {
            id:this.$route.params.id,//将url中传递的id值挂载到data上，方便之后关联数据
            idtxt:this.$route.params.id+'.txt',
            idcontent:this.$route.params.id+'content.txt',
            newsinfo:{}
        }
    },
    created(){
        this.getNewsInfo();
    },
    methods:{
        getNewsInfo(){
            this.$http.get('../../Data/newsInfo/'+this.idtxt).then(result=>{ 
                 if(result.status==200){ //此为本地数据，获取网络数据应该使用 if(result.body.status===0)  
                    this.newsinfo=JSON.parse(result.bodyText)[0];//this.newsinfo=result.body.message[0]
                    this.$http.get('../../Data/newsInfo/'+this.idcontent).then(result=>{
                        if(result.status==200){ //此为本地数据，获取网络数据应该使用 if(result.body.status===0)                           
                            this.newsinfo.content=result.bodyText;//this.newsinfo=result.body.message[0]
                        }else{
                            Toast('内容数据获取失败。。');
                        }
                    })
                }else{
                    Toast('信息数据获取失败。。');
                }
            },function(){Toast('信息数据获取失败。。');})
            
        }
    },
    components:{//用来注册子组件的节点
        'component-box':comment
    }
}
</script>

<style lang="scss" scoped>
.newsinfo-container{
    padding: 0px 5px;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0px;
        color:lightcoral;
    }
    .subtitle{
        font-size: 13px;
        color:lightsteelblue;
        display: flex;
        justify-content: space-between;
    }
    .content{}
}
</style>
