<template>
  <div class="container">
    <div class="header">
        <div class="head-left">
            <span>
              XYY
            </span>
        </div>
        <div class="head-right">
            <nuxt-link to='/index/guitar'>吉他谱</nuxt-link>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                 小玩意儿<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in headdrop" :key="item.command" :command="item.command">{{item.value}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
    <!-- <router-view></router-view> -->
      <nuxt-child></nuxt-child>
    <!-- <router-view name="otherpages"></router-view> -->
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
