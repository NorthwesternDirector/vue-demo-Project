<template>
    <div>
        <h3>功能待开发中...</h3>
        <div id="subDiv">
        <!-- <h4>哈哈</h4> -->
        </div>
    </div>

    

</template>

<script>


var removeElement = function(nums, val) {
    for(var i=0;i<nums.length;i++){
        console.log(i);
        if(nums[i]==val){
            nums.splice(i,1);
            i--;
        }
    };
};
removeElement([3,2,2,3],3)

</script>

<style lang="scss" scoped>
$color:rgb(253, 184, 255);
$className:subDiv; 
div{
    ##{$className}{color:$color;}
}
</style>

