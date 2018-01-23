<template>
  <div
    class="pop-up"
    v-on:click="catchOnClick"
    :style="stylePosition">

    <div class="new-event">
      <h1>{{ date.monthName }} {{ date.dayNum }}, {{ date.year }}</h1>
      <br/>
      <div class="input-area">
        <div class="label">
          Start Time:
        </div>
        <div>
          <vue-timepicker
            v-model="startTime"
            :format="timeFormat"
            :minute-interval="minuteInterval">
          </vue-timepicker>
        </div>
        <div class="label">
          End Time:
        </div>
        <div>
          <vue-timepicker
            v-model="endTime"
            :format="timeFormat"
            :minute-interval="minuteInterval">
          </vue-timepicker>
        </div>
      </div>
      <v-btn color="primary">Save</v-btn>
    </div>

    <div class="existing-event">
      {{ eventData.content }}
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
      startTime: {},
      endTime: {},
      timeFormat: "hh:mm A",
      minuteInterval: 5,
    }
  },

  methods: {
    catchOnClick: function(event) {
      event.stopPropagation()
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../colors.scss";

div.pop-up {
  height: 14em;
  width: 20em;
  position: absolute;
  z-index: 5;

  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 4px;
  $top: 4px;
  $left: 4px;
  $blur: 16px;
  $sprd: 4px;
  $clr: rgba(0, 0, 0, 0.425);
  box-shadow: $left $top $blur $sprd $clr;
  -moz-box-shadow: $left $top $blur $sprd $clr;
  -webkit-box-shadow: $left $top $blur $sprd $clr;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5em 1em;

  h1 {
    font-size: 1.2em;
  }

  h2 {
    font-size: 1em;
  }

  .input-area {
    width: 100%;
    display: grid;
    grid-template-columns: [col] 30% [col] 70%;
    grid-template-rows: [row] auto;

    .label {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }

  button {
    margin-top: 2em;
    margin-left: auto;
  }
}

</style>
