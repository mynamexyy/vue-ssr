<template>
  <div class="container">
      <div class="head-left">
          <span>
            假装有首页
          </span>
      </div>
      <!-- <nuxt name="otherpages"/> -->
      <nuxt-child keep-alive:foobar="123"></nuxt-child>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headdrop:[
        {
          command:'window.open("/gobang")',
          value:'人机五子棋'
        },{
          command:'window.location.href="./index/gobang"',
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

<style>

</style>
