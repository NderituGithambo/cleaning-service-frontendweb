<template>
  <div>
    <h1>Request Service</h1>

    <br/>
    <h2>Please fill out the form below and we will respond to you as soon as possible.</h2>
    <br/>
    <h3>Or if you would like to become a regular customer, <router-link to="/register">please register here.</router-link></h3>
    <br/>

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
        label="Phone number"
        v-model="phoneNumber"
        :error-messages="phoneNumberErrors"
        @input="$v.phoneNumber.$touch()"
        @blur="$v.phoneNumber.$touch()"
        required
        :mask="maskPhone"
        box
      ></v-text-field>
      <br/>
      <v-card flat class="preferred-contact-card">
        <v-card-text class="text-card-radio">
          <v-radio-group
            label="Preferred method of contact"
            v-model="preferredContact"
            row
          >
            <v-radio label="E-mail" value="email"></v-radio>
            <v-radio label="Phone" value="phone"></v-radio>
          </v-radio-group>
        </v-card-text>
      </v-card>
      <br/>
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
        label="Description of work, location information, etc."
        v-model="workDescription"
        :error-messages="workDescriptionErrors"
        @input="$v.workDescription.$touch()"
        @blur="$v.workDescription.$touch()"
        required
        multi-line
        box
      ></v-text-field>
      <v-text-field
        label="Best cleaning times (Example: 6-8pm Monday Nov. 16th)"
        v-model="availableTimes"
        :error-messages="availableTimesErrors"
        @input="$v.availableTimes.$touch()"
        @blur="$v.availableTimes.$touch()"
        box
      ></v-text-field>
      <v-text-field
        label="Hours of cleaning requested"
        v-model="quantityHours"
        :error-messages="quantityHoursErrors"
        @input="$v.quantityHours.$touch()"
        @blur="$v.quantityHours.$touch()"
        box
      ></v-text-field>

      <br/><br/><v-divider></v-divider><br/>
      <v-checkbox
        label="Would you like to book an interview for regular service?"
        v-model="checkbox"
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
      ></v-checkbox>
      <v-text-field
        label="When are you available for the interview?"
        v-model="availableInterviewTimes"
        :error-messages="availableInterviewTimesErrors"
        @input="$v.availableInterviewTimes.$touch()"
        @blur="$v.availableInterviewTimes.$touch()"
        :disabled="!checkbox"
        box
      ></v-text-field>
      <v-text-field
        label="Anything else we should know for the interview?"
        v-model="interviewNotes"
        :error-messages="interviewNotesErrors"
        @input="$v.interviewNotes.$touch()"
        @blur="$v.interviewNotes.$touch()"
        :disabled="!checkbox"
        multi-line
        box
      ></v-text-field>

      <br/><br/>

      <v-btn
        @click="submit"
        :loading="isLoading"
        :disabled="isSubmitDisabled"
      >
        submit
      </v-btn>

      <v-btn
        @click="clear"
      >
        clear
      </v-btn>

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
      phoneNumber: {
        required,
        maxLength: maxLength(16),
      },
      preferredContact: {
        required: false,
      },
      address: {
        required,
        maxLength: maxLength(255),
      },
      workDescription: {
        required,
        maxLength: maxLength(65536),
      },
      availableTimes: {
        maxLength: maxLength(255),
      },
      quantityHours: {
        numeric,
        maxLength: maxLength(2),
      },
      checkbox: {
        required: false,
      },
      availableInterviewTimes: {
        maxLength: maxLength(255),
      },
      interviewNotes: {
        maxLength: maxLength(255),
      },
    },
    data () {
      return {
        firstName: 'Fake',
        lastName: 'Person',
        email: 'fake@person.com',
        phoneNumber: '1234567890',
        preferredContact: null,
        address: '123 Fake St.',
        availableTimes: '',
        workDescription: 'sadasdasdsadasd',
        quantityHours: '',
        checkbox: false,
        availableInterviewTimes: '',
        interviewNotes: '',
        maskPhone: 'phone',

        isLoading: false,
        isSubmitDisabled: false,
      }
    },
    props: ['indicateRequestReceived'],
    methods: {
      async submit() {
        this.$v.$touch()
        console.log('this.$v.$invalid', this.$v.$invalid);
        console.log('this.preferredContact', this.preferredContact);
        if (!this.$v.$invalid) {
          this.isSubmitDisabled = true
          this.isLoading = true
          try {
            const request = axios.post('http://localhost:3000/guest/job_requests', {
              address: this.address,
              possible_times: this.availableTimes,
              work_description: this.workDescription,
              quantity_hours: this.quantityHours,
              interview_requested: this.checkbox,
              possible_interview_times: this.availableInterviewTimes,
              interview_notes: this.interviewNotes,
              guest_first_name: this.firstName,
              guest_last_name: this.lastName,
              guest_email: this.email,
              guest_phone_number: this.phoneNumber,
              guest_preferred_contact: this.preferredContact,
            })
            const response = await request
            if (response.status === 200) {
              console.log("Post successful")
              setTimeout(() => {
                this.clear()
                this.isLoading = false
                this.isSubmitDisabled = false
                this.indicateRequestReceived()
              }, 2000)
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
        this.phoneNumber = ''
        this.preferredContact = null
        this.address = ''
        this.availableTimes = ''
        this.workDescription = ''
        this.quantityHours = ''
        this.checkbox = false
        this.availableInterviewTimes = ''
        this.interviewNotes = ''
      },
      areThereValidationErrors() {
        console.log('this.computed', this.computed);
        for (method in this.computed) {
          console.log('method', method);
        }
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
      phoneNumberErrors () {
        const errors = []
        if (!this.$v.phoneNumber.$dirty) return errors
        !this.$v.phoneNumber.required && errors.push('Phone number is required')
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
      availableTimesErrors () {
        const errors = []
        if (!this.$v.availableTimes.$dirty) return errors
        !this.$v.availableTimes.maxLength && errors.push('Available times must be at most 255 characters long')
        return errors
      },
      quantityHoursErrors () {
        const errors = []
        if (!this.$v.quantityHours.$dirty) return errors
        !this.$v.quantityHours.maxLength && errors.push('Quantity of hours must be at most 2 characters long')
        !this.$v.quantityHours.numeric && errors.push('Quantity of hours must be a number')
        return errors
      },
      availableInterviewTimesErrors () {
        const errors = []
        if (!this.$v.availableInterviewTimes.$dirty) return errors
        !this.$v.availableInterviewTimes.maxLength && errors.push('Available interview times must be at most 255 characters long')
        return errors
      },
      interviewNotesErrors () {
        const errors = []
        if (!this.$v.interviewNotes.$dirty) return errors
        !this.$v.interviewNotes.maxLength && errors.push('Interview notes must be at most 255 characters long')
        return errors
      },
    }
  }
</script>



<style lang="scss" scoped>
a {
  color: #000;
}
.preferred-contact-card {
  background-color: rgb(248, 248, 247) !important;
  border-bottom: 2px solid rgb(138, 138, 137);
  .radio-group {
    padding: 0;
  }
  .text-card-radio {
    height: 6em;
    padding-top: 1em;
    padding-bottom: 0;
  }
}
form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
