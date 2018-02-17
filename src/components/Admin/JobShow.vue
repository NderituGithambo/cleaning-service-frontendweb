<template>
  <div>
    <h1>Showing {{ dataModel | underscoresAreSpaces }} with id {{ $route.params.id }}</h1>
    <br/>
    <v-card v-for="(section, title) in items" v-bind:key="uuid()">
      <v-card-text>
        <v-list two-line>
          <template v-for="(item, key, index) in section">
            <v-list-tile v-bind:key="uuid()">
              <v-list-tile-content>

                <v-list-tile-title v-html="key"></v-list-tile-title>

                <!-- Format dates -->
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

                <!-- Format phone numbers -->
                <v-list-tile-sub-title
                  v-else-if="
                    key === 'phone_number' ||
                    key === 'guest_phone_number'
                  "
                  v-html="$options.filters.phone(item)"
                ></v-list-tile-sub-title>

                <!-- Display all other data normally -->
                <v-list-tile-sub-title
                  v-else
                  v-html="item"
                ></v-list-tile-sub-title>

              </v-list-tile-content>

              <!-- Put buttons on certain properties -->
              <v-btn
                v-if="
                  key === 'confirmed_time' ||
                  key === 'time_work_started' ||
                  key === 'time_work_completed' ||
                  key === 'admin_notes' ||
                  key === 'description' ||
                  key === 'address' ||
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

        <v-btn
          v-if="isJobComplete()"
          color="primary"
          dark
          large
          v-on:click="sendBillInEmail"
        >
          Send bill to customer's email
        </v-btn>

      </v-card-text>

    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import uuidv4 from 'uuid/v4'


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
    async fetchItems() {
      try {
        const config = { headers: { Authorization: localStorage.getItem("token") }}
        const request = axios.get(`http://localhost:3000/admin/${this.dataModel}s/${this.$route.params.id}`, config)
        const response = await request
        this.items = response.data
      } catch (error) {
        console.log(error)
      }
    },

    async setBillSentAsTrue() {
      try {
        const config = { headers: { Authorization: localStorage.getItem("token") }}
        const request = axios.patch(`http://localhost:3000/admin/jobs/${this.$route.params.id}`, {
          bill_sent: true,
        }, config)
      } catch (error) {
        console.log(error)
      }
    },

    uuid() {
      return uuidv4();
    },

    sendBillInEmail() {
      this.setBillSentAsTrue()
      alert("sending bill in email")
    },

    isJobComplete() {
      const { time_work_completed: workComplete } = this.items.job
      if (workComplete) return true
    },
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
  border-bottom: 1px solid silver;
}
</style>
