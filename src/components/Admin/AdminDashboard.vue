<template>
  <main>
    <h1>{{ msg }}sdsadsa</h1>
    <br/>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      msg: 'This is the admin dashboard page',
      loading: false,
      error: null,
      jobRequests: null,
    };
  },
  mounted() {
    console.log("hi")
    // this.fetchJobRequests();
  },
  methods: {
    async fetchJobRequests() {
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
