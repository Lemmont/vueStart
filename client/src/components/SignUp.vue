<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'register',
  data() {
    return {
      email: '123@kaas.nl',
      password: '',
      showPassword: 'password',
      finished: false,
      errorMessages: {
        nameInput: '',
        emailInput: '',
        userFound: '',
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

      try {
        const res = await AuthenticationService.register({
          email: this.email,
          password: this.password,
        })
        console.log(res)
        const token = res.data.accessToken
        localStorage.setItem('token', token)
        console.log('succes')
        this.finished = true
      } catch (error) {
        if (error.status == 409) {
          console.error('409: User already found')
          this.errorMessages.userFound = 'User already registered'
        }
        return
      }
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
        <label :for="password">Password:</label>
      </div>
      <input
        :type="showPassword"
        :id="password"
        :name="password"
        v-model="password"
      />
    </div>
    <div class="showPassword formItem">
      <label :for="password">show password</label>
      <input
        type="checkbox"
        :id="showPassword"
        :name="showPassword"
        v-model="showPassword"
        true-value="text"
        false-value="password"
      />
    </div>
    <p style="color: red">{{ this.errorMessages.userFound }}</p>
    <button type="submit" class="primaryButton">Sign in</button>
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

.showPassword {
  display: flex;
  align-items: center;
}
.showPassword label {
  margin: 0 5px 0 0;
  font-size: 0.9rem;
}
</style>
