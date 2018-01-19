<template>
  <div>
    <h1>Showing {{ dataModel | underscoresAreSpaces }} with id {{ $route.params.id }}</h1>
    <br/>
    <v-card v-for="(section, title) in items" v-bind:key="uuid()">
      <h2>{{ title | capitalize | underscoresAreSpaces }}</h2>
      <v-card-text>
        <v-list two-line>
          <template v-for="(item, key, index) in section">
            <v-list-tile v-bind:key="uuid()">
              <v-list-tile-content>

                <v-list-tile-title v-html="key"></v-list-tile-title>

                <v-list-tile-sub-title
                  v-if="
                    key === 'created_at' ||
                    key === 'updated_at' ||
                    key === 'confirmed_time' ||
                    key === 'time_work_started' ||
                    key === 'time_work_completed'
                  "
                  v-html="$options.filters.moment(item)"
                ></v-list-tile-sub-title>

                <v-list-tile-sub-title
                  v-else-if="
                    key === 'phone_number' ||
                    key === 'guest_phone_number'
                  "
                  v-html="$options.filters.phone(item)"
                ></v-list-tile-sub-title>

                <v-list-tile-sub-title
                  v-else
                  v-html="item"
                ></v-list-tile-sub-title>

              </v-list-tile-content>

              <v-btn
                v-if="
                  key === 'confirmed_time' ||
                  key === 'time_work_started' ||
                  key === 'time_work_completed' ||
                  key === 'admin_notes' ||
                  key === 'is_paid'
                "
                fab
                small
                dark
                color="orange"
              ><v-icon dark>edit</v-icon></v-btn>

            </v-list-tile>
          </template>
        </v-list>
      </v-card-text>

      <v-btn v-if="dataModel === 'job_request'" color="error" dark large>Make this a job</v-btn>

    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
const uuidv4 = require('uuid/v4');

export default {
  props: {
    dataModel: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      items: [],
    }
  },

  mounted() {
    this.fetchItems()
  },

  methods: {
    async fetchItems() { // Not using this
      this.loading = true
      try {
        const config = {
          headers: { Authorization: localStorage.getItem("token") }
        }
        const request = axios.get(`http://localhost:3000/admin/${this.dataModel}s/${this.$route.params.id}`, config)
        const response = await request
        this.items = response.data

        console.log(response)

      } catch (error) {
        console.log(error);
      }
      this.loading = false
    },
    uuid: function() {
      return uuidv4();
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  padding: 2em;
}

.card {
  margin-top: 2em;
}

li {
  border-top: 1px solid black;
}
</style>
