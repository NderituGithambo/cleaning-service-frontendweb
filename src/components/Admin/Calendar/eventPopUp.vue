<template>
  <div
    class="container"
    :style="stylePosition">

    <div class="arrow">
      <div class="outer"></div>
      <div class="inner"></div>
    </div>

    <div class="content">

      <h1>{{ date.monthName }} {{ date.dayNum }}, {{ date.year }}</h1>
      <br/>

      <div class="event-info">
        <div class="row">
          <div class="col col-label">
            Start Time:
          </div>
          <div class="col col-content">
            <vue-timepicker
              v-model="startTime"
              hide-clear-button
              :format="timeFormat"
              :minute-interval="minuteInterval">
            </vue-timepicker>
          </div>
        </div>

        <div class="row">
          <div class="col col-label">
            End Time:
          </div>
          <div class="col col-content">
            <vue-timepicker
              v-model="endTime"
              hide-clear-button
              :format="timeFormat"
              :minute-interval="minuteInterval">
            </vue-timepicker>
          </div>
        </div>

        <!-- For existing events -->
        <div class="row" v-if="eventData.content" v-for="(item, key) in filteredContent">
          <div class="col col-label">
            {{ key | underscoresAreSpaces | capitalize }}
          </div>
          <div class="col col-content">
            {{ item }}
          </div>
        </div>

        <!-- For creating new events -->
        <div class="row" v-if="!eventData.content" v-for="(item, index) in content">
          <div class="col col-label">
            {{ item.key | underscoresAreSpaces | capitalize }}
          </div>
          <div class="col col-content">
            <v-text-field
              v-model="content[index].value"
              required
            ></v-text-field>
          </div>
        </div>

        <!-- Submit button displayed when creating new events -->
        <v-btn color="primary" v-if="!eventData.content" v-on:click="handleClickOkay">OK</v-btn>
      </div>

    </div>

  </div>
</template>


<script>
import VueTimepicker from 'vue2-timepicker'

export default {
  props: ['stylePosition', 'date', 'eventData'],
  components: { VueTimepicker },

  data() {
    return {
      timeFormat: "hh:mm a",
      minuteInterval: 15,
      startTime: {
        hh: '00',
        mm: '00',
        a: 'am'
      },
      endTime: {
        hh: '00',
        mm: '00',
        a: 'am'
      },
      content: [
        { key: 'description', value: '' },
        { key: 'address', value: '' },
        { key: 'admin_notes', value: '' },
        { key: 'employee_notes', value: '' },
        { key: 'phone', value: '' },
        { key: 'email', value: '' },
      ],
    }
  },

  methods: {
    handleClickOkay: function() {

      console.log("this in pop-up", this)

      /* This gets re-emitted in parent to outside of calendar */
      this.$emit('handle-click-okay-in-pop-up', {
        startTime: this.startTime,
        endTime: this.endTime,
        date: this.date,
        [this.content[0].key]: this.content[0].value,
        [this.content[1].key]: this.content[1].value,
        [this.content[2].key]: this.content[2].value,
        [this.content[3].key]: this.content[3].value,
        [this.content[4].key]: this.content[4].value,
        [this.content[5].key]: this.content[5].value,
      })
    }
  },

  computed: {
    filteredContent: function() {
      if (this.eventData.content) {
        const {
          description,
          address,
          admin_notes,
          employee_notes,
          phone,
          email,
        } = this.eventData.content

        return {
          description,
          address,
          admin_notes,
          employee_notes,
          phone,
          email,
        }
      }
    }
  },

  mounted() {
    console.log("eventData", this.eventData)

    const { startTime, endTime, content, title } = this.eventData
    if (this.eventData.content) {
      this.startTime = {
        hh: startTime.slice(0, 2),
        mm: startTime.slice(3, 5),
        a: startTime.slice(-2),
      }
      this.endTime = {
        hh: endTime.slice(0, 2),
        mm: endTime.slice(3, 5),
        a: endTime.slice(-2),
      }
    }
  },
}
</script>


<style lang="scss" scoped>
@import "../../../colors.scss";

.container {
  clear: both;
  position: absolute;
  z-index: 5;

  $border-color: gainsboro;
  $fill-color: rgb(248, 248, 248);
  $border-radius: 4px;

  .arrow {
    width: 12px;
    height: 20px;
    overflow: hidden;
    position: relative;
    float: left;
    top: 175px;
    right: -1px;

    .outer {
      width: 0;
      height: 0;
      border-right: 20px solid $border-color;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      position: absolute;
      top: 0;
      left: 0;
    }

    .inner {
      width: 0;
      height: 0;
      border-right: 20px solid $fill-color;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      position: absolute;
      top: 0;
      left: 2px;
    }
  }

  .content {
    width: 400px;
    height: min-content;
    border: 1px solid $border-color;
    background-color: $fill-color;
    border: 1px solid $border-color;
    padding: 6px 8px;
    -webkit-border-radius: $border-radius;
    -moz-border-radius: $border-radius;
    -o-border-radius: $border-radius;
    border-radius: $border-radius;

    overflow-y: scroll;

    h1 {
      font-size: 1.2em;
    }

    h2 {
      font-size: 1em;
    }

    .event-info {
      height: fit-content;
      // border: 1px dashed red;

      .row {
        width: 100%;
        display: grid;
        grid-template-columns: [col] 25% [col] 75%;

        // border: 1px dashed blue;

        .col {
          padding: 0.5em;
        }

        .col-label {
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          text-align: right;
        }

        .col-content {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
      }
    }
  }

  button {
    // margin-top: auto;
    float: right;
  }
}
</style>
