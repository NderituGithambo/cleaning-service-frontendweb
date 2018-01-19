<template>
  <div class="wrapper">
    <h1>Admin Log in</h1>
    <br/>

    <form>
      <v-text-field
        label="Username"
        v-model="username"
        :error-messages="usernameErrors"
        @input="$v.username.$touch()"
        @blur="$v.username.$touch()"
        required
        box
      ></v-text-field>
      <v-text-field
        label="Password"
        v-model="password"
        :error-messages="passwordErrors"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
        type="password"
        required
        box
      ></v-text-field>

      <div class="button-container">
        <v-btn
          @click="clear"
        >
          clear
        </v-btn>

        <v-btn
          @click="submit"
          :loading="isLoading"
          :disabled="isSubmitDisabled"
        >
          submit
        </v-btn>
      </div>

    </form>
  </div>
</template>



<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength } from 'vuelidate/lib/validators'
  import axios from 'axios'

  export default {
    mixins: [validationMixin],
    validations: {
      username: {
        required,
        maxLength: maxLength(255),
      },
      password: {
        required,
        maxLength: maxLength(255),
      },
    },

    data () {
      return {
        username: 'admin_user99',
        password: 'password',

        isLoading: false,
        isSubmitDisabled: false,
      }
    },

    props: ['indicateRequestReceived'],

    methods: {
      async submit() {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.isSubmitDisabled = true
          this.isLoading = true
          try {
            const request = axios.post('http://localhost:3000/authenticate', {
              username: this.username,
              password: this.password,
            })
            const response = await request
            setTimeout(() => {
              this.clear()
              this.isLoading = false
              this.isSubmitDisabled = false
              const token = response.data.auth_token
              localStorage.setItem("token", token)
              this.$router.push({ path: '/admin' })
            }, 1000)
          } catch (error) {
            console.log(error)
            setTimeout(() => {
              this.isLoading = false
              this.isSubmitDisabled = false
            }, 1000)
          }
        }
      },

      clear() {
        this.$v.$reset()
        this.username = ''
        this.password = ''
      },
    },

    computed: {
      usernameErrors () {
        const errors = []
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.required && errors.push('Username name is required.')
        !this.$v.username.maxLength && errors.push('Username must be at most 255 characters long')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required')
        !this.$v.password.maxLength && errors.push('Password must be at most 255 characters long')
        return errors
      },
    }
  }
</script>



<style lang="scss" scoped>
@import "../../colors.scss";

.wrapper {
  padding: 1em;
  width: 80%;
  height: 60vh;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;

  h2 {
    text-align: left;
    font-size: 1em;
    word-break: keep-all;
    padding: 0.5em;
  }

  a {
    color: #000;
  }

  form {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .input-group {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .button-container {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
