<template>
  <div class="container">
      <div class="head-left">
          <span>
            otherpages
          </span>
      </div>
      <router-view name="otherpages"></router-view> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      headdrop:[
        {
          command:'window.open("/otherpage")',
          value:'人机五子棋'
        },{
          command:'bo',
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
