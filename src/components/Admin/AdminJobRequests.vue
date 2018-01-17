<template>
  <div>
    <h1>Job Requests</h1>
    <br/>
    <div>
      {{ jobRequests }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      loading: false,
      error: null,
      jobRequests: null,
    };
  },

  mounted() {
    this.fetchJobRequests()
  },

  methods: {
    async fetchJobRequests() { // Not using this
      try {
        const config = {
          headers: { Authorization: localStorage.getItem("token") }
        }
        const request = axios.get('http://localhost:3000/admin/job_requests', config)
        const response = await request
        console.log("response", response);
        this.jobRequests = response.data.job_requests
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
