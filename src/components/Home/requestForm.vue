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
      <v-text-field
        label="Last name"
        v-model="lastName"
        :error-messages="lastNameErrors"
        @input="$v.lastName.$touch()"
        @blur="$v.lastName.$touch()"
        required
        box
      ></v-text-field>
      <v-text-field
        label="E-mail"
        v-model="email"
        :error-messages="emailErrors"
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
        required
        box
      ></v-text-field>
      <v-text-field
        label="Address of location to be cleaned"
        v-model="address"
        :error-messages="addressErrors"
        @input="$v.address.$touch()"
        @blur="$v.address.$touch()"
        required
        box
      ></v-text-field>
      <v-text-field
        class="work-description"
        label="Description of work, location information, etc."
        v-model="workDescription"
        :error-messages="workDescriptionErrors"
        @input="$v.workDescription.$touch()"
        @blur="$v.workDescription.$touch()"
        required
        multi-line
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
    mixins: [validationMixin],

    validations: {
      firstName: {
        required,
        maxLength: maxLength(255),
      },
      lastName: {
        required,
        maxLength: maxLength(255),
      },
      email: {
        required,
        email,
        maxLength: maxLength(255),
      },
      address: {
        required,
        maxLength: maxLength(255),
      },
      workDescription: {
        required,
        maxLength: maxLength(65536),
      },
    },

    data () {
      return {
        firstName: 'Fake',
        lastName: 'Person',
        email: 'fake@person.com',
        address: '123 Fake St.',
        workDescription: 'sadasdasdsadasd',

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
            const request = axios.post('http://localhost:3000/guest/job_requests', {
              address: this.address,
              description: this.workDescription,
              guest_first_name: this.firstName,
              guest_last_name: this.lastName,
              guest_email: this.email,
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
        this.lastName = ''
        this.email = ''
        this.address = ''
        this.workDescription = ''
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
      lastNameErrors () {
        const errors = []
        if (!this.$v.lastName.$dirty) return errors
        !this.$v.lastName.maxLength && errors.push('Last name must be at most 255 characters long')
        !this.$v.lastName.required && errors.push('Last name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      addressErrors () {
        const errors = []
        if (!this.$v.address.$dirty) return errors
        !this.$v.address.maxLength && errors.push('Address must be at most 255 characters long')
        !this.$v.address.required && errors.push('Address is required')
        return errors
      },
      workDescriptionErrors () {
        const errors = []
        if (!this.$v.workDescription.$dirty) return errors
        !this.$v.workDescription.maxLength && errors.push('Work description must be at most 65536 characters long')
        !this.$v.workDescription.required && errors.push('Work description is required')
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
