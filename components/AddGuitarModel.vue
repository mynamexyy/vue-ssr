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
            <el-input v-model="name" placeholder="请输入内容"></el-input>
        </div>
        <div class="img-con">
            <span>谱子:</span>
            <el-upload
                action="http://127.0.0.1:8888"
                list-type="picture-card"
                :on-change="onFileChange"
                :on-preview="handlePictureCardPreview"
                :auto-upload=true
                :on-success="onSuccess"
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
                guitarlist:[],
                name:'',
                dialogImageUrl: '',
                imgdialogVisible: false,
                dialogVisible:false,
                id: String(Math.floor(Math.random() * 100000)) + (new Date()).getTime(),
                imgs:[]
            }
        },
        methods:{
            submit:function(){
                console.log("校验")
            },
            onFileChange:function(file, fileList){
                this.imgs = fileList;
                console.log(file, fileList);
            },
            onSuccess:function(res,file, fileList){
                file.url = "http://127.0.0.1:8888/img?name="+res.filename;
                file.filename = res.filename;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
                axios.delete("http://127.0.0.1:8888/img",{	
                        params: {	// 请求参数拼接在url上
                            id: this.id,
                            name: file.filename
                        }
                    }).then(res => {
                    console.log(res);
                })
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.imgdialogVisible = true;
            },
            setDialogVisible(val){
                this.dialogVisible = val;
                this.name = '';
            },
            cancel(){
                axios.delete("http://127.0.0.1:8888",{	
                        params: {	// 请求参数拼接在url上
                            id: this.id
                        }
                    }).then(res => {
                        this.setDialogVisible(false);
                })
            }
        },
        mounted(){
            
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
