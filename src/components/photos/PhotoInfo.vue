<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>时间：{{ photoinfo.add_time | dateFormat}}</span>
            <span>浏览：{{photoinfo.click}}次</span>
        </p>
        <hr>
        <!-- 缩略图 -->
        <div class="thumbs">
             <vue-preview :slides="list" @close="handleClose"></vue-preview>
            <!-- <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index,list)" :key="item.src"> -->
        </div>
        <!-- 图片文字 -->
        <div class="content" v-html="photoinfo.zhaiyao"></div>

        <!-- 评论子组件 -->
        <cmt-box :id="id"></cmt-box>

    </div>
</template>

<script>
// 导入评论子组件
import comment from '../subcomponents/comment.vue'

export default {
    data(){
        return {
            id:this.$route.params.id,//从路由中获取图片的id
            photoinfo:{},//图片详情
            list:[],//缩略图数组
        }
    },
    created(){
        this.getPhotoInfo();
        this.getThumbs()
    },
    methods:{
        getPhotoInfo(){//获取图片详情
            this.$http.get('../../Data/imageInfo/'+this.id+'.json').then(result=>{
                 if(result.status==200){ //此为本地数据，获取网络数据应该使用 if(result.body.status===0)        
                    this.photoinfo=JSON.parse(result.bodyText)[0];//this.newslist=result.body.message
                }else{
                    Toast('数据获取失败。。');
                }
            })
        },
        getThumbs(){//获取缩略图
            this.$http.get('../../Data/image-detail/'+this.id+'.json').then(result=>{
                if(result.status==200){ //此为本地数据，获取网络数据应该使用 if(result.body.status===0)        
                    this.list=JSON.parse(result.bodyText);//this.newslist=result.body.message
                    //补全图片宽高信息
                    this.list.forEach(item=>{
                        item.w=600;
                        item.h=400;
                    })
                }else{
                    Toast('数据获取失败。。');
                }
            })
        },
        handleClose () {
            console.log('close event')
        }
    },
    components:{//注册评论子组件
        'cmt-box':comment
    }
}
</script>

<style lang="scss" scoped>
.photoinfo-container{
    padding: 7px;
    h3{
        color:salmon;
        font-size: 17px;
        text-align: center;
        margin: 15px 0px;
    }
    .subtitle{
        display:flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 14px;
        line-height: 25px;
    }
    .my-gallery{
       
            img{
            width:50px !important;
            height: 50px;
            margin: 1px 4px;
            box-shadow: 0 0 8px #999;
             }
        
        
    }
    .thumbs {
        /deep/ .my-gallery {
            display: flex;
            flex-wrap: wrap;
            figure {
                width: 30%;
                margin: 5px;
                img {
                    width: 100%;
                    box-shadow: 0 0 8px #999;
                    
                }
            }
        }
    }


}
</style>
