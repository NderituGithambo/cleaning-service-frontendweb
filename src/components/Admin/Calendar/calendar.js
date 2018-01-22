require('datejs')

import newEventPopUp from './newEventPopUp.vue'
import event from './event.vue'

export default {
  props: ['events'],
  // 'Events' prop must be an array of objects
  // with the following attributes:
  // Start date, end date, title,
  // and a custom 'content' object inside,
  // that contains whatever other key-attribute pairs
  // are desired to be displayed in the pop-up.
  // 'End date' is not required.
  // Dates to be parsed by datejs.

  data () {
    return {
      // variables
      currentYear: 2018,
      currentMonth: 0,
      daysFromPrevMonth: 0,
      daysFromNextMonth: 0,
      selectedDay: null,
      newEventMenuDisplayed: false,
      newEventMenuStylePosition: '',
      currentDateSelected: '',

      // constants
      DAY_NAMES: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      MONTH_NAMES: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December']
    }
  },



  components: {
    'new-event-pop-up': newEventPopUp,
    'event': event,
  },



  watch: {
    currentMonth: function() {
      this.initializeMonthData()
    },
    events: function(events) {
      // TO DO:
      // Need to extract a parent function for getDaysOfMonthData
      // that pushes both prev, current and next month days
      // into a single array.
      // At the same time, this function also pushes the days events
      // into the day object via getEventsForDay method.
    }
  },



  methods: {
    getEventsForDay: function(day) {
      // Iterates through events array ... if an event is found on this day,
      // push that event to the events array in dayData (in getDaysOfMonthData)

      console.log("TO-DO: populating calendar with events", events)
      events.forEach(function(event) {
        this.eventComponents += `
          <event :onDblClickEvent="{onDblClickEvent}"/>
        `
      })
    },

    onDblClickEvent: function(event) {
      console.log("You double-clicked on an event")
    },

    hideMenus: function() {
      this.newEventMenuDisplayed = false
    },

    catchClickOnDay: function(event) {
      const date = this.getDateFromClickEvent(event)
      // console.log("You clicked", date)
    },

    catchDblClickOnDay: function(event) {
      const date = this.getDateFromClickEvent(event)
      console.log("You double-clicked on a day", event.path)
      const top = event.path["1"].offsetTop
      const left = event.path["1"].offsetLeft
      const width = event.path["1"].offsetWidth
      const height = event.path["1"].offsetHeight
      this.newEventMenuStylePosition = `top: ${top - 32}px; left: ${left + width}px;`
      this.newEventMenuDisplayed = !this.newEventMenuDisplayed
    },

    getDateFromClickEvent: function(event) {
      let dayNum = event.currentTarget.getAttribute('dayNum')
      let monthNum = event.currentTarget.getAttribute('monthNum')
      let year = this.currentYear
      if (monthNum < 0) {
        monthNum = 11
        year -= 1
      } else if (monthNum > 11) {
        monthNum = 0
        year += 1
      }
      const date = {
        dayNum: Number(dayNum),
        dayName: this.getDayNameByDayMonthYear(dayNum, monthNum, year),
        monthNum: Number(monthNum),
        monthName: this.MONTH_NAMES[monthNum],
        year: Number(year)
      }
      this.currentDateSelected = date
      return date
    },

    getDaysInFebByYear: function(year) {
      if (year % 100 === 0 && year % 400 !== 0) return 28
      else if (year % 4 === 0) return 29
      return 28
    },

    getDayNameByDayMonthYear: function(day, month, year) {
      const dateString = `${this.MONTH_NAMES[month]} ${day}, ${year}`
      const timestamp = new Date.parse(dateString)
      return this.DAY_NAMES[timestamp.getDay()]
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

    getDayNumsOfMonthsByYear: function(year) {
      return [31, this.getDaysInFebByYear(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    },

    getDaysOfMonthData(monthDiff) {
      let monthNum = this.currentMonth
      let year = this.currentYear
      if (monthDiff) {
        monthNum = this.getAdjacentMonthNumAndYearChange(monthDiff).monthNum
        year += this.getAdjacentMonthNumAndYearChange(monthDiff).yearChange
      }
      const dayData = []
      const numDays = this.getDayNumsOfMonthsByYear(year)[monthNum]
      if (monthDiff < 0) {
        for (let dayNum = numDays - this.daysFromPrevMonth + 1; dayNum <= numDays; dayNum++) {
          dayData.push({
            dayNum: dayNum,
            dayName: this.getDayNameByDayMonthYear(dayNum, monthNum, year),
            monthNum: monthNum,
            monthName: this.MONTH_NAMES[monthNum],
            year: year,
            // TO DO:
            // events: getEventsForDay()
          })
        }
        return dayData
      } else if (monthDiff > 0) {
        for (let dayNum = 1; dayNum <= this.daysFromNextMonth; dayNum++) {
          dayData.push({
            monthName: this.MONTH_NAMES[monthNum],
            name: this.getDayNameByDayMonthYear(dayNum, monthNum, year),
            num: dayNum,
          })
        }
        return dayData
      }
      for (let dayNum = 1; dayNum <= numDays; dayNum++) {
        dayData.push({
          monthName: this.MONTH_NAMES[monthNum],
          name: this.getDayNameByDayMonthYear(dayNum, monthNum, year),
          num: dayNum,
        })
      }
      return dayData
    },

    displayedDays() {
      const prevMonthDays = this.getDaysOfMonthData(-1)
      const currentMonthDays = this.getDaysOfMonthData()
      const nextMonthDays = this.getDaysOfMonthData(1)

      const displayedDays = prevMonthDays.concat(currentMonthDays, nextMonthDays)

      console.log(displayedDays)
      return displayedDays
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
      const daysInThisMonth = this.getDayNumsOfMonthsByYear(this.currentYear)[this.currentMonth]
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


  mounted() {
    this.initializeMonthData()
  }
}