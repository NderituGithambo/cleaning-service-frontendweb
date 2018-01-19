<template>
  <div>
    <header>
      <router-link to="/admin/dashboard">
        <h1>Admin Dashboard</h1>
      </router-link>
      <nav>
        <router-link to="/admin/dashboard/job_requests">
          <v-btn large class="ma-0" flat :ripple="false">Job Requests</v-btn>
        </router-link>
        <router-link to="/admin/dashboard/jobs">
          <v-btn large class="ma-0" flat :ripple="false">Jobs</v-btn>
        </router-link>
      </nav>
    </header>
    <br/>
    <main>
      <router-view/>
    </main>
  </div>
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
<style lang="scss" scoped>
@import "../../colors.scss";

h1 {
  font-weight: normal;
}
p {
  text-align: left;
}

a {
  color: $blue;
}

header {
  width: 100%;
  background-color: $transparent;
  border-bottom: 1px solid black;

  nav {
    display: flex;
    justify-content: center;
  }
}
</style>
