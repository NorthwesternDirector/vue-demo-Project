<template>
    <div class="cmt-container">
        <h3>精选留言</h3>
        
        <textarea placeholder="请输入BB内容(最多BB120字 )" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComments">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    <span>第{{i+1}}楼&nbsp;&nbsp;{{item.user_name}}</span>
                    <span>时间:{{item.add_time |dateFormat()}}</span>
                </div>
                <div class="cmt-body">
                    {{item.content}}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore" :style="'display:'+showMoreFlag">加载更多</mt-button>
    </div>
   
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            pageIndex:1,//默认展示第一页数据
            comments:[],//所有评论数据
            showMoreFlag:'block',//加载更多 按钮的显示隐藏标志
            msg:'',//评论输入的内容
        }
    },
    created(){
        this.getComments();
    },
    methods:{
        getComments(){//获取评论
            this.$http.get('../../Data/commentInfo/'+this.id+'comment'+this.pageIndex+'.json').then(result=>{
                 if(result.status==200){ //此为本地数据，获取网络数据应该使用 if(result.body.status===0)
                    
                    this.comments=this.comments.concat(JSON.parse(result.bodyText));//this.newslist=result.body.message
                }else{
                    Toast('数据获取失败。。');
                }
            },function(){
                Toast('没得评论数据了。。');
                this.showMoreFlag='none';
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComments();
        },
        postComments(){//只能先做一个假的本地上传
            if(this.msg.trim().length==0){
                return Toast("评论内容不能为空！")
            };
            var cmt={user_name:'评论用户',add_time: Date.now(),content:this.msg.trim()};
            this.comments.unshift(cmt);
            this.msg='';
        }
    },
    props:["id"]
}
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 15px;
        color:lightslategrey;
        font-weight: normal;
        margin: 25px 0px 10px;
    }
    textarea{
        font-size: 14px;
        height:85px;
        margin: 0px;
        color:lightslategrey;
    }
    .cmt-list{
        margin: 5px 0px;
        .cmt-item{
            .cmt-title{
                background-color:linen;
                line-height: 30px;
                font-size: 15px;
                color:lightcoral;
                display: flex;
                justify-content: space-between;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
                font-size: 15px;
                color:#555
            }
        }
    }
}
</style>
