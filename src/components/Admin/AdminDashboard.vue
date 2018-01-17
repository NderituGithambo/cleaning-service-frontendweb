<template>
  <main>
    <h1>Admin Dashboard</h1>
    <br/>
      <router-link to="/admin/dashboard/job_requests">
        <v-btn large class="ma-0" flat :ripple="false">Job Requests</v-btn>
      </router-link>
    <br/>
    <router-view/>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  async beforeRouteEnter(to, from, next) {
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
      localStorage.removeItem('token');
      next('/')
    }
  },

  data() {
    return {
      loading: false,
      error: null,
      jobRequests: null,
    };
  },

  mounted() {
    return
  },

  methods: {
    async fetchJobRequests() { // Not using this
      try {
        const request = axios.get('http://localhost:3000/admin/job_requests')
        const response = await request
        console.log("**", response)
      } catch (error) {
        console.log("***", error);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
p {
  text-align: left;
}
</style>
