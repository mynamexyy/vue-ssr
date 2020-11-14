<template>
  <div class="container">
    <!-- <div class="btn-con">
        <el-button type="primary" @click="reStart()">重新开始</el-button>
    </div> -->
    <canvas id="chess" width="450px" height="450px"></canvas>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
            <span>{{info}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="reStart()">重新开始</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    data() {
    return {
      headdrop:[],
      info:'',
      dialogVisible:false
    };
  },
  methods: {
    handleCommand(command) {
      eval(command);
    },
    reStart(){
        window.location.reload();
    }
  },
  beforeCreate:function(){
      console.log('beforeCreate');
  },
  created:function(){
      console.log('created');
  },
  beforeMount:function(){
      console.log('beforeMount');
  },
  mounted:function(){
    console.log(this);
    var _this = this;
    //判断黑白棋谁下
    var me=true;
    //判断下棋是否继续
    var over = false;
    //赢法数组
    var wins=[];
    //统计数组
    var myWins=[];
    var comWins=[];
    //创建三维数组
    for(var i=0;i<15;i++){
        wins[i]=[];
        for(var j=0;j<15;j++){
            wins[i][j]=[];
        }
    }
    //赢法种类统计
    var count = 0;
    //统计横向赢法数组
    for(var i=0;i<15;i++){
        for(var j=0;j<11;j++){
            for(var k=0;k<5;k++){
                //第i行  第j列  往后五个
                wins[i][j+k][count] = true;
            }
            count++;
        }
    }
    //统计纵向赢法数组
    for(var i=0;i<15;i++){
        for(var j=0;j<11;j++){
            for(var k=0;k<5;k++){
                //第i列  第i+j行  往后五个
                wins[j+k][i][count] = true;
            }
            count++;
        }
    }
    //统计斜线赢法数组
    for(var i=0;i<11;i++){
        for(var j=0;j<11;j++){
            for(var k=0;k<5;k++){
                //第i+k列  第j+k行  斜后五个
                wins[i+k][j+k][count] = true;
            }
            count++;
        }
    }
    //统计反斜线赢法数组
    for(var i=0;i<11;i++){
        for(var j=14;j>3;j--){
            for(var k=0;k<5;k++){
                //第i+k列  第j+k行  斜后五个
                wins[i+k][j-k][count] = true;
            }
            count++;
        }
    }
    //初始化统计数组
    for(var i=0;i<count;i++){
        myWins[i]=0;
        comWins[i]=0;
    }

    //存储棋盘的落子地
    var chessBorder=[];
    for(var i=0;i<15;i++){
        chessBorder[i]=[];
        for(var j=0;j<15;j++){
            chessBorder[i][j] = 0;
        }
    }
    //获取棋盘
    var chess = document.getElementById("chess");
    var context = chess.getContext('2d');
    //设置线条的颜色
    context.strokeStyle = "#BFBFBF";

    //获取背景图片
    var logo = new Image();
    logo.src = "../imgs/back.jpg";
    logo.onload = function(){
        context.drawImage(logo,0,0,450,450);
        drawChessBorder();
    }

    //划横线方法
    var drawChessBorder = function(){
        for(var i=0;i<15;i++){
            //画出横线
            context.moveTo(15 + i*30,15);
            context.lineTo(15 + 30*i,435);
            context.stroke();
            //画出竖线
            context.moveTo(15,15 +30*i);
            context.lineTo(435,15 + 30*i);
            context.stroke();
        }
    }

    //画出棋子  （i,j为棋子坐标，true黑棋，false白棋）
    var oneStep = function(i,j,me){
        context.beginPath();
        context.arc(15 + 30*i,15 + 30*j,13,0,2*Math.PI);
        context.closePath();
        //设置渐变色对象
        var grad=context.createRadialGradient(15 + 30*i+2,15 + 30*j-2,13,15 + 30*i+2,15 + 30*j-2,0);
        if(me){
            //设置渐变色
            grad.addColorStop(0,"#0A0A0A");
            grad.addColorStop(1,"#636363");
        }else{
            grad.addColorStop(0,"#bdbdbd");
            grad.addColorStop(1,"#F9F9F9");
        }
        //填充
        context.fillStyle=grad;
        context.fill();
    }
    //点击下棋
    chess.onclick = function(e){
        if(over){
            return;
        }
        if(!me){
            return;
        }
        var x=e.offsetX;
        var y=e.offsetY;
        var i=Math.floor(x /30);
        var j=Math.floor(y /30);
        if(chessBorder[i][j]==0){
            oneStep(i,j,me);
            //黑子标记为1  白子标记为2
            chessBorder[i][j] = 1;
            for(var k=0;k<count;k++){
                if(wins[i][j][k]){
                    myWins[k]++;
                    comWins[k]=-1;
                    if(myWins[k]==5){
                        _this.info = "你赢了";
                        _this.dialogVisible = true;
                        over=true;
                    }
                }
            }
            if(!over){
                me=!me;
                computerAI();
            }
        }
    }

    var computerAI = function(){
        var myScore=[];
        var comScore=[];
        //保存最高分数
        var max=0;
        //保存最高分数的坐标
        var u=0,v=0;
        //初始化二维分数
        for(var i=0;i<15;i++){
            myScore[i]=[];
            comScore[i]=[];
            for(var j=0;j<15;j++){
                myScore[i][j]=0;
                comScore[i][j]=0;
            }
        }
        //遍历棋盘
        for(var i=0;i<15;i++){
            for(var j=0;j<15;j++){
                if(chessBorder[i][j]==0){
                    //遍历所有的赢法   分数会进行累加
                    for(var k=0;k<count;k++){
                        if(wins[i][j][k]){
                            //拦截    通过遍历对方连子多少
                            if(myWins[k]==1){
                                myScore[i][j]+=200;
                            }else if(myWins[k]==2){
                                myScore[i][j]+=400;
                            }else if(myWins[k]==3){
                                myScore[i][j]+=2000;
                            }else if(myWins[k]==4){
                                myScore[i][j]+=10000;
                            }
                            //自己连子    通过遍历自己连子多少
                            if(comWins[k]==1){
                                comScore[i][j]+=220;
                            }else if(comWins[k]==2){
                                comScore[i][j]+=420;
                            }else if(comWins[k]==3){
                                comScore[i][j]+=2100;
                            }else if(comWins[k]==4){
                                comScore[i][j]+=20000;
                            }
                        }
                    }
                    //遍历完后，记录myScore最高分
                    if(myScore[i][j]>max){
                        max=myScore[i][j];
                        u=i;
                        v=j;
                    }else if(myScore[i][j]==max){
                        if(comScore[i][j]>comScore[u][v]){
                            u=i;
                            v=j;
                        }
                    }
                    //遍历完后，记录comScore最高分
                    if(comScore[i][j]>max){
                        max=comScore[i][j];
                        u=i;
                        v=j;
                    }else if(comScore[i][j]==max){
                        if(myScore[i][j]>myScore[u][v]){
                            u=i;
                            v=j;
                        }
                    }
                }
            }
        }
        oneStep(u,v,false);
        chessBorder[u][v]=2;
        for(var k=0;k<count;k++){
            if(wins[u][v][k]){
                comWins[k]++;
                myWins[k]=-1;
                if(comWins[k]==5){
                    _this.info = "电脑赢了";
                    _this.dialogVisible = true;
                    over=true;
                }
            }
        }
        if(!over){
            me=!me;
        }
    }
    //重新开始
    function reStart(){
        window.location.reload();
    }

  },
  beforeUpdate:function(){
      console.log('beforeUpdate');
  },
  updated:function(){
      console.log('updated');
  },
  beforeDestroy:function(){
      console.log('beforeDestroy');
  },
  destroyed:function(){
      console.log('destroyed');
  }
}
</script>

<style>
    canvas{
        display: block;
        margin: 10px auto;
        box-shadow: -2px -2px 2px #EFEFEF,5px 5px 5px #898989;
    }
    .btn-con{
        width: 450px;
        margin: 10px auto;
    }
</style>
