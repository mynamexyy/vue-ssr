<template>
  <div class="container">
    <div class="btn-con">
      <el-button type="primary" @click="showModel('AddGuitarModel')">添加谱子</el-button>
    </div>
    <AddGuitarModel ref="AddGuitarModel"/>
  </div>
</template>

<script>
    import axios from "axios";
    export default {
        data(){
            return {
                guitarlist:[]
            }
        },
        methods:{
           showModel:function(target){
               console.log(this);
               this.$refs[target].setDialogVisible(true);
           } 
        },
        mounted(){
            console.log(this)
            axios.get(this.$global.host).then(res => {
                console.log(res);
            })
        }
    }
</script>

<style>
</style>
