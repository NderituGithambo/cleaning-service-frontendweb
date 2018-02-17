<template>
  <div>

    <!-- Nav Panel -->
    <nav>
      <router-link to="/admin">
        <div class="nav-btn"><h1>Dashboard</h1></div>
      </router-link>
      <hr/>
      <div class="section-title no-select">
        Create
      </div>
      <router-link to="/admin/jobs/create">
        <div class="nav-btn">Job</div>
      </router-link>
      <hr/>
      <div class="section-title no-select">
        View
      </div>
      <router-link to="/admin/job_requests">
        <div class="nav-btn">Job Requests</div>
      </router-link>
      <router-link to="/admin/jobs">
        <div class="nav-btn">Jobs</div>
      </router-link>
      <router-link to="/admin/employees">
        <div class="nav-btn">Employees</div>
      </router-link>
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
    }
  },

  mounted() {
    const parent = this

    cable.subscriptions.create('AdminChannel', {
      received(data) {
        console.log("Received from action cable:", data)

        // Re-fetch job list
        EventBus.$emit('refresh-jobs')

        // Snackbar options
        if (data.type ==='started') {
          console.log('in started, data.type = ', data.type)
          parent.snackbar.text = data.message
          parent.snackbar.color = 'info'
        } else if (data.type ==='completed') {
          console.log('in completed, data.type = ', data.type)
          parent.snackbar.text = data.message
          parent.snackbar.color = 'success'
        }
        parent.snackbar.show = true
      }
    })
  },
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

  z-index: 6;

  width: 12vw;
  min-width: 120px;
  height: 100vh;

  padding: 1em 0 1em 0;

  background-color: white;
  background: linear-gradient(to right, $darker-blue, $dark-blue);

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
}

main {
  padding-left: 12vw;

  a {
    color: $blue;
  }
}
</style>
