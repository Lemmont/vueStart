<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'register',
  data() {
    return {
      email: '123@kaas.nl',
      name: 'bling123 ',
      finished: false,
      errorMessages: {
        nameInput: '',
        emailInput: '',
      },
    }
  },
  watch: {
    email(value) {
      console.log('email has changed', value)
    },
  },

  methods: {
    async signUp(e) {
      e.preventDefault()
      // form validation?
      // if (true) {
      //   this.errorMessages.nameInput = 'Not correct'
      //   return
      // }

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
    <h2>Sign in to your account</h2>
    <div class="formItem">
      <div>
        <label :for="email">Email:</label>
      </div>
      <input type="text" :id="email" :name="email" v-model="email" />
      <div>
        {{ errorMessages.nameInput }}
      </div>
    </div>

    <div class="formItem">
      <div>
        <label :for="name">Name:</label>
      </div>
      <input type="text" :id="name" :name="name" v-model="name" />
    </div>

    <button type="submit" class="primaryButton">submit</button>
  </form>
</template>

<style scoped>
form {
  padding: 2vh;
  border: 1px solid var(--shadow-color);
  border-radius: 2%;
}

h2,
.formItem {
  margin: 0 0 10px 0;
}

.formItem:last-of-type {
  margin: 0 0 2vh 0;
}

input {
  font-size: 1.1rem;
  padding: 5px;
  border: 1px solid gray;
  border-radius: 5px;
}

label {
  font-size: 1.1rem;
}
</style>
