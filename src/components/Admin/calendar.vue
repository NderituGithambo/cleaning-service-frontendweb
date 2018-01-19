<template>
  <div class="component-container">
    <div class="calendar-container">
      <h1>My Calendar</h1>
      <calendar-view
        :show-date="showDate"
        @setShowDate="setShowDate"
        class=""
      />
    </div>
  </div>
</template>

<script>
import CalendarView from "vue-simple-calendar"
require("vue-simple-calendar/dist/static/css/default.css")
require("vue-simple-calendar/dist/static/css/holidays-us.css")

export default {
  name: 'calendar',
  data: function() {
    return { showDate: new Date() }
  },
  components: {
    CalendarView
  },
  methods: {
    setShowDate(d) {
      this.showDate = d;
    },
  }
}
</script>

<style lang="scss" scoped>
.component-container {
  border: 1px dashed tomato;
  width: 100%;
  height: 70em;

  .calendar-container {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    height: 100%;
    width: 90%;
    margin-left: auto;
    margin-right: auto;

    border: 1px dashed pink;

    .calendar-view {
      height: 80%;

      border: 1px dashed lime;
    }
  }
}
</style>