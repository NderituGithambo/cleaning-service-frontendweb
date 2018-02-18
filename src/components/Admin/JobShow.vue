<template>
  <div>
    <h1>Showing {{ dataModel | underscoresAreSpaces }} with id {{ $route.params.id }}</h1>
    <br/>
    <v-card v-for="(section, title) in items" v-bind:key="title">
      <v-card-text>
        <v-list two-line>
          <template v-for="(item, key, index) in section">
            <v-list-tile v-bind:key="index">
              <v-list-tile-content>

                <v-list-tile-title v-html="$options.filters.snakeCaseFix(key)"></v-list-tile-title>

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
                small
                depressed
                dark
                color="orange"
              >Edit</v-btn>

            </v-list-tile>
          </template>
        </v-list>

        <!-- Send bill button / 'bill has been sent' text -->
        <div class="billing-section">
          <v-btn
            v-if="isSendBillButtonVisible"
            color="primary"
            dark
            large
            v-on:click="showBillModal"
          >
            Send bill to customer's email
          </v-btn>
          <div v-else-if="items.job.bill_sent">
            Bill has been sent to customer
          </div>
        </div>

      </v-card-text>

    </v-card>

    <div class="outer-modal" v-if="isBillModalVisible">
      <div class="inner-modal">
        <div class="close-button" v-on:click="closeBillModal">[X]</div>
        Send bill for {{ items.job.bill_amount }} to {{ items.job.customer_first_name }} {{ items.job.customer_last_name }} ?
        <div class="buttons">
          <div class="btn btn-no" v-on:click="closeBillModal">
            Cancel
          </div>
          <div class="btn btn-yes" v-on:click="sendBillInEmail">
            Send
          </div>
        </div>
      </div>
    </div>

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

  data() {
    return {
      items: [],
      isBillModalVisible: false,
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
        return await request
      } catch (error) {
        console.log(error)
      }
    },

    sendBillInEmail() {
      this.setBillSentAsTrue()
      .then((response) => {
        console.log("response from setBillSentAsTrue", response)
        if (response.status === 200) this.fetchItems()
      })
      alert("sending bill in email")
    },

    showBillModal() {
      this.isBillModalVisible = true
    },

    closeBillModal() {
      this.isBillModalVisible = false
    },
  },

  computed: {
    isSendBillButtonVisible: function() {
      const { time_work_completed: workComplete, bill_sent: billSent } = this.items.job
      if (workComplete && !billSent) return true
    },
  },
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

.billing-section {
  margin-top: 4em;
  margin-bottom: 2em;
}

.outer-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);

  .inner-modal {
    position: relative;
    border: 1px solid gainsboro;
    border-radius: 8px;
    width: 320px;
    height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 64px;

    .buttons {
      margin-top: 32px;
      display: flex;
      min-width: fit-content;
      min-height: fit-content;
    }

    .close-button {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      font-family: 'Ubuntu Mono'

    }
  }
}
</style>
