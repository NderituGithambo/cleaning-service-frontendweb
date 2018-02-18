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

      <v-btn
        v-if="items.job_request.is_active"
        color="primary"
        dark
        large
        v-on:click="showModal"
      >
        Make this a job
      </v-btn>

    </v-card>

    <div class="outer-modal" v-if="isModalVisible">
      <div class="inner-modal">
        <div class="close-button" v-on:click="closeModal">[X]</div>
        Going to make this into a job...<br/><br/>
        Would you like to set this job request as inactive?
        <div class="buttons">
          <div class="btn btn-no" v-on:click="makeJobRequestAJob">
            No
          </div>
          <div class="btn btn-yes" v-on:click="onPressYesToMakeInactive">
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
      items: [],
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
        this.items = response.data

        console.log(response)

      } catch (error) {
        console.log(error);
      }
    },

    makeJobRequestAJob() {
      // Sends the jobRequest data to JobCreate, which then passes it all the way down to the calendar pop-up
      // (Could refactor this to use an external store, maybe Vuex)
      this.$router.push({ name: 'adminJobCreate', params: { jobRequest: this.items.job_request }})
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
  }
}
</script>

<style lang="scss" scoped>
h2 {
  padding: 2em;
}

.card {
  margin-top: 2em;
  padding-bottom: 2em;
}

li {
  border-bottom: 1px solid silver;
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
