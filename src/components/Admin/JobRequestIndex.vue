<template>
  <div>
    <h1>{{ dataModel | underscoresAreSpaces | capitalize  }}s</h1>
    <br/>
    <div class="drop-down-container">
      Num per page
      <v-select
        v-bind:items="rowsPerPageItems"
        v-model="pagination.rowsPerPage"
        label="Select"
        single-line
        class="drop-down"
      ></v-select>
    </div>
    <v-data-table
      :headers="headers"
      :items="jobRequests"
      :loading="loading"
      class="elevation-1"
      hide-actions
    >
      <template slot="headerCell" slot-scope="props">
        <span v-if="props.header.value === 'id'" slot="activator" class="text-left">
          {{ props.header.text }}
        </span>
        <span v-else slot="activator">
          {{ props.header.text }}
        </span>
      </template>

      <template slot="items" slot-scope="props">
        <td class="text-xs-right">
          <router-link :to="itemURL(props.item.id)" class="id-link">
            {{ props.item.id }}
          </router-link>
        </td>
        <td class="text-xs-right">
          {{ props.item.address }}
        </td>
        <td class="text-xs-right">
          {{ props.item.guest_first_name }} {{ props.item.guest_last_name }}
        </td>
        <td class="text-xs-right" :class="getStatusColumnClass(props.item.is_active)">
          {{ getStatusDisplayText(props.item.is_active) }}
        </td>

      </template>

    </v-data-table>
    <v-card>
      <v-card-text>
        <v-pagination
          v-bind:length.number="numPages()"
          v-model="pagination.page"
        ></v-pagination>
      </v-card-text>
    </v-card>
  </div>
</template>


<script>
import axios from 'axios'

import EventBus from './EventBus'


export default {
  props: {
    dataModel: {
      type: String,
      required: true,
    }
  },

  data () {
    return {
      totalRows: 0,
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: 10,
        sortBy: "confirmed_time"
      },
      rowsPerPageItems: [
        { text: 5, value: 5 },
        { text: 10, value: 10 },
        { text: 25, value: 25 },
        { text: 50, value: 50 },
        { text: 100, value: 100 },
      ],
      selected: [],
      jobRequests: [],
      loading: true,
      headers: [
        { text: 'Job ID', value: 'id', sortable: false },
        { text: 'Address', value: 'address', sortable: false },
        { text: 'Customer Name', value: 'confirmed_time', sortable: false },
        { text: 'Status', value: 'is_active', sortable: false },
      ],
    }
  },

  watch: {
    pagination: {
      handler: function() {
        this.fetchJobRequests()
      },
      deep: true
    },

    dataModel: function(value) {
      this.fetchJobRequests()
    },
  },

  mounted() {
    this.fetchJobRequests()

    EventBus.$on('refresh-job-requests', () => {
      this.fetchJobRequests()
    })
  },

  methods: {
    async fetchJobRequests() {
      this.loading = true
      try {
        const { page, rowsPerPage } = this.pagination
        const config = {
          headers: { Authorization: localStorage.getItem("token") }
        }
        const request = axios.get(`http://localhost:3000/admin/${this.dataModel}s?p=${page}&npp=${rowsPerPage}`, config)
        const response = await request
        this.jobRequests = response.data.job_requests

        this.totalRows = response.data.total_rows

        console.log('job requests:', this.jobRequests);

      } catch (error) {
        console.log(error);
      }
      this.loading = false
    },

    itemURL(id) {
      return `/admin/${this.dataModel}s/${id}`
    },

    numPages() {
      const numPages = Math.ceil(this.totalRows / this.pagination.rowsPerPage)
      return numPages
    },

    getStatusColumnClass(status) {
      return status ? 'status-active' : 'status-inactive'
    },

    getStatusDisplayText(status) {
      return status ? 'Active' : 'Inactive'
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
  font-weight: normal;
}

.drop-down-container {
  float: right;
  display: flex;
  flex-direction: column;
}

.drop-down {
  float: right;
  width: 100px;
  padding: 0;
}

.id-link {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.text-left {
  display: flex;
}

.status-active {
  color: green;
}

.status-inactive {
  color: grey;
}
</style>
