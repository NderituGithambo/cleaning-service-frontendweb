<template>
  <div>
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
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import axios from 'axios'

import ActionCable from 'actioncable'
const cable = ActionCable.createConsumer('ws://192.168.1.69:3000/cable')


export default {
  mounted() {
    cable.subscriptions.create('AdminChannel', {
      received(data) {
        console.log("Received from action cable:", data)
      }
    });
  },


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
      // Clear token even if user logged in as employee or client
      // localStorage.removeItem('token');
      next('/admin/login')
    }
  },

  data() {
    return {
      loading: false,
      error: null,
      jobRequests: null,


      /*
        1. Have function in component at /admin/jobs that can emit the job request data
        to  this parent and save in jobRequestData.

        2. Then, send that data to AdminJobCreate which will pre-load the component with that data.
      */
      jobRequestData: null,
    };
  },

  methods: {
    async fetchJobRequests() { // Not using this
      try {
        const request = axios.get('http://localhost:3000/admin/job_requests')
        const response = await request
      } catch (error) {
        console.log(error);
      }
    },

    saveJobRequestDataForJob(jobRequestData) {
      this.jobRequestData = jobRequestData
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
