<template>
  <div class="wrapper">

    <div class="date-nav">
      <span class="date-nav-btn" v-on:click="() => navMonth(-1)">[  < ]</span>
      <span class="date-nav-btn" v-on:click="() => navMonth(1)">[ >  ]</span>
    </div>

    <h1>{{ monthNames[currentMonth] }} {{ currentYear }}</h1>

    <div class="calendar-container">
      <div class="view-month">

        <div
          class="day-header"
          v-for="dayName in dayNames">
          {{ dayName }}
        </div>

        <div
          class="day day-prev-month"
          v-for="day in getDaysOfMonthData(-1)">
          {{ day.num }}
        </div>

        <div
          class="day day-current-month"
          v-for="day in getDaysOfMonthData()"
          v-bind:dayNum="day.num"
          v-bind:monthNum="currentMonth"
          v-on:click="catchClick">
          <span class="day-num">{{ day.num }}</span>
        </div>

        <div
          class="day day-prev-month"
          v-for="day in getDaysOfMonthData(1)">
          {{ day.num }}
        </div>

      </div>
    </div>
  </div>
</template>



<script>
import axios from 'axios'
require('datejs')

export default {
  data () {
    return {
      // variables
      currentYear: 2018,
      currentMonth: 0,
      daysFromPrevMonth: 0,
      daysFromNextMonth: 0,
      selectedDay: null,

      // constants
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']
    }
  },

  methods: {
    catchClick: function(event) {
      console.log(event.currentTarget.getAttribute('dayNum'))
      console.log(event.currentTarget.getAttribute('monthNum'))
    },
    getDaysInFebByYear: function(year) {
      if (year % 100 === 0 && year % 400 !== 0) return 28
      else if (year % 4 === 0) return 29
      return 28
    },
    getDayNameByDayMonthYear: function(day, month, year) {
      const dateString = `${month + 1} ${day}, ${year}`
      const timestamp = new Date.parse(dateString)
      return this.dayNames[timestamp.getDay()]
    },
    getDayNumberInWeekByDayMonthYear: function(day, month, year) {
      const dateString = `${month + 1}/${day}/${year}`
      const timestamp = new Date.parse(dateString)
      return timestamp.getDay()
    },
    getAdjacentMonthNumAndYearChange: function(offset) {
      if ((this.currentMonth + offset) < 0) {
        return { monthNum: 11, yearChange: -1 }
      } else if ((this.currentMonth + offset) > 11) {
        return { monthNum: 0, yearChange: 1 }
      } else {
        return { monthNum: this.currentMonth + offset, yearChange: 0 }
      }
    },
    getMonthsWithDayNumsByYear: function(year) {
      return [
        { name: 'January', days: 31 },
        { name: 'February', days: this.getDaysInFebByYear(year) },
        { name: 'March', days: 31 },
        { name: 'April', days: 30 },
        { name: 'May', days: 31 },
        { name: 'June', days: 30 },
        { name: 'July', days: 31 },
        { name: 'August', days: 31 },
        { name: 'September', days: 30 },
        { name: 'October', days: 31 },
        { name: 'November', days: 30 },
        { name: 'December', days: 31 },
      ]
    },
    getDaysOfMonthData(monthDiff) {
      let monthNum = this.currentMonth
      let year = this.currentYear
      if (monthDiff) {
        monthNum = this.getAdjacentMonthNumAndYearChange(monthDiff).monthNum
        year += this.getAdjacentMonthNumAndYearChange(monthDiff).yearChange
      }

      const dayData = []

      const numDays = this.getMonthsWithDayNumsByYear(year)[monthNum].days
      if (monthDiff < 0) {
        for (let dayNum = numDays - this.daysFromPrevMonth + 1; dayNum <= numDays; dayNum++) {
          dayData.push({
            monthName: this.getMonthsWithDayNumsByYear(year)[monthNum].name,
            name: this.getDayNameByDayMonthYear(dayNum, monthNum, year),
            num: dayNum,
          })
        }
        return dayData
      } else if (monthDiff > 0) {
        for (let dayNum = 1; dayNum <= this.daysFromNextMonth; dayNum++) {
          dayData.push({
            monthName: this.getMonthsWithDayNumsByYear(year)[monthNum].name,
            name: this.getDayNameByDayMonthYear(dayNum, monthNum, year),
            num: dayNum,
          })
        }
        return dayData
      }

      for (let dayNum = 1; dayNum <= numDays; dayNum++) {
        dayData.push({
          monthName: this.getMonthsWithDayNumsByYear(year)[monthNum].name,
          name: this.getDayNameByDayMonthYear(dayNum, monthNum, year),
          num: dayNum,
        })
      }
      return dayData
    },
    navMonth(change) {
      let monthNum = this.currentMonth
      monthNum += change
      if (monthNum < 0) {
        monthNum = 11
        this.currentYear -= 1
      }
      else if (monthNum > 11) {
        monthNum = 0
        this.currentYear += 1
      }
      this.currentMonth = monthNum
    },
    initializeMonthData() {
      // How many days to display from the previous month before first day in current month
      this.daysFromPrevMonth = this.getDayNumberInWeekByDayMonthYear(
        1,
        this.currentMonth,
        this.currentYear
      )
      // How many days to display from the next month after last day in current month
      const daysInThisMonth = this.getMonthsWithDayNumsByYear(this.currentYear)[this.currentMonth].days
      this.daysFromNextMonth = 13 - this.getDayNumberInWeekByDayMonthYear(
        daysInThisMonth,
        this.currentMonth,
        this.currentYear
      )
      // To keep the same amount of rows in the calendar all the time
      if (this.daysFromPrevMonth + daysInThisMonth + this.daysFromNextMonth > 42) {
        this.daysFromNextMonth -= 7
      }
    },
  },

  watch: {
    currentMonth: function() {
      this.initializeMonthData()
    }
  },

  mounted() {
    this.initializeMonthData()
  }
}
</script>



<style lang="scss" scoped>
@import "../../colors.scss";

.wrapper {
  text-align: center;

  .date-nav {
    margin: 1em;

    .date-nav-btn {
      cursor: pointer;
      &:hover {
        background-color: lime;
      }
      &:active {
        background-color: green;
      }
    }
  }

  .calendar-container {
    margin: 1em;
    display: flex;
    justify-content: center;

    .view-month {
      display: grid;
      grid-template-columns: repeat(7, 8em);
      grid-template-rows: [row] auto;
      grid-gap: 2px;

      .day-header {
        height: 2em;
        background-color: rgb(238, 238, 238);
      }

      .day {
        height: 8em;
      }

      .day-current-month {
        background-color: pink;
      }

      $light-pink: rgb(255, 241, 243);
      .day-next-month {
        background-color: $light-pink;
      }

      .day-prev-month {
        background-color: $light-pink;
      }
    }
  }
}
</style>
