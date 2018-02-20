<template>
  <div>
    <h1>Viewing job</h1>
    <br/>

    <div class="job-card">

      <div class="top-bar">
        <div>
          Job #{{ jobData.id }}
        </div>

        <div>
          Status: ________
        </div>
      </div>

      <div class="row">
        <div class="label">
          Scheduled time
        </div>
        <div class="value">
          {{  }}
        </div>
      </div>

      <div class="row">
        <div class="label">
          Label
        </div>
        <div class="value">
          {{  }}
        </div>
      </div>

      <div class="row">
        <div class="label">
          Label
        </div>
        <div class="value">
          {{  }}
        </div>
      </div>

      <div class="row">
        <div class="label">
          Label
        </div>
        <div class="value">
          {{  }}
        </div>
      </div>

      <div class="row">
        <div class="label">
          Label
        </div>
        <div class="value">
          {{  }}
        </div>
      </div>

      <!-- Put buttons on certain properties -->
      <v-btn
        class="edit-btn"
        small
        depressed
        dark
        color="orange"
        @click="showEditModal"
      >Edit</v-btn>


      <!-- Send bill button / 'bill has been sent' text -->
      <div class="billing-section">
        <div v-if="isSendBillButtonVisible && !jobData.bill_amount">
          You can send the bill once you've entered an amount.
        </div>
        <v-btn
          v-else-if="isSendBillButtonVisible"
          color="primary"
          dark
          large
          @click="showBillModal"
        >
          Send bill to customer's email
        </v-btn>
        <div v-else-if="jobData.bill_sent">
          Bill has been sent to customer.
        </div>
      </div>

    </div>



    <!-- Modals -->

    <div class="outer-modal" v-if="isEditModalVisible">
      <div class="inner-modal">
        <div class="close-button" @click="closeModal">[X]</div>
        Enter amount to bill customer

        <v-text-field
          label="Amount"
          v-model="billAmount"
        />
        <br/>

        <div class="buttons">
          <div class="btn btn-no" @click="closeModal">
            Cancel
          </div>
          <div class="btn btn-yes" @click="setBillAmount">
            Save
          </div>
        </div>
      </div>
    </div>


    <div class="outer-modal" v-if="isBillModalVisible">
      <div class="inner-modal">
        <div class="close-button" @click="closeModal">[X]</div>
        Send bill for {{ jobData.bill_amount }} to {{ jobData.customer_first_name }} {{ jobData.customer_last_name }} ?
        <div class="buttons">
          <div class="btn btn-no" @click="closeModal">
            Cancel
          </div>
          <div class="btn btn-yes" @click="sendBillInEmail">
            Send
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios'
import to from '../../to'

export default {
  props: {
    dataModel: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      jobData: {},
      isBillModalVisible: false,
      isEditModalVisible: false,
      billAmount: '',
    }
  },

  mounted() {
    this.fetchItems()
  },

  methods: {
    async fetchItems() {
      const config = { headers: { Authorization: localStorage.getItem("token") }}
      const request = axios.get(`http://localhost:3000/admin/${this.dataModel}s/${this.$route.params.id}`, config)

      const [error, response] = await to(request)
      if (error) console.log(error)
      console.log("***", response.data.job)
      this.jobData = response.data.job
    },

    async setBillAmount() {
      const config = { headers: { Authorization: localStorage.getItem("token") }}
      const request = axios.patch(`http://localhost:3000/admin/jobs/${this.$route.params.id}`, {
        bill_amount: this.billAmount,
      }, config)

      const [error, response] = await to(request)
      if (error) return console.log(error)
      this.fetchItems()
      this.closeModal()
    },

    async sendBillInEmail() {
      const config = { headers: { Authorization: localStorage.getItem("token") }}
      const request = axios.patch(`http://localhost:3000/admin/jobs/${this.$route.params.id}`, {
        bill_sent: true,
      }, config)

      const [error, response] = await to(request)
      if (error) return console.log(error)
      this.fetchItems()
      this.closeModal()
    },

    showBillModal() {
      if (!this.jobData.bill_amount) return alert("Bill amount can't be zero")
      this.isBillModalVisible = true
    },

    showEditModal() {
      this.isEditModalVisible = true
    },

    closeModal() {
      this.isBillModalVisible = false
      this.isEditModalVisible = false
    },
  },

  computed: {
    isSendBillButtonVisible: function() {
      const { time_work_completed: workComplete, bill_sent: billSent } = this.jobData
      if (workComplete && !billSent) return true
    },
  }
}
</script>

<style lang="scss" scoped>
h2 {
  padding: 2em;
}

.job-card {
  margin-top: 2em;
  padding: 1em;
  background-color: white;
  display: flex;
  flex-direction: column;

  .top-bar {
    display: flex;
    justify-content: space-between;
  }

  .row {
    display: flex;

    .label {
      font-weight: bold;
      text-align: right;
    }

    .value {
      text-align: left;
    }
  }

  .edit-btn {
    width: min-content;
  }
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
