<template>
  <div
    class="pop-up"
    v-on:click="catchOnClick"
    :style="stylePosition">
    <h1>{{ date.monthName }} {{ date.dayNum }}, {{ date.year }}</h1>
    <br/>
    <div class="input-area">
      <div>
        Start Time:
        <vue-timepicker format="h:mm A" :minute-interval="15"></vue-timepicker>
      </div>
      <div>
        End Time:
        <vue-timepicker format="h:mm A" :minute-interval="15"></vue-timepicker>
      </div>
    </div>
  </div>
</template>


<script>
import VueTimepicker from 'vue2-timepicker'

export default {
  props: ['stylePosition', 'date'],
  components: { VueTimepicker },

  data() {
    return {
      times: [
        '9:00am',
        '10:00am',
        '11:00am',
        '12:00pm',
      ],
      startTime: null,
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
  height: 16em;
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
  }
}

</style>
