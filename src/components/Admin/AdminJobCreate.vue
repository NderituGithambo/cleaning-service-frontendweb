<template>
  <div class="wrapper">
    <h1>Manage Jobs</h1>
    <br/>
    <v-card>
      <v-card-text>
        <form>
          <v-select
            label="Assign employee"
            v-model="employeeIdSelected"
            :items="employeesList"
            item-text="first_name"
            item-value="id"
            required
          >
            <template slot="item" slot-scope="data">
              {{ data.item.last_name }}, {{ data.item.first_name }}
            </template>
            <template slot="selection" slot-scope="data">
              {{ data.item.last_name }}, {{ data.item.first_name }}
            </template>
          </v-select>

          <calendar
            :events="jobsListProcessed"
            @save-new-event="receiveEventData"
          ></calendar>

          <div class="event-confirmation">
            <div>Check job before saving:</div>
            {{ eventData }}
          </div>

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
      employeeIdSelected: null,
      employeeData: null,
      employeesList: [],
      jobsListProcessed: [],

      eventData: '',

      eventContentSpecified: ['', ],

      isLoading: false,
      isSubmitDisabled: false,
    }
  },

  watch: {
    employeeIdSelected: async function(employeeId) {
      const employeeData = await this.fetchEmployee(employeeId)
      this.jobsListProcessed = []
      this.createJobsListProcessed(employeeData)
    }
  },

  methods: {
    createJobsListProcessed(employeeData) {
      employeeData.jobs.forEach(job => {
        const event = {
          startDate: job.confirmed_time,
          endDate: '',
          title: job.address,
          content: job,
        }
        this.jobsListProcessed.push(event)
      })
    },

    async submit() {
      this.isSubmitDisabled = true
      this.isLoading = true
      // try {
      //   const request = axios.post('http://localhost:3000/admin/jobs', {
      //     address: this.address,
      //   })
      //   const response = await request
      //   if (response.status === 200) {
      //     setTimeout(() => {
      //       this.clear()
      //       this.isLoading = false
      //       this.isSubmitDisabled = false
      //       this.indicateRequestReceived()
      //     }, 1000)
      //   }
      // } catch (e) {
      //   console.log(e)
      // }
    },

    async fetchEmployees() {
      const config = {
        headers: { Authorization: localStorage.getItem("token") }
      }
      try {
        const request = axios.get('http://localhost:3000/admin/employees', config)
        const response = await request
        this.employeesList = response.data.employees
      } catch (e) {
        console.log(e)
      }
    },

    async fetchEmployee(id) {
      const config = {
        headers: { Authorization: localStorage.getItem("token") }
      }
      try {
        const request = axios.get(`http://localhost:3000/admin/employees/${id}`, config)
        const response = await request
        return response.data
      } catch (e) {
        console.log(e)
      }
    },

    clear: function() {
      this.employee = null
    },

    receiveEventData: function(newEventData) {
      this.eventData = newEventData
    },
  },

  mounted() {
    this.fetchEmployees()
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
