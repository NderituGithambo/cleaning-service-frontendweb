<template>
  <div>
    <h1>Job Requests</h1>
    <br/>
    <v-data-table
      v-bind:headers="headers"
      v-bind:items="items"
      v-bind:search="search"
      :loading="loading"
      class="elevation-1"
      hide-actions
    >
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
        <template slot="items" slot-scope="props">
          <router-link v-bind:to="toJobRequest(props.item.id)">
            <td class="text-xs-right">{{ props.item.id }}</td>
          </router-link>
          <td class="text-xs-right">{{ props.item.client_id || "guest" }}</td>
          <td class="text-xs-right">{{ props.item.address }}</td>
          <td class="text-xs-right">{{ props.item.work_description }}</td>
          <!-- <td class="text-xs-right">{{ props.item.quantity_hours }}</td> -->
          <!-- <td class="text-xs-right">{{ props.item.interview_requested }}</td> -->
          <!-- <td class="text-xs-right">{{ props.item.possible_interview_times }}</td> -->
          <!-- <td class="text-xs-right">{{ props.item.interview_notes }}</td> -->
          <td class="text-xs-right">{{ `${props.item.guest_first_name} ${props.item.guest_last_name}` }}</td>
          <!-- <td class="text-xs-right">{{ props.item.guest_last_name }}</td> -->
          <td class="text-xs-right">{{ props.item.guest_phone_number | phone }}</td>
          <td class="text-xs-right">{{ props.item.guest_email }}</td>
          <td class="text-xs-right">{{ props.item.guest_preferred_contact }}</td>
          <td class="text-xs-right">{{ props.item.created_at | moment }}</td>
          <td class="text-xs-right">{{ props.item.updated_at | moment }}</td>
        </template>
    </v-data-table>
    <v-card>
      <v-card-text>
        <v-pagination
          v-bind:length.number="numPages"
          v-model="pagination.page"
        ></v-pagination>
        <v-select
          v-bind:items="rowsPerPageItems"
          v-model="pagination.rowsPerPage"
          label="Select"
          single-line
          class="drop-down"
        ></v-select>
      </v-card-text>
    </v-card>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data () {
    return {
      search: '',
      totalNum: 0,
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: 25,
        sortBy: "created_at"
      },
      rowsPerPageItems: [
        { text: 5, value: 5 },
        { text: 10, value: 10 },
        { text: 25, value: 25 },
        { text: 50, value: 50 },
        { text: 100, value: 100 },
      ],
      selected: [],
      items: [],
      loading: true,
      headers: [
        { text: 'ID', value: 'id', sortable: false },
        { text: 'Client ID', value: 'client_id', sortable: false },
        { text: 'Address', value: 'address', sortable: false },
        { text: 'Description', value: 'work_description', sortable: false },
        // { text: 'quantity_hours', value: 'quantity_hours' },
        // { text: 'interview_requested', value: 'interview_requested' },
        // { text: 'possible_interview_times', value: 'possible_interview_times' },
        // { text: 'interview_notes', value: 'interview_notes' },
        { text: 'Name', value: 'guest_first_name', sortable: false },
        // { text: 'Last name', value: 'guest_last_name' },
        { text: 'Phone', value: 'guest_phone_number', sortable: false },
        { text: 'Email', value: 'guest_email', sortable: false },
        { text: 'Preferred Contact', value: 'guest_preferred_contact', sortable: false },
        { text: 'Created At', value: 'created_at', sortable: false },
        { text: 'Updated At', value: 'updated_at', sortable: false },
      ],
    }
  },

  computed: {
    numPages: function() {
      return Math.ceil(this.totalNum / this.pagination.rowsPerPage)
    },
  },

  watch: {
    pagination: {
      handler: function() {
        this.fetchJobRequests(this.page, this.numPerPage)
      },
      deep: true
    }
  },

  mounted() {
    this.fetchJobRequests(this.page, this.numPerPage)
  },

  methods: {
    async fetchJobRequests(page, numPerPage) { // Not using this
      this.loading = true
      try {
        const { page, rowsPerPage } = this.pagination
        const config = {
          headers: { Authorization: localStorage.getItem("token") }
        }
        const request = axios.get(`http://localhost:3000/admin/job_requests?p=${page}&npp=${rowsPerPage}`, config)
        const response = await request
        console.log("response", response)
        this.items = response.data.job_requests
        this.totalNum = response.data.total_num
      } catch (error) {
        console.log("***", error);
      }
      this.loading = false
    },
    toJobRequest: function(id) {
      return `/admin/dashboard/job_requests/${id}`
    }
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
