<template>
   <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="numbox"/>
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
            //每当文本框的数据被修改后，就把数据传给父组件（通过事件调用）
            //console.log(this.$refs.numbox.value);
            this.$emit('getcount',parseInt(this.$refs.numbox.value));
        }
    },
    props:["max"],
    watch:{
        'max':function(newVal,oldVal){//通过数据监听来改变数字框的max值
            mui(".mui-numbox").numbox().setOption("max",newVal)
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
