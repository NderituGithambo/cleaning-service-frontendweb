<template>
  <div class="wrapper">
    <h1>Create a new job</h1>
    <br/>
    <v-card>
      <v-card-text>
        <form>
          <v-select
            label="Assign employee"
            v-model="employee"
            :items="employeesList"
            required
          ></v-select>

          <calendar></calendar>

          <div class="button-container">
            <v-btn
              @click="clear"
            >clear</v-btn>

            <v-btn
              @click="submit"
              :loading="isLoading"
              :disabled="isSubmitDisabled"
            >submit</v-btn>
          </div>
        </form>
      </v-card-text>
    </v-card>
  </div>
</template>



<script>
import axios from 'axios'
import calendar from './Calendar/calendar.vue'

export default {
  props: ['indicateRequestReceived'],

  components: {
    'calendar': calendar,
  },

  data () {
    return {
      employee: null,
      employeesList: [
        "Guy Something",
        "Dude Erreeno",
        "Phillip Nobody",
      ],

      isLoading: false,
      isSubmitDisabled: false,
    }
  },

  methods: {
    async submit() {
      this.isSubmitDisabled = true
      this.isLoading = true
      try {
        const request = axios.post('http://localhost:3000/admin/jobs', {
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
    },

    clear() {
      this.employee = null
    },
  },
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
