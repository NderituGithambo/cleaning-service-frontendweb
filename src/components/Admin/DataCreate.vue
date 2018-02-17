<template>
  <div class="wrapper">
    <h1>Request Service</h1>
    <br/>
    <h2>Fill out the form below and we will respond to you as soon as possible.</h2>

    <form>
      <v-text-field
        label="First name"
        v-model="firstName"
        :error-messages="firstNameErrors"
        @input="$v.firstName.$touch()"
        @blur="$v.firstName.$touch()"
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
import { required, maxLength, email, numeric } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  props: {
    dataModel: {
      type: String,
      required: true,
    }
  },

  mixins: [validationMixin],

  validations: {
    firstName: {
      required,
      maxLength: maxLength(255),
    },
  },

  data () {
    return {
      firstName: 'Fake',

      maskPhone: 'phone',
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
          const request = axios.post('http://localhost:3000/admin/${dataModel}s', {
            address: this.address,
          })
          const response = await request
          if (response.status === 200) {
            setTimeout(() => {
              this.clear()
              this.isLoading = false
              this.isSubmitDisabled = false
              this.indicateRequestReceived()
            }, 1000)
          }
        } catch (e) {
          console.log(e)
        }
      }
    },

    clear() {
      this.$v.$reset()
      this.firstName = ''
    },
  },

  computed: {
    firstNameErrors () {
      const errors = []
      if (!this.$v.firstName.$dirty) return errors
      !this.$v.firstName.maxLength && errors.push('First name must be at most 255 characters long')
      !this.$v.firstName.required && errors.push('First name is required.')
      return errors
    },
  }
}
</script>



<style lang="scss" scoped>
@import "../../colors.scss";

.wrapper {
  padding: 1em;
  background-color: $zero-opacity;
  width: 100%;

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
