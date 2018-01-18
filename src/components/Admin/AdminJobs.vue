<template>
  <div>
    <h1>Jobs</h1>
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
        <td class="text-xs-right" v-for="attribute in props.item">{{ attribute }}</td>
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
      headers: [],
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
        this.fetchItems(this.page, this.numPerPage)
      },
      deep: true
    }
  },

  mounted() {
    this.fetchItems(this.page, this.numPerPage)
  },

  methods: {
    async fetchItems(page, numPerPage) { // Not using this
      this.loading = true
      try {
        const { page, rowsPerPage } = this.pagination
        const config = {
          headers: { Authorization: localStorage.getItem("token") }
        }
        const request = axios.get(`http://localhost:3000/admin/jobs?p=${page}&npp=${rowsPerPage}`, config)
        const response = await request
        console.log("response", response)
        this.items = response.data.jobs
        this.totalNum = response.data.total_num

        Object.keys(this.items[0]).forEach(key => {
          this.headers.push({ text: key, value: key, sortable: false })
        })

      } catch (error) {
        console.log("***", error);
      }
      this.loading = false
    },
    itemURL: function(id) {
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
