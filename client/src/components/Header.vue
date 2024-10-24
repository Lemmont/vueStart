<script>
export default {
  methods: {
    goToSignIn() {
      this.$router.push('/register')
    },
  },
}
</script>

<template>
  <header>
    <div>Vue Example</div>
    <div>
      <button @click="goToSignIn()" class="primaryButton" type="button">
        Sign in
      </button>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100vw;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 2vw;
  font-size: 1.1rem;
  background-color: var(--component-color);
  box-shadow: 1px 1px var(--shadow-color);
}
</style>
