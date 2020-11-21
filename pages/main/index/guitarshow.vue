<template>
  <div class="container guitarimg-con">
        <img v-for="item in data.imgs" :key="item" :src="$global.host+'/img?name='+item"/>
  </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            data:{}
        }
    },
    methods: {
        
    },
    mounted(){
        console.log();
        axios.get(this.$global.host,
            {	
                params: {	// 请求参数拼接在url上
                    id: this.$store.state.guitarid
                }
            }).then(res => {
                this.data = res.data;
        });
    }
}
</script>

<style lang="scss">
.guitarimg-con{
    display: flex;
    img{
        width: 33%;
    }
}
</style>
