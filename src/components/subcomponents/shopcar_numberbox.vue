<template>
   <div class="mui-numbox" data-numbox-min='1' style="height:30px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChange" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
    mounted(){//初始化数字选择框组件
        mui(".mui-numbox").numbox();
    },
    methods:{
        countChange(){
            //每当购物车页面 商品数量值变化后，更新store（localstorage）里的参数
            this.$store.commit('updateGoodsInfo',{
                id:this.goodsid,
                count:this.$refs.numbox.value
            });
        }
    },
    props:["initcount","goodsid"]
}
</script>

<style lang="scss" scoped>

</style>
