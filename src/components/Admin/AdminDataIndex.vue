<template>
  <div>
    <h1>{{ dataModel | capitalize }}s</h1>
    <br/>
    <v-data-table
      v-bind:headers="headers"
      v-bind:items="items"
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
        <td class="text-xs-right" v-for="(attribute, key) in props.item">
          <router-link v-if="key === 'id'" v-bind:to="itemURL(attribute)" class="id-link">
            {{ attribute }}
          </router-link>
          <span v-else-if="key === 'created_at' || key === 'updated_at' ">
            {{ attribute | moment }}
          </span>
          <span v-else>
            {{ attribute }}
          </span>
        </td>
      </template>

    </v-data-table>
    <v-card>
      <v-card-text>
        <v-pagination
          v-bind:length.number="numPages()"
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

  watch: {
    pagination: {
      handler: function() {
        this.fetchItems()
      },
      deep: true
    },
    dataModel: function(value) {
      console.log(value)
      this.fetchItems()
    }
  },

  mounted() {
    this.fetchItems()
  },

  methods: {
    async fetchItems() { // Not using this
      this.loading = true
      try {
        const { page, rowsPerPage } = this.pagination
        const config = {
          headers: { Authorization: localStorage.getItem("token") }
        }
        const request = axios.get(`http://localhost:3000/admin/${this.dataModel}s?p=${page}&npp=${rowsPerPage}`, config)
        const response = await request
        this.items = response.data[`${this.dataModel}s`]
        this.totalRows = response.data.total_rows

        // Generate headers for table
        this.headers = []
        Object.keys(this.items[0]).forEach(key => {
          this.headers.push({ text: key, value: key, sortable: false })
        })

      } catch (error) {
        console.log("***", error);
      }
      this.loading = false
    },
    itemURL: function(id) {
      return `/admin/dashboard/${this.dataModel}s/${id}`
    },
    numPages: function() {
      const numPages = Math.ceil(this.totalRows / this.pagination.rowsPerPage)
      return numPages
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
  font-weight: normal;
}

.drop-down {
  float: right;
  width: 100px;
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
