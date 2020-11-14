<template>
  <!-- <div class="container"> -->
    <img class="red" src="../../static/imgs/红泡.png" alt="">
  <!-- </div> -->
</template>

<script>
export default {
    mounted:function(){
        var con = document.getElementsByTagName("body")[0];
        var move = document.getElementsByClassName("red")[0];
        //获取浏览器宽高
        var clientW = document.documentElement.clientWidth || document.body.clientWidth;
        var clientH = document.documentElement.clientHeight || document.body.clientHeight;
        var blues = [];
        //生成蓝泡的函数
        function createBlue(size){
            var nblue = document.createElement("img");
            nblue.className="blue";
            nblue.style.top = Math.floor(Math.random()*clientH)-size + "px";
            nblue.style.left = Math.floor(Math.random()*clientW)-size + "px";
            nblue.style.width = size + "px";
            nblue.style.height = size + "px";
            nblue.setAttribute("src","../imgs/蓝泡.png");
            //生成小球运动的方向及速度
            nblue.directionX = Math.random()*2-1;
            nblue.directionY = Math.random()*2-1;
            blues.push(nblue);
            return nblue;
        }
        //随机生成30到40个蓝泡
        for (var i = 0; i < (Math.floor(Math.random()*11)+30); i++) {
            //蓝泡大小为40到60px
            con.appendChild(createBlue(Math.floor(Math.random()*21)+40));
        };
        //红泡泡移动
        move.onmousedown = function(e){
            var ev = window.event || e;
            e.preventDefault();
            var poX = ev.clientX - move.offsetLeft;
            var poY = ev.clientY - move.offsetTop;
            document.onmousemove = function(){
            var ev = window.event || e;
            var l = ev.clientX + move.clientWidth/2 - poX;
            var t = ev.clientY + move.clientHeight/2 - poY;
            if (l < 0) {
                l = 0;
            }
            if (t < 0) {
                t = 0;
            }
            if (l <= move.clientWidth/2) {
                    l = move.clientWidth/2;
            }
            if (l >= clientW - move.clientWidth/2) {
                    l = clientW - move.clientWidth/2-3;
            }
            if (t <= move.clientHeight/2) {
                    t = move.clientHeight/2;
            }
            if (t >= clientH - move.clientHeight/2) {
                    t = clientH - move.clientHeight/2-3;
            }
            move.style.left = l + "px";
            move.style.top = t + "px";
            for (var i = 0; i < blues.length; i++) {
            if(blues[i].offsetLeft-move.offsetLeft<=move.clientWidth-5&&blues[i].offsetLeft-move.offsetLeft>=-blues[i].clientWidth+5&&blues[i].offsetTop-move.offsetTop<=move.clientWidth-10&&blues[i].offsetTop-move.offsetTop>=-blues[i].clientWidth+10){
                //改变运动方向
                blues[i].directionX = (blues[i].offsetLeft-move.offsetLeft)/(30);
                blues[i].directionY = (blues[i].offsetTop-move.offsetTop)/(30);
            }}

            }
            }
        document.onmouseup = function(){
            document.onmousemove = null;
        }
        //小球动画效果
        //speed是小球的速度系数
        var speed = 10;
        setInterval(function(){
            for (var i = 0; i < blues.length; i++) {
            //如果小球碰到边界，则在对面生成一个新的
            //blues[i].isClone标记已经被克隆的，防止重复克隆
            if (blues[i].offsetLeft+blues[i].clientWidth>=clientW&&!blues[i].isClone&&blues[i].directionX>0){
                var nblue =  blues[i].cloneNode(false);
                nblue.style.left = -blues[i].clientWidth + "px";
                //设置运动系数
                nblue.directionX = blues[i].directionX;
                nblue.directionY = blues[i].directionY;
                blues[i].isClone = true;
                blues.push(nblue);
                con.appendChild(nblue);
            }
            if (blues[i].offsetTop+blues[i].clientWidth>=clientH&&!blues[i].isClone&&blues[i].directionY>0){
                var nblue =  blues[i].cloneNode(false);
                nblue.style.top = -blues[i].clientHeight + "px";
                nblue.directionX = blues[i].directionX;
                nblue.directionY = blues[i].directionY;
                blues[i].isClone = true;
                blues.push(nblue);
                con.appendChild(nblue);
            }
            if (blues[i].offsetTop<0&&!blues[i].isClone&&blues[i].directionY<0){
                var nblue =  blues[i].cloneNode(false);
                nblue.style.top = clientH + "px";
                nblue.directionX = blues[i].directionX;
                nblue.directionY = blues[i].directionY;
                blues[i].isClone = true;
                blues.push(nblue);
                con.appendChild(nblue);
            }
            if (blues[i].offsetLeft<0&&!blues[i].isClone&&blues[i].directionX<0){
                var nblue =  blues[i].cloneNode(false);
                nblue.style.left = clientW + "px";
                nblue.directionX = blues[i].directionX;
                nblue.directionY = blues[i].directionY;
                blues[i].isClone = true;
                blues.push(nblue);
                con.appendChild(nblue);
            }
            //清除看不到了的小球
            if (blues[i].offsetLeft+blues[i].clientWidth<0||blues[i].offsetTop+blues[i].clientWidth<0||blues[i].offsetLeft-blues[i].clientWidth>clientW||blues[i].offsetTop-blues[i].clientWidth>clientH){
                con.removeChild(blues[i]);
                blues.splice(i,1);
            };
            //判断是否发生碰撞
            if(blues[i].offsetLeft-move.offsetLeft<=move.clientWidth-5&&blues[i].offsetLeft-move.offsetLeft>=-blues[i].clientWidth+5&&blues[i].offsetTop-move.offsetTop<=move.clientWidth-10&&blues[i].offsetTop-move.offsetTop>=-blues[i].clientWidth+10){
                //改变运动方向
                blues[i].directionX = (blues[i].offsetLeft-move.offsetLeft)/(30);
                blues[i].directionY = (blues[i].offsetTop-move.offsetTop)/(30);
            }
            blues[i].style.left = blues[i].offsetLeft + speed*blues[i].directionX + "px";
            blues[i].style.top = blues[i].offsetTop + speed*blues[i].directionY + "px";
            };
        },40)


        this.$notify.info({
          title: '规则二',
          message: '蓝泡大小、运动方向、初始速度均随机，从一边消失后从另一边出来',
          duration: 0
        });
        this.$notify.info({
          title: '规则一',
          message: '红泡可拖动且与蓝泡产生碰撞反应',
          duration: 0
        });
    }
}
</script>

<style>
  body{
  overflow: hidden;
  }
  .red{
      display: block;
      position: absolute;
      width:50px;
      height: 50px;
      margin-top: -25px;
      margin-left: -25px;
      top:50%;
      left: 50%;
      cursor: move;
  }
  .blue{
      display: block;
      position: absolute;
  }
</style>
