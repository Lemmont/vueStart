<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'register',
  data() {
    return {
      email: '123@kaas.nl',
      name: 'bling123 ',
      finished: false,
    }
  },
  watch: {
    email(value) {
      console.log('email has changed')
    },
  },

  methods: {
    async signUp(e) {
      e.preventDefault()
      // form validation?

      // do backend stuff
      // complete

      const res = await AuthenticationService.register({
        email: this.email,
        name: this.name,
      })

      if (res.statusText == 'OK') {
        console.log(res.data)
        this.finished = true
      } else {
        // nothing
      }

      // succes?
    },
  },
}
</script>

<template>
  <form v-if="!finished" @submit="signUp" method="post" autocomplete="on">
    <div class="formItem">
      <div>
        <label :for="email">Email:</label>
      </div>
      <input type="text" :id="email" :name="email" v-model="email" />
    </div>

    <div class="formItem">
      <div>
        <label :for="name">Name:</label>
      </div>
      <input type="text" :id="name" :name="name" v-model="name" />
    </div>

    <button type="submit">submit</button>
  </form>
</template>

<style scoped>
form {
  padding: 1vh;
  border: 1px solid black;
}

input {
  font-size: 1rem;
  padding: 5px;
  border: 1px solid gray;
  border-radius: 5px;
}

.formItem:not(:last-child) {
  margin: 0 0 10px 0;
}
</style>
