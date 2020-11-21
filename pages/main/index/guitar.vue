<template>
  <div class="container guitar-con">
    <div class="btn-con">
      <el-button type="primary" @click="showModel('AddGuitarModel')">添加谱子</el-button>
    </div>
    <div class="guitars">
            <el-card :body-style="{ padding: '0px' }" v-for="item in guitarlist" :key="item.id">
                <img :src="$global.host+'/img?name='+item.imgs[0]" class="image">
                <div style="padding: 14px;">
                    <span v-text="item.name">好吃的汉堡</span>
                    <div class="bottom clearfix">
                        <time class="time">{{ item.createDate }}</time>
                    </div>
                    <el-button type="text" class="button" @click="open(item.id)">查看</el-button>
                    <el-button type="text" class="button" @click="deleteGuitar(item.id)">删除</el-button>
                </div>
            </el-card>
    </div>
    <AddGuitarModel :getData="getData" ref="AddGuitarModel"/>
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
           },
           getData:function(){
                axios.get(this.$global.host).then(res => {
                    this.guitarlist = res.data;
                })
           },
           open:function(id){
               this.$store.commit('setGuitarId',id);
               this.$router.push("/main/guitarshow")
           },
           deleteGuitar:function(id){
               axios.delete(this.$global.host,{	
                        params: {	// 请求参数拼接在url上
                            id: id
                        }
                    }).then(res => {
                        this.getData();
                })
           }
        },
        mounted(){
            this.getData();
        }
    }
</script>

<style lang="scss">
    .guitar-con{
        margin: 20px;
        .btn-con{
            margin-left: 30px;
            margin-bottom: 30px;
        }
        .guitars{
            display: flex;
            .el-card{
                width: 15%;
                margin-right: 30px;
                img{
                    width: 100%;
                    height: 300px;
                }
            }
        }
        
    }
</style>
