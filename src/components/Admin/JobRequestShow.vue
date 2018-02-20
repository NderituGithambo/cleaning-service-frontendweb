<template>
  <div>
    <h1>Viewing job request</h1>
    <br/>
    <div class="job-card">

      <div class="top-bar">
        <div>
          Job Request #{{ jobRequestData.id }}
        </div>

        <div>
          Status:
          <span :class="getStatusColumnClass(jobRequestData.is_active)">
            {{ getStatusDisplayText(jobRequestData.is_active) }}
          </span>
        </div>
      </div>

      <div class="table">

        <div class="row">
          <div class="col label">
            Address
          </div>
          <div class="col value">
            {{ jobRequestData.address }}
          </div>
        </div>

        <div class="row">
          <div class="col label">
            Description
          </div>
          <div class="col value">
            {{ jobRequestData.description }}
          </div>
        </div>

        <div class="row">
          <div class="col label">
            Name
          </div>
          <div class="col value">
            {{ jobRequestData.guest_first_name }} {{ jobRequestData.guest_last_name }} 
          </div>
        </div>

        <div class="row">
          <div class="col label">
            E-mail
          </div>
          <div class="col value">
            {{ jobRequestData.guest_email }}
          </div>
        </div>

        <div class="row">
          <div class="col label">
            Phone number
          </div>
          <div class="col value">
            {{ jobRequestData.guest_phone_number }}
          </div>
        </div>

        <div class="row">
          <div class="col label">
            Date created
          </div>
          <div class="col value">
            {{ jobRequestData.created_at | moment }}
          </div>
        </div>

      </div>

      <div class="bottom-section">
        <div class="custom-btn make-into-job-btn" @click="showModal">
          Make this a job
        </div>
      </div>

    </div>

    <div class="outer-modal" v-if="isModalVisible">
      <div class="inner-modal">
        <div class="close-button" @click="closeModal"><v-icon>close</v-icon></div>
        <div class="modal-top">
          Going to make this into a job...<br/><br/>
          Would you like to set this job request as inactive?
        </div>
        <div class="buttons">
          <div class="btn btn-no" @click="makeJobRequestAJob">
            No
          </div>
          <div class="btn btn-yes" @click="onPressYesToMakeInactive">
            Yes
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
      jobRequestData: {},
      isModalVisible: false,
    }
  },

  mounted() {
    this.fetchItems()
  },

  methods: {
    async fetchItems() { // Not using this
      try {
        const config = {
          headers: { Authorization: localStorage.getItem("token") }
        }
        const request = axios.get(`http://localhost:3000/admin/${this.dataModel}s/${this.$route.params.id}`, config)
        const response = await request
        this.jobRequestData = response.data.job_request

        console.log(response)

      } catch (error) {
        console.log(error);
      }
    },

    makeJobRequestAJob() {
      // Sends the jobRequest data to JobCreate, which then passes it all the way down to the calendar pop-up
      // (Could refactor this to use an external store, maybe Vuex)
      this.$router.push({ name: 'adminJobCreate', params: { jobRequest: this.jobRequestData }})
    },

    onPressYesToMakeInactive() {
      this.setJobRequestAsInactive()
      this.makeJobRequestAJob()
    },

    async setJobRequestAsInactive() {
      try {
        const config = {
          headers: { Authorization: localStorage.getItem("token") }
        }
        const request = axios.patch(`http://localhost:3000/admin/${this.dataModel}s/${this.$route.params.id}`, {
          is_active: false,
        }, config)
        const response = await request
        this.items = response.data

        console.log(response)

      } catch (error) {
        console.log(error);
      }
    },

    showModal() {
      this.isModalVisible = true
    },

    closeModal() {
      this.isModalVisible = false
    },

    getStatusColumnClass(status) {
      return status ? 'status-active' : 'status-inactive'
    },

    getStatusDisplayText(status) {
      return status ? 'Active' : 'Inactive'
    },
  }
}
</script>

<style lang="scss" scoped>
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


    .status-active {
      color: green;
    }

    .status-inactive {
      color: grey;
    }
  }

  .table {
    margin: 1em;
    width: 100%;

    .row {
      display: flex;

      .col {
        padding: 1em;
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

.bottom-section {
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

.make-into-job-btn {
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
