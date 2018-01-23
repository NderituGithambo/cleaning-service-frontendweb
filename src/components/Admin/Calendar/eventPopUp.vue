<template>
  <div
    class="pop-up"
    :style="stylePosition">
    <div class="content">
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
              hide-clear-button
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
              hide-clear-button
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

    <canvas
      v-on:click="catchOnClick"
      v-draw
      width="415px"
      height="500px">
    </canvas>
  </div>
</template>


<script>
import VueTimepicker from 'vue2-timepicker'

export default {
  props: ['stylePosition', 'date', 'eventData'],
  components: { VueTimepicker },

  data() {
    return {
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
      timeFormat: "hh:mm a",
      minuteInterval: 5,
    }
  },

  directives: {
    draw: {
      // When insterted into DOM
      inserted: function (el) {
        if (el.getContext) {
          // el.width = el.clientWidth;
          // el.height = el.clientHeight;
          var ctx = el.getContext('2d');

          ctx.beginPath();
          ctx.moveTo(0, 250);
          ctx.lineTo(15, 225);
          ctx.lineTo(15, 0);
          ctx.lineTo(415, 0);
          ctx.lineTo(415, 500);
          ctx.lineTo(15, 500);
          ctx.lineTo(15, 275);
          ctx.lineTo(0, 250);

          ctx.fillStyle = 'rgba(200, 200, 200, 1)'
          ctx.fill()
        }
      }
    }
  },

  methods: {
    catchOnClick: function(event) {
      event.stopPropagation()
    },
  },
};
</script>


<style lang="scss" scoped>
@import "../../../colors.scss";


.pop-up {
  // border: 1px dashed rgb(74, 161, 74);
  position: absolute;
  height: 500px;
  width: 415px;
  padding-left: 20px;

  .content {
    // border: 1px dashed teal;
    position: absolute;
    height: 490px;
    width: 390px;
    margin-top: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
    padding-top: 1em;

    z-index: 1;
    background-color: $light-grey;

    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;

    h1 {
      font-size: 1.2em;
    }

    h2 {
      font-size: 1em;
    }

    .input-area {
      width: 100%;
      display: grid;
      grid-template-columns: [col] 40% [col] 60%;
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

  canvas {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
}

</style>
