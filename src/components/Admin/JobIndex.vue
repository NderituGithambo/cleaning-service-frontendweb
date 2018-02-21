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
      :items="jobs"
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
          {{ props.item.created_at | moment }}
        </td>
        <td class="text-xs-right">
          {{ props.item.confirmed_time | moment}}
        </td>
        <td class="text-xs-right" :class="getEventColorClassFromStatus(props.item, true)">
          {{ getJobStatusFromJobData(props.item) | screamingSnakeCaseFix }}
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
import { getJobStatusFromJobData, getEventColorClassFromStatus } from './helpers.js'

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
      jobs: [],
      loading: true,
      headers: [
        { text: 'Job ID', value: 'id', sortable: false },
        { text: 'Created At', value: 'created_at', sortable: false },
        { text: 'Scheduled Time', value: 'confirmed_time', sortable: false },
        { text: 'Status', value: '', sortable: false },
      ],
    }
  },

  watch: {
    pagination: {
      handler: function() {
        this.fetchJobs()
      },
      deep: true
    },

    dataModel: function(value) {
      this.fetchJobs()
    },
  },

  mounted() {
    this.fetchJobs()

    EventBus.$on('refresh-jobs', () => {
      this.fetchJobs()
    })
  },

  methods: {
    async fetchJobs() {
      this.loading = true
      try {
        const { page, rowsPerPage } = this.pagination
        const config = {
          headers: { Authorization: localStorage.getItem("token") }
        }
        const request = axios.get(`http://localhost:3000/admin/${this.dataModel}s?p=${page}&npp=${rowsPerPage}`, config)
        const response = await request
        this.jobs = response.data.jobs

        this.totalRows = response.data.total_rows

        console.log('jobs:', this.jobs);

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

    // To expose helper functions to html template
    getEventColorClassFromStatus: getEventColorClassFromStatus,
    getJobStatusFromJobData: getJobStatusFromJobData,
  },
};
</script>



<style lang="scss" scoped>
@import "./job-color-classes.scss";

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
</style>
