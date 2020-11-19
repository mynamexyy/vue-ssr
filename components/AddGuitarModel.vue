<template>
    <el-dialog
        title="提示"
        v-if="dialogVisible"
        :visible.sync="dialogVisible"
        :close-on-click-modal=false
        :modal=true
        width="30%">
        <div class="name-con">
            <span>歌名:</span>
            <el-input @input="onNameChange" v-model="name" placeholder="请输入内容"></el-input>
        </div>
        <div class="img-con">
            <span>谱子:</span>
            <el-upload
                :action="$global.host"
                list-type="picture-card"
                :on-change="onFileChange"
                :on-preview="handlePictureCardPreview"
                :auto-upload=true
                :on-success="onSuccess"
                :before-upload="beforeAvatarUpload"
                :data="{id:id,name:name}"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog 
                    :visible.sync="imgdialogVisible" 
                    :modal=false
                    :close-on-click-modal=false>
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel()">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    import axios from "axios";
    export default {
        data(){
            return {
                name:'',
                dialogImageUrl: '',
                imgdialogVisible: false,
                dialogVisible:false,
                id: String(Math.floor(Math.random() * 100000)) + (new Date()).getTime(),
                imgs:[],
                timeout:null,
                hassamename:false
            }
        },
        methods:{
            submit:function(){
                console.log(this.hassamename);
                if(!this.name){
                    this.$message.error('谱名不能为空!');
                }else if(!this.imgs.length){
                    this.$message.error('吉他谱图至少得有一张!');
                }else if(this.hassamename){
                    this.$message.error('有重复谱名!');
                }else{
                    this.setDialogVisible(false);
                }
            },
            onFileChange:function(file, fileList){
                this.imgs = fileList;
            },
            onSuccess:function(res,file, fileList){
                file.url = this.$global.host+"/img?name="+res.filename;
                file.filename = res.filename;
            },
            onNameChange:function(val){
                console.log(val);
                var that = this;
                if(that.timeout){
                    clearTimeout(that.timeout);
                }
                that.timeout = setTimeout(function(){
                    if(val){
                        axios.get(that.$global.host,{	
                                params: {	
                                    id: that.id,
                                    name: val
                                }
                            }).then(res => {
                                if(res.data.id && res.data.id != that.id){
                                    console.log("有重复谱名！");
                                    that.hassamename = true;
                                }else{
                                    that.hassamename = false;
                                }
                        })
                    }
                },50)
            },
            handleRemove(file, fileList) {
                axios.delete(this.$global.host+"/img",{	
                        params: {
                            id: this.id,
                            name: file.filename
                        }
                    }).then(res => {
                    console.log(res);
                })
            },
            beforeAvatarUpload(file) {
                const isimg = file.type.split("/")[0] === 'image';
                if (!isimg) {
                    this.$message.error('谱子必须是图片!');
                }
                // return isJPG;
                return isimg;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.imgdialogVisible = true;
            },
            setDialogVisible(val){
                this.dialogVisible = val;
                this.name = '';
                this.imgs=[];
                this.id=String(Math.floor(Math.random() * 100000)) + (new Date()).getTime();
            },
            cancel(){
                axios.delete(this.$global.host,{	
                        params: {	// 请求参数拼接在url上
                            id: this.id
                        }
                    }).then(res => {
                        this.setDialogVisible(false);
                })
            }
        },
        mounted(){
            console.log(this.$global.host)
        }
    }
</script>
<style>
.NuxtLogo {
  animation: 1s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
