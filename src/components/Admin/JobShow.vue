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
          Status:
          <span :class="getEventColorClassFromStatus(jobData, true)">
            {{ getJobStatusFromJobData(jobData) | screamingSnakeCaseFix }}
          </span>
        </div>
      </div>

      <div class="table">
        <div class="row border-bottom">
          <div class="col label">
            Scheduled time
          </div>
          <div class="col value">
            {{ jobData.confirmed_time | moment }}
          </div>
        </div>

        <div class="row">
          <div class="col label">
            Time work started
          </div>
          <div class="col value">
            {{ jobData.time_work_started | moment }}
          </div>
        </div>

        <div class="row border-bottom">
          <div class="col label">
            Time work completed
          </div>
          <div class="col value">
            {{ jobData.time_work_completed | moment }}
          </div>
        </div>

        <div class="row border-bottom">
          <div class="col label">
            Assigned employee
          </div>
          <div class="col value">
            {{ jobData.employee_id }}
          </div>
        </div>

        <div class="row">
          <div class="col label">
            Address
          </div>
          <div class="col value">
            {{ jobData.address }}
          </div>
        </div>

        <div class="row border-bottom">
          <div class="col label">
            Description
          </div>
          <div class="col value">
            {{ jobData.description }}
          </div>
        </div>

        <div class="row">
          <div class="col label">
            Customer name
          </div>
          <div class="col value">
            {{ jobData.customer_first_name }} {{ jobData.customer_last_name }}
          </div>
        </div>

        <div class="row">
          <div class="col label">
            Customer email
          </div>
          <div class="col value">
            {{ jobData.email }}
          </div>
        </div>

        <div class="row border-bottom">
          <div class="col label">
            Customer phone
          </div>
          <div class="col value">
            {{ jobData.phone }}
          </div>
        </div>

        <div class="row border-bottom">
          <div class="col label">
            Bill amount
          </div>
          <div class="col value">
            {{ jobData.bill_amount | toDollars }}
            <div
              class="custom-btn edit-btn"
              @click="showEditModal"
            >Edit</div>
          </div>
        </div>
      </div>





      <!-- Send bill button / 'bill has been sent' text -->
      <div class="billing-section">
        <div v-if="isSendBillButtonVisible && !jobData.bill_amount">
          You can send the bill once you've entered an amount.
        </div>
        <div
          class="custom-btn send-bill-btn"
          v-else-if="isSendBillButtonVisible"
          @click="showBillModal"
        >Send bill</div>
        <div v-else-if="jobData.bill_sent">
          Bill has been sent to customer.
        </div>
      </div>

    </div>




    <!-- Edit Bill Modal -->
    <div class="outer-modal" v-if="isEditModalVisible">
      <div class="inner-modal">
        <div class="close-button" @click="closeModal"><v-icon>close</v-icon></div>

        <div class="modal-top">
          <div class="inner-modal-top">
            Enter amount to bill customer
            <v-text-field
              label="Amount"
              v-model="billAmount"
            />
          </div>
        </div>

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

    <!-- Send Bill Modal -->
    <div class="outer-modal" v-if="isBillModalVisible">
      <div class="inner-modal">
        <div class="close-button" @click="closeModal"><v-icon>close</v-icon></div>

        <div class="modal-top">
          Send bill for {{ jobData.bill_amount | toDollars }} to {{ jobData.customer_first_name }} {{ jobData.customer_last_name }} ?
        </div>

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

import { getJobStatusFromJobData, getEventColorClassFromStatus } from './helpers.js'

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

    // To expose helper functions to html template
    getEventColorClassFromStatus: getEventColorClassFromStatus,
    getJobStatusFromJobData: getJobStatusFromJobData,
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
@import "./job-color-classes.scss";
@import "../../colors.scss";

$light-gainsboro: rgb(235, 235, 235);

h2 {
  padding: 2em;
}

.job-card {
  margin-top: 2em;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;

  .top-bar {
    padding: 1em;
    display: flex;
    justify-content: space-between;
    background-color: $light-gainsboro;
    width: 100%;

    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .table {
    margin: 1em;
    width: 100%;

    .row {
      display: flex;

      .col {
        padding: 1em;
        // border: 1px dashed red;
      }

      .label {
        font-weight: bold;
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

      .value {
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
    }

    .border-bottom {
      border-bottom: 1px solid $light-gainsboro;
    }
  }

  .edit-btn {
    background: orange;
  }
}

.billing-section {
  margin-top: 4em;
  margin-bottom: 2em;
}


.custom-btn {
  width: min-content;
  margin-left: 1em;
  padding: 0 1em;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    filter: brightness(102.5%);
  }
}

.send-bill-btn {
  background: $light-gainsboro;
  width: fit-content;
  padding: 1em;
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
    padding: 1em;

    .modal-top {
      height: 100%;
      display: flex;
      align-items: center;

      .inner-modal-top {
        height: min-content;
      }
    }

    .buttons {
      margin-top: auto;
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
