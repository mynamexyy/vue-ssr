<template>
  <div class="container">
    <div class="btn-con">
      <el-button type="primary" @click="adddialogVisible = true">添加谱子</el-button>
    </div>
    <AddGuitarModel :dialogVisible="adddialogVisible" :closeModel="closeModel"/>
  </div>
</template>

<script>
    import axios from "axios";
    export default {
        data(){
            return {
                guitarlist:[],
                adddialogVisible:false
            }
        },
        methods:{
           closeModel:function(target){
               this[target] = false;
           } 
        },
        mounted(){
            console.log(this)
            axios.get(`http://127.0.0.1:8888`).then(res => {
                console.log(res);
            })
        }
    }
</script>

<style>
</style>
