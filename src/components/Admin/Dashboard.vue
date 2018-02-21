<template>
  <div>

    <!-- Nav Panel -->
    <nav>
      <router-link to="/admin">

        <div class="nav-btn">
          <h1>
            Dashboard
          </h1>
        </div>
      </router-link>

      <div class="horiz-line"/>

      <div class="section-title no-select">
        Create
      </div>

      <router-link to="/admin/jobs/create">
        <div class="nav-btn">
          Job
          </div>
      </router-link>

      <div class="horiz-line"/>


      <div class="section-title no-select">
        View
      </div>

      <router-link to="/admin/job_requests">
        <div class="nav-btn">
          Job Requests
          <div class="bubble">{{ numActiveJobRequests }}</div>
        </div>
      </router-link>

      <router-link to="/admin/jobs">
        <div class="nav-btn">
          Jobs
          <div class="bubble">{{ numJobsReadyToBill }}</div>
        </div>
      </router-link>

      <!-- <router-link to="/admin/employees">
        <div class="nav-btn">
          Employees
        </div>
      </router-link> -->

      <div class="horiz-line"/>

      <a v-on:click="logout">
        <div class="nav-btn">
          Log out
        </div>
      </a>

    </nav>

    <!-- Main view -->
    <main>
      <router-view/>
    </main>

    <!-- Notifications -->
    <v-snackbar
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false">Close</v-btn>
    </v-snackbar>

  </div>
</template>

<script>
import axios from 'axios'
import ActionCable from 'actioncable'
const cable = ActionCable.createConsumer('ws://192.168.1.69:3000/cable')
import EventBus from './EventBus'
// Wrapper for promise to avoid try/catch blocks
import to from '../../to.js'


export default {
  async beforeRouteEnter(to, from, next) {
    // Authenticates for admin here
    const config = {
      headers: { Authorization: localStorage.getItem("token") }
    }
    try {
      // This route only allows admin-type users
      const request = axios.get('http://localhost:3000/admin/dashboard', config)
      const response = await request
      next()
    } catch (error) {
      console.log(error)
      next('/admin/login')
    }
  },

  data() {
    return {
      snackbar: {
        show: false,
        color: 'info',
        mode: 'text',
        timeout: 6000,
        text: '',
      },

      numJobsReadyToBill: 0,
      numActiveJobRequests: 0,
    }
  },

  mounted() {

    const parent = this
    cable.subscriptions.create('AdminChannel', {
      received(data) {
        switch (data.type) {
          case 'EMPLOYEE_STARTED_JOB':
            parent.snackbar.text = data.message
            parent.snackbar.color = 'success'
            parent.snackbar.show = true
            // Re-fetch job list if job page open
            EventBus.$emit('refresh-jobs')
            break

          case 'EMPLOYEE_COMPLETED_JOB':
            parent.snackbar.text = data.message
            parent.snackbar.color = 'error'
            parent.snackbar.show = true
            // Re-fetch job list if job page open
            EventBus.$emit('refresh-jobs')
            break

          case 'NEW_JOB_REQUEST':
            parent.snackbar.text = 'New job request received'
            parent.snackbar.color = 'error'
            parent.snackbar.show = true
            // Re-fetch job list if job page open
            EventBus.$emit('refresh-job-requests')
            break

          case 'JOB_REQUEST_MADE_INACTIVE':
            // Re-fetch job list if job page open
            EventBus.$emit('refresh-job-requests')
            break

          default:
            break
        }

        // Set variables for sidebar numbers
        if (data.num_jobs_ready_to_bill === 0 || data.num_jobs_ready_to_bill) {
          parent.numJobsReadyToBill = data.num_jobs_ready_to_bill
        }
        if (data.num_active_job_requests === 0 || data.num_active_job_requests) {
          parent.numActiveJobRequests = data.num_active_job_requests
        }
      }
    })
  },

  methods: {
    logout() {
      localStorage.removeItem('token')
      location.reload()
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../colors.scss";

nav {
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;

  z-index: 2;

  min-width: 120px;
  height: 100vh;

  padding: 1em 0 1em 0;

  background-color: $darker-blue;

  hr {
    margin-bottom: 0.2em;
    margin-top: 1em;
    height: 1px;
  }

  a {
    color: $light-blue;
    text-decoration: none;
    margin: 0.5em 0;
  }

  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.25em 0.5em;

    &:hover {
      // background: linear-gradient(to bottom, $dark-blue, $blue);
      color: $lighter-blue;
    }

    h1 {
      font-weight: normal;
    }
  }

  .section-title {
    display: flex;
    justify-content: flex-start;
    padding: 0.25em 0.5em;
    font-style: italic;
    color: $light-grey;
  }

  .bubble {
    position: relative;
    padding: 0;
    margin-left: 4px;
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: black;
    font-family: 'Ubuntu Mono';
  }
}

main {
  padding-left: 120px;

  a {
    color: $blue;
  }
}

.horiz-line {
  height: 3px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  background-color: rgba(255, 255, 255, 0.1);
  width: 75%;
  margin: 10px 0;
}
</style>
