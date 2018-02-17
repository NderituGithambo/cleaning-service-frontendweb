<template>
  <div class="wrapper">
    <h1>Create a job</h1>
    <br/>
    <v-card>
      <v-card-text>
        <form>
          <!-- Calendar -->
          <calendar
            :events="jobsList"
            @emit-event-data="receiveEventData"
            ref="calendar"
            :job-request-data="jobRequestData"
          ></calendar>

          <!-- Employee selector -->
          <div class="section-below-calendar">
            <v-select
              class="employee-selector"
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
            <v-btn
              @click="showModal"
            >ok</v-btn>
          </div>

          <!-- Confirmation section -->
          <div v-if="showConfirmationModal" class="event-confirmation-container">
            <div class="event-confirmation">
              <h2>Confirm before saving:</h2>

              <div class="row" v-for="item in infoToConfirm">
                <div class="col col-label">
                  {{ item }}
                </div>
                <div class="col col-content">
                  {{ eventData[item] }}
                </div>
              </div>

              <div class="button-container">
                <v-btn
                  @click="closeModal"
                >cancel</v-btn>

                <v-btn
                  @click="submit"
                  :loading="isLoading"
                  :disabled="isSubmitDisabled"
                >submit</v-btn>
              </div>
            </div>
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
      jobsList: [],

      infoToConfirm: [
        'startDate',
        'endDate',
        'description',
        'address',
        'adminNotes',
        'phone',
        'email',
      ],

      eventData: '',

      isLoading: false,
      isSubmitDisabled: false,

      jobRequestData: this.$route.params.jobRequest,

      showConfirmationModal: false,
    }
  },

  watch: {
    employeeIdSelected: function(employeeId) {
      this.loadEmployeeJobsIntoJobsList(employeeId)
    }
  },

  methods: {
    makeJobsList(employeeData) {
      employeeData.jobs.forEach(job => {
        const event = {
          startDate: job.confirmed_time,
          endDate: '',
          content: job,
        }
        this.jobsList.push(event)
      })
    },

    async loadEmployeeJobsIntoJobsList(employeeId) {
      const employeeData = await this.fetchEmployee(employeeId)
      this.jobsList = []
      return this.makeJobsList(employeeData)
    },

    async submit() {
      this.isSubmitDisabled = true
      this.isLoading = true
      try {
        const config = {
          headers: { Authorization: localStorage.getItem("token") }
        }

        const request = axios.post('http://localhost:3000/admin/jobs', {
          employee_id: this.employeeIdSelected,
          confirmed_time: this.eventData.startDate,
          admin_notes: this.eventData.adminNotes,
          address: this.eventData.address,
          description: this.eventData.description,
          phone: this.eventData.phone,
          email: this.eventData.email,
        }, config)

        const response = await request
        if (response.status === 200) {
          // Reset buttons to normal
          this.isLoading = false
          this.isSubmitDisabled = false
          // Re-fetch the employee's jobs from database
          await this.loadEmployeeJobsIntoJobsList(this.employeeIdSelected)
          // Clear the stashed event from calendar component
          this.$refs.calendar.clearStashedEvent()
          // Clear the new event data so page goes back to initial state
          this.eventData = ''
          this.showConfirmationModal = false
        }
      } catch (e) {
        this.isLoading = false
        this.isSubmitDisabled = false
      }
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

    clear() {
      this.employee = null
    },

    receiveEventData(newEventData) {
      this.eventData = newEventData
    },

    showModal() {
      this.showConfirmationModal = true
    },

    closeModal() {
      this.showConfirmationModal = false
    },
  },

  mounted() {
    this.fetchEmployees()

    console.log('params', this.$route.params)
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
    font-size: 1.5em;
  }

  a {
    color: #000;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .employee-selector {
      max-width: 500px;
    }

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

  .event-confirmation-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);

    .event-confirmation {
      position: relative;
      background-color: white;
      min-width: fit-content;
      min-height: fit-content;
      padding: 32px 64px;
      border: 1px solid gainsboro;
      border-radius: 8px;

      .row {
        width: 100%;
        display: grid;
        grid-template-columns: [col] 25% [col] 75%;

        .col {
          padding: 0.5em;
        }

        .col-label {
          font-weight: bold;
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          text-align: right;
          padding: 0.5em;
          border-right: 1px solid #d2d2d2
        }

        .col-content {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          text-align: left;

          input {
            padding: 0.25em;
            margin: 0;
            border: 1px solid #d2d2d2;
            width: 100%;
          }
        }
      }
    }
  }

  .section-below-calendar {
    width: 80%;
    display: flex;
    justify-content: space-between;
  }
}
</style>
