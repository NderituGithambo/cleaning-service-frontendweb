<template>
  <div
    class="container"
    :style="stylePosition">

    <div class="arrow">
      <div class="outer"></div>
      <div class="inner"></div>
    </div>

    <div class="content">

      <div class="event-info">
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
        <v-btn color="primary">OK</v-btn>
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
      minuteInterval: 5,
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
    }
  },

  methods: {
    catchOnClick: function(event) {
      event.stopPropagation()
    },
  },

  mounted() {
    console.log('from pop up:', this.eventData)
    const { startTime, endTime, content, title } = this.eventData
    if (this.eventData) {
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
};
</script>


<style lang="scss" scoped>
@import "../../../colors.scss";

/* Message box starts here */
.container {
  clear: both;
  position: absolute;

  $border-color: rgb(208, 208, 208);
  $fill-color: rgb(248, 248, 248);
  $border-radius: 0;

  .arrow {
    width: 12px;
    height: 20px;
    overflow: hidden;
    position: relative;
    float: left;
    top: 200px;
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
    float: left;
    width: 300px;
    height: 400px;
    border: 1px solid $border-color;
    background-color: $fill-color;
    border: 1px solid $border-color;
    padding: 6px 8px;
    -webkit-border-radius: $border-radius;
    -moz-border-radius: $border-radius;
    -o-border-radius: $border-radius;
    border-radius: $border-radius;

    h1 {
      font-size: 1.2em;
    }

    h2 {
      font-size: 1em;
    }

    .event-info {
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
        float: right;
      }
    }
  }
}



//  ** old pop-up **
// .pop-up {
//   // border: 1px dashed rgb(74, 161, 74);
//   position: absolute;
//   height: 500px;
//   width: 415px;
//   padding-left: 20px;

//   .content {
//     // border: 1px dashed teal;
//     position: absolute;
//     height: 490px;
//     width: 390px;
//     margin-top: 5px;
//     margin-right: 5px;
//     margin-bottom: 5px;
//     padding-top: 1em;

//     z-index: 4;
//     background-color: white;

//     // display: flex;
//     // flex-direction: column;
//     // align-items: center;
//     // justify-content: center;




//     button {
//       margin-top: 2em;
//       margin-left: auto;
//     }
//   }

//   canvas {
//     z-index: 3;
//     position: absolute;
//     top: 0;
//     left: 0;
//   }
// }
</style>
