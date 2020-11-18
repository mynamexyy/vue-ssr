<template>
  <div class="container">
      先假装有首页
      <nuxt-link to='/main/guitar'>吉他谱</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headdrop:[
        {
          command:'this.$router.push("/index/gobang")',
          value:'人机五子棋'
        },{
          command:'window.open("/bubble")',
          value:'运动的气泡'
        }
      ]
    };
  },
  methods: {
    handleCommand(command) {
      eval(command);
    }
  }
}
</script>

<style lang="scss">
  .header{
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: #757575;
    color: white;
    span{
      font-size: 24px;
      color: white;
    }
    .el-dropdown-link{
      font-size: 14px;
    }
    a{
      color: white;
      text-decoration: none;
      font-size: 14px;
    }
    .head-right>*{
      margin-right: 20px;
    }
  }
</style>
