<template>
    <div>
     <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a :class="['mui-control-item',item.id==0? 'mui-active':'']" v-for="item in cates" :key="item.id" @click="getPhotoByID(item.id)">
                    {{item.title}}
                </a>   
            </div>
        </div>
    </div>
    <!-- 图片列表区域 -->
    <ul class="photolist">
        <router-link v-for="item in list" :key=item.id :to="'/home/photoinfo/'+item.id" tag="li">
            <img v-lazy="item.img_url">
            <div class="info">
                <h1 class="info-title">{{ item.title }}</h1>
                <div class="info-body">{{ item.zhaiyao }}</div>
            </div>
        </router-link>
    </ul>
    </div>
</template>


<script>
//1.导入 mui 的js文件
import mui from '../../lib/mui/js/mui.min.js'


export default {
    data(){
        return{
            cates:[],//图片分类列表数组
            list:[],//图片信息数组
        }
    },
    created(){
         this.getAllCatergory();
         this.getPhotoByID(0);
    },
    mounted(){
        //2. 初始化滑动控件
        mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005
        })
    },
    methods:{
        getAllCatergory(){
            this.$http.get('../../Data/imageList/imgCategory.json').then(result=>{
                if(result.status==200){ //此为本地数据，获取网络数据应该使用 if(result.body.status===0)        
                    this.cates=(JSON.parse(result.bodyText));//this.newslist=result.body.message
                    this.cates.unshift({title:"全部",id:0})
                }else{
                    Toast('数据获取失败。。');
                }
            })
        },
         getPhotoByID(cateID){//根据分类id获取图片列表
            this.$http.get('../../Data/imageInfo/'+cateID+'.json').then(result=>{
                if(result.status==200){ //此为本地数据，获取网络数据应该使用 if(result.body.status===0)                
                    this.list=JSON.parse(result.bodyText);//this.newslist=result.body.message
                }else{
                    Toast('数据获取失败。。');
                }
            })
        }
    }
}
</script>


<style lang="scss" scoped>
*{
    touch-action: pan-y;
}
.mui-scroll{
    a{
        color: red ;
    }
}
// 图片懒加载样式
.photolist{
    list-style: none;
    margin: 0px;
    padding: 10px 10px 0px;
    li{
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        position: relative;
        img{
            width:100%;
            vertical-align: middle;
            max-height: 240px;
        }
        img[lazy="loading"]{
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .info{
            color:linen;
            text-align: left;
            position: absolute;
            bottom: 0;
            background-color: rgba(0,0,0,0.4);
            width: 100%;
            max-height: 84px;
            .info-title{
                font-size:14px;
            }
            .info-body{
                font-size:13px;
            }
        }
    }
}

</style>
