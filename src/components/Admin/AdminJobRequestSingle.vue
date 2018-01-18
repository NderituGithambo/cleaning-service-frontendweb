<template>
  <div>

    <h1>Showing job request {{$route.params.id}}</h1>
    <br/>

    <v-progress-circular
      indeterminate
      v-bind:size="50"
      color="primary"
      v-if="loading"
    ></v-progress-circular>

    <v-list two-line v-if="!loading">
      <template v-for="(item, key, index) in items">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title v-html="key"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="index + 1 < Object.keys(items).length"></v-divider>
      </template>
    </v-list>

  </div>
</template>


<script>
import axios from 'axios'

export default {
  data () {
    return {
      items: {},
      loading: true,
    }
  },

  mounted() {
    this.fetchJobRequest()
  },

  methods: {
    async fetchJobRequest() { // Not using this
      this.loading = true
      try {
        const config = {
          headers: { Authorization: localStorage.getItem("token") }
        }
        const request = axios.get(`http://localhost:3000/admin/job_requests/${this.$route.params.id}`, config)
        const response = await request
        console.log("response", response)
        this.items = response.data.job_request

        // Format data in items for displaying
        if (!this.items.client_id) { this.items.client_id = "guest" }
        this.items.guest_phone_number = this.$options.filters.phone(this.items.guest_phone_number)
        this.items.created_at = this.$options.filters.moment(this.items.created_at)
        this.items.updated_at = this.$options.filters.moment(this.items.updated_at)

      } catch (error) {
        console.log("***", error);
      }
      this.loading = false
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
  font-weight: normal;
}
p {
  text-align: left;
}

.drop-down {
  float: right;
  width: 100px;
}

</style>
