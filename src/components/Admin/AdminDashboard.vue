<template>
  <main>
    <h1>{{ msg }}sdsadsa</h1>
    <br/>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  async beforeRouteEnter(to, from, next) {
    console.log("before route entered")

    const config = {
      headers: { Authorization: localStorage.getItem("token") }
    }

    try {
      const request = axios.get('http://localhost:3000/admin/job_requests', config)
      const response = await request
      if (response.status === 200) {
        console.log("auth was a success.")
        next()
      }
    } catch (e) {
      console.log(e)
      console.log("got here")
    }

  },
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
