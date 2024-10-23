<script>
export default {
  components: {},
  data() {
    return {
      count: 0,
    }
  },
}
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>
