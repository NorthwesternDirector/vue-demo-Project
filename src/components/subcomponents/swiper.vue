<template>
    <div>
         <!-- 轮播图 -->
         <!-- 将来谁使用此组件，谁为我们传lunbotulist，lunbotuList为父子组件传值 -->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.src">
                <img :src="item.src" alt="" :class="{'full':isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    methods:{

    },
    props:["lunbotuList","isfull"]
}
</script>

<style lang="scss" scoped>
//轮播图样式调整
    .mint-swipe{
        height:200px;
        //sass语法
        .mint-swipe-item{
            text-align: center;
            img{
                height:100%
            }
        }
    }
    .full{
        width:100%;
    }
</style>
