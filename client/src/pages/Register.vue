<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SignUp from '@/components/SignUp.vue'

export default {
  data() {
    return {}
  },
  components: {
    Header,
    Footer,
    SignUp,
  },
}
</script>

<template>
  <div class="wrapper">
    <Header></Header>
    <div class="content centerContent">
      <!-- content of page -->
      <SignUp></SignUp>
    </div>
    <Footer></Footer>
  </div>
</template>
